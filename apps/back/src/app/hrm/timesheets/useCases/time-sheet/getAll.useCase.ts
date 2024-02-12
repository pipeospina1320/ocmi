import { UseCaseInterface } from '../../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';
import { PaginateDto } from '../../../../../utils/pagination/paginate.type';
import {
  PaginateResponse,
  paginate,
} from '../../../../../utils/pagination/paginate.service';
import { TimeSheet } from '../../../../../infrastructure/db/entities-index';
import { TimeSheetRepository } from '../../../../../infrastructure/db/repositories/time-sheet.repository';

@Injectable()
export class GetAllTimeSheetUseCase
  implements UseCaseInterface<PaginateResponse<TimeSheet>>
{
  constructor(private readonly timeSheetRepository: TimeSheetRepository) {}

  async execute(paginateDto: PaginateDto) {
    return await paginate<TimeSheet>(this.timeSheetRepository, paginateDto);
  }
}
