import { EntityManager } from 'typeorm';
import request from 'supertest';
import { AppInstance } from '../utils/appTest';
import { INestApplication } from '@nestjs/common';
import { Employee } from '../../infrastructure/db/entities-index';
import { randomUUID } from '../../utils/utils';
import { PayType } from '../../shared/enums/hrm';
import hrmErrors from '../../app/hrm/hrm.errors';

const appInstance = new AppInstance();
let manager: EntityManager;
let app: INestApplication;

beforeAll(async () => {
  app = await appInstance.getAppInstance();
  manager = appInstance.getConnection();
  // appInstance.getJWTService();
});

afterEach(async () => {
  jest.resetAllMocks();
  const conn = manager.connection;
  for (const entity of conn.entityMetadatas) {
    const repository = conn.getRepository(entity.name); // Get repository
    await repository.query(`DELETE FROM ${entity.tableName}`); // Clear table
  }
});

afterAll(async () => {
  await app.close();
});

describe('POST - /', () => {
  const url = '/hrm/employee';

  test('OK - Successful employee creation - SALARY', async () => {
    const { token } = await appInstance.getToken();

    const newEmployee = {
      name: 'John Doe',
      payType: 'SALARY',
      payRate: 500,
    };

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(newEmployee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(body).toHaveProperty('name');
    expect(body.name).toEqual(newEmployee.name);

    expect(body).toHaveProperty('payType');
    expect(body.payType).toEqual(newEmployee.payType);

    expect(body).toHaveProperty('payRate');
    expect(body.payRate).toEqual(newEmployee.payRate);
  });

  test('OK - Successful employee creation - HOURLY', async () => {
    const { token } = await appInstance.getToken();

    const newEmployee = {
      name: 'John Doe',
      payType: PayType.HOURLY,
      payRate: 15,
    };

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(newEmployee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(body).toHaveProperty('name');
    expect(body.name).toEqual(newEmployee.name);

    expect(body).toHaveProperty('payType');
    expect(body.payType).toEqual(newEmployee.payType);

    expect(body).toHaveProperty('payRate');
    expect(body.payRate).toEqual(newEmployee.payRate);
  });

  test('ERROR - Employee already exists', async () => {
    const { token } = await appInstance.getToken();
    const employee = {
      name: 'John Doe',
      payType: PayType.SALARY,
      payRate: 500,
    };

    await manager.save(
      new Employee({
        id: randomUUID(),
        name: employee.name,
        pay_type: employee.payType,
        pay_rate: employee.payRate,
      }),
    );

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(employee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toEqual(hrmErrors.EMPLOYEE_ALREADY_EXISTS());
  });

  test('ERROR - Minimum wage - SALARY', async () => {
    const { token } = await appInstance.getToken();
    const employee = {
      name: 'John Doe',
      payType: PayType.SALARY,
      payRate: 400,
    };

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(employee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toEqual(hrmErrors.EMPLOYEE_MINIMUM_WAGE());
  });

  test('ERROR - Minimum wage - HOURLY', async () => {
    const { token } = await appInstance.getToken();
    const employee = {
      name: 'John Doe',
      payType: PayType.HOURLY,
      payRate: 5,
    };

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(employee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toEqual(hrmErrors.EMPLOYEE_MINIMUM_WAGE());
  });
});

describe('PATCH - /:id', () => {
  const url = (id: string) => `/hrm/employee/${id}`;

  test('OK - Employee updated', async () => {
    const { token } = await appInstance.getToken();
    const employee = {
      name: 'New Name',
    };

    const storedEmployee = await manager.save(
      new Employee({
        id: randomUUID(),
        name: 'John Doe',
        pay_type: PayType.SALARY,
        pay_rate: 500,
      }),
    );

    const { body } = await request(app.getHttpServer())
      .patch(url(storedEmployee.id))
      .send(employee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(body).toHaveProperty('name');
    expect(body.name).toEqual(employee.name);

    expect(body).toHaveProperty('payType');
    expect(body.payType).toEqual(PayType.SALARY);

    expect(body).toHaveProperty('payRate');
    expect(body.payRate).toEqual(500);
  });

  test("ERROR - Employee doesn't exists", async () => {
    const { token } = await appInstance.getToken();
    const employee = {
      name: 'John Doe',
      payType: PayType.SALARY,
      payRate: 500,
    };

    const { body } = await request(app.getHttpServer())
      .patch(url(randomUUID()))
      .send(employee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toEqual(hrmErrors.EMPLOYEE_DOES_NOT_EXIST());
  });

  test('ERROR - Minimum wage - SALARY', async () => {
    const { token } = await appInstance.getToken();
    const employee = {
      payRate: 400,
    };

    const storedEmployee = await manager.save(
      new Employee({
        id: randomUUID(),
        name: 'John Doe',
        pay_type: PayType.SALARY,
        pay_rate: 500,
      }),
    );

    const { body } = await request(app.getHttpServer())
      .patch(url(storedEmployee.id))
      .send(employee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toEqual(hrmErrors.EMPLOYEE_MINIMUM_WAGE());
  });

  test('ERROR - Minimum wage - HOURLY', async () => {
    const { token } = await appInstance.getToken();
    const employee = {
      payRate: 5,
    };

    const storedEmployee = await manager.save(
      new Employee({
        id: randomUUID(),
        name: 'John Doe',
        pay_type: PayType.HOURLY,
        pay_rate: 500,
      }),
    );

    const { body } = await request(app.getHttpServer())
      .patch(url(storedEmployee.id))
      .send(employee)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toEqual(hrmErrors.EMPLOYEE_MINIMUM_WAGE());
  });
});

describe('GET - /', () => {
  const url = '/hrm/employee';

  test('OK - Get all employees', async () => {
    const { token } = await appInstance.getToken();

    await Promise.all([
      manager.save(
        new Employee({
          id: randomUUID(),
          name: 'John Doe',
          pay_type: PayType.SALARY,
          pay_rate: 500,
        }),
      ),
      manager.save(
        new Employee({
          id: randomUUID(),
          name: 'John Doe 2',
          pay_type: PayType.HOURLY,
          pay_rate: 15,
        }),
      ),
    ]);

    const { body } = await request(app.getHttpServer())
      .get(url)
      .query({
        page: 0,
        limit: 10,
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(body).toHaveProperty('pagination');
    expect(body).toHaveProperty('data');

    expect(body.data.length).toEqual(2);

    expect(body.pagination).toEqual({
      currentPage: "0",
      totalRecords: 2,
      totalPages: 1,
    });
  });
});
