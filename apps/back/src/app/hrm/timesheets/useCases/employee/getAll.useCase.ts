import { UseCaseInterface } from '../../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';
import { PaginateDto } from '../../../../../utils/pagination/paginate.type';
import {
  PaginateResponse,
  paginate,
} from '../../../../../utils/pagination/paginate.service';
import { TimeSheetEmployee } from '../../../../../infrastructure/db/entities-index';
import { TimeSheetEmployeeRepository } from '../../../../../infrastructure/db/repositories/time-sheet-employee.repository';

@Injectable()
export class GetAllEmployeeUseCase
  implements UseCaseInterface<PaginateResponse<TimeSheetEmployee>>
{
  constructor(
    private readonly timeSheetEmployeeRepository: TimeSheetEmployeeRepository
  ) {}

  async execute(timeSheetId: string, paginateDto: PaginateDto) {
    return await paginate<TimeSheetEmployee>(
      this.timeSheetEmployeeRepository,
      paginateDto,
      { time_sheet_id: timeSheetId }
    );
  }
}
