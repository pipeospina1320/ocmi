import { UseCaseInterface } from '../../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';
import {
  UpdateTimeSheetEmployeeDto,
  CreateTimeSheetEmployeeResponse,
} from '../../dto/time-sheet-employee.dto';
import { TimeSheetEmployeeRepository } from '../../../../../infrastructure/db/repositories/time-sheet-employee.repository';
import { ServiceError } from '../../../../../utils/error.service';
import AuthErrors from '../../../hrm.errors';
import { PayType } from '../../../../../shared/enums/hrm';

@Injectable()
export class UpdateEmployeeUseCase
  implements UseCaseInterface<CreateTimeSheetEmployeeResponse>
{
  constructor(
    private readonly timeSheetEmployeeRepository: TimeSheetEmployeeRepository
  ) {}

  async execute(data: UpdateTimeSheetEmployeeDto) {
    const { id, hours } = data;

    const employee = await this.timeSheetEmployeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
      throw new ServiceError(
        AuthErrors.EMPLOYEE_DOES_NOT_EXIST_IN_TIME_SHEET()
      );
    }

    let grossWage = 0;
    if (employee.pay_type === PayType.HOURLY) {
      grossWage = employee.pay_rate * hours;
    } else {
      grossWage = employee.pay_rate;
    }

    employee.hours = hours;
    employee.gross_wage = grossWage;
    const storedEmployee = await this.timeSheetEmployeeRepository.save(
      employee
    );

    return {
      id: storedEmployee.id,
      payType: storedEmployee.pay_type,
      pay_rate: storedEmployee.pay_rate,
      hours: storedEmployee.hours,
      gross_wage: storedEmployee.gross_wage,
    };
  }
}
