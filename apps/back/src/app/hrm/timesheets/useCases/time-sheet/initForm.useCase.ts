import { UseCaseInterface } from '../../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';

import { TimeSheetRepository } from '../../../../../infrastructure/db/repositories/time-sheet.repository';
import { InitFormResponse } from '../../dto/time-sheet.dto';
import { ServiceError } from '../../../../../utils/error.service';
import hrmErrors from '../../../hrm.errors';

@Injectable()
export class InitFormTimeSheetUseCase
  implements UseCaseInterface<InitFormResponse>
{
  constructor(private readonly timeSheetRepository: TimeSheetRepository) {}

  async execute(id: string) {
    console.log(id)
    const timeSheet = await this.timeSheetRepository.findOne({
      where: { id },
    });

    if (!timeSheet) {
      throw new ServiceError(hrmErrors.TIME_SHEET_DOES_NOT_EXIST());
    }

    return {
      timeSheet,
    };
  }
}
