import { UseCaseInterface } from '../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, CreateEmployeeResponse } from '../dto/employee.dto';
import { EmployeeRepository } from '../../../../infrastructure/db/repositories/employee.repository';
import { ServiceError } from '../../../../utils/error.service';
import AuthErrors from '../../hrm.errors';
import { randomUUID } from 'crypto';
import {
  Employee,
} from '../../../../infrastructure/db/entities/employee';
import { PayType } from '../../../../shared/enums/hrm';

@Injectable()
export class CreateUseCase implements UseCaseInterface<CreateEmployeeResponse> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(data: CreateEmployeeDto) {
    const { name, payRate, payType } = data;

    console.log('here');
    const employee = await this.employeeRepository.findOne({
      where: { name },
    });

    if (employee) {
      throw new ServiceError(AuthErrors.EMPLOYEE_ALREADY_EXISTS());
    }

    // This could be stored in DynamoDB
    const minimumWage = {
      [PayType.HOURLY]: 12,
      [PayType.SALARY]: 480,
    };

    if (payRate < minimumWage[payType]) {
      throw new ServiceError(AuthErrors.EMPLOYEE_MINIMUM_WAGE());
    }

    const newEmployee = new Employee({
      id: randomUUID(),
      name,
      pay_type: payType,
      pay_rate: payRate,
    });

    const storedEmployee = await this.employeeRepository.save(newEmployee);

    return {
      id: storedEmployee.id,
      name,
      payType,
      payRate: storedEmployee.pay_rate,
    };
  }
}
