import { UseCaseInterface } from '../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../../../infrastructure/db/repositories/employee.repository';
import { ServiceError } from '../../../../utils/error.service';
import AuthErrors from '../../hrm.errors';

@Injectable()
export class DeleteUseCase implements UseCaseInterface<void> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(id: string) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
      throw new ServiceError(AuthErrors.EMPLOYEE_DOES_NOT_EXIST());
    }

    await this.employeeRepository.delete({ id });
  }
}
