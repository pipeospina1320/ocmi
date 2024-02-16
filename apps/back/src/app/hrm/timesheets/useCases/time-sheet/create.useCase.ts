import { UseCaseInterface } from '../../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';
import {
  CreateTimeSheetDto,
  CreateTimeSheetResponse,
} from '../../dto/time-sheet.dto';
import { TimeSheetRepository } from '../../../../../infrastructure/db/repositories/time-sheet.repository';
import {
  TimeSheet,
  TimeSheetEmployee,
} from '../../../../../infrastructure/db/entities-index';
import { randomUUID } from '../../../../../utils/utils';
import { EmployeeRepository } from '../../../../../infrastructure/db/repositories/employee.repository';
import { TimeSheetEmployeeRepository } from '../../../../../infrastructure/db/repositories/time-sheet-employee.repository';
import { PayType } from '../../../../../shared/enums/hrm';

@Injectable()
export class CreateUseCase
  implements UseCaseInterface<CreateTimeSheetResponse>
{
  constructor(
    private readonly timeSheetRepository: TimeSheetRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly timeSheetEmployeeRepository: TimeSheetEmployeeRepository,
  ) {}

  async execute(data: CreateTimeSheetDto) {
    const { periodPayStart, periodPayEnd } = data;

    const newTimeSheet = new TimeSheet({
      id: randomUUID(),
      check_date: new Date(),
      gross_payroll: 0,
      period_pay_start: periodPayStart,
      period_pay_end: periodPayEnd,
    });

    const storedEmployee = await this.timeSheetRepository.save(newTimeSheet);
    // async storing
    this.addEmployees(storedEmployee.id);

    return storedEmployee;
  }

  async addEmployees(timeSheetId: string) {
    const employees = await this.employeeRepository.find();

    const tsEmployees = employees.map((employee) => {
      return new TimeSheetEmployee({
        id: randomUUID(),
        time_sheet_id: timeSheetId,
        employee_id: employee.id,
        pay_type: employee.pay_type,
        pay_rate: employee.pay_rate,
        hours: 0,
        gross_wage:
          employee.pay_type === PayType.SALARY ? employee.pay_rate : 0,
      });
    });

    await this.timeSheetEmployeeRepository.save(tsEmployees);
  }
}
