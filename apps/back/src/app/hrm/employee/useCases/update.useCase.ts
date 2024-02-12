import { UseCaseInterface } from '../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';
import { UpdateEmployeeResponse, UpdateEmployeeDto } from '../dto/employee.dto';
import { EmployeeRepository } from '../../../../infrastructure/db/repositories/employee.repository';
import { ServiceError } from '../../../../utils/error.service';
import AuthErrors from '../../hrm.errors';
import { PayType } from '../../../../shared/enums/hrm';

@Injectable()
export class UpdateUseCase implements UseCaseInterface<UpdateEmployeeResponse> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(id: string, data: UpdateEmployeeDto) {
    const { payRate, payType } = data;

    const employee = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
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

    Object.assign(employee, { ...data });
    const updated = await this.employeeRepository.save(employee);

    return {
      id: updated.id,
      name: updated.name,
      payType: updated.pay_type,
      payRate: updated.pay_rate,
    };
  }
}
