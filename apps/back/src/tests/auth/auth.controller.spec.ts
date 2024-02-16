import request from 'supertest';
import { AppInstance } from '../utils/appTest';
import { INestApplication } from '@nestjs/common';
import { User } from '../../infrastructure/db/entities-index';
import {
  hashPassword,
  randomUUID,
} from '../../utils/utils';
import { EntityManager } from 'typeorm';
import AuthErrors from '../../app/auth/auth.errors';
import crypto from 'crypto';

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

describe('POST - /register', () => {
  const url = '/auth/register';
  test('OK - Successful registration', async () => {
    const newUser = {
      email: 'prueba@pueba.com',
      password: '123456',
      confirmPassword: '123456',
      name: 'Pruebas antonio',
    };

    await request(app.getHttpServer())
      .post(url)
      .send(newUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({ user: newUser.name, email: newUser.email, name: newUser.name });
  });

  test('ERROR - User already exists', async () => {
    const user = {
      email: 'prueba@pueba.com',
      password: '123456',
      confirmPassword: '123456',
      name: 'Pruebas antonio',
    };

    const storedUser = await manager.save(
      new User({
        id: randomUUID(),
        ...user,
      }),
    );

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(user)
      .set('Accept', 'application/json')
      .expect(400);

    expect(body).toEqual(AuthErrors.USER_ALREADY_EXISTS(storedUser.email));
  });

  test('ERROR - Invalid confirmation password', async () => {
    const user = {
      email: 'prueba@pueba.com',
      password: '123456',
      confirmPassword: '654321',
      name: 'Pruebas antonio',
    };

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(user)
      .set('Accept', 'application/json')
      .expect(400);

    expect(body).toEqual(AuthErrors.INVALID_CONFIRMATION_PASSWORD());
  });
});

describe('POST - /login', () => {
  const url = '/auth/login';

  test('OK - Successful login', async () => {
    const hashedPassword = await hashPassword('123456');
    const storedUser = await manager.save(
      new User({
        id: randomUUID(),
        email: 'prueba@pueba.com',
        password: hashedPassword,
        name: 'Pruebas antonio',
      }),
    );

    const user = {
      email: storedUser.email,
      password: '123456',
    };

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('token');
  });

  test('ERROR - Credentials are not valid', async () => {
    const hashedPassword = await hashPassword('123456');
    const storedUser = await manager.save(
      new User({
        id: randomUUID(),
        email: 'prueba@pueba.com',
        password: hashedPassword,
        name: 'Pruebas antonio',
      }),
    );

    const user = {
      email: storedUser.email,
      password: 'password',
    };

    const { body } = await request(app.getHttpServer())
      .post(url)
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(body).toEqual(AuthErrors.INVALID_CREDENTIAL());
  });
});

describe('GET - /get-user', () => {
  const url = '/auth/get-user';
  test('OK - Successful get user', async () => {
    const { token, storedUser } = await appInstance.getToken();

    const { body } = await request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(body).toEqual({
      user: {
        email: storedUser.email,
        name: storedUser.name,
      },
    });
  });

  test('ERROR - Unauthorized', async () => {
    const token = crypto.randomBytes(64).toString('hex');
    await request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
