import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUseCase } from '../useCases/time-sheet/create.useCase';
import { CreateTimeSheetDto } from '../dto/time-sheet.dto';
import { PaginateDto } from '../../../../utils/pagination/paginate.type';
import { GetAllTimeSheetUseCase } from '../useCases/time-sheet/getAll.useCase';

@Controller('hrm/time-sheet')
export class TimeSheetController {
  constructor(private readonly createUseCase: CreateUseCase,
    private readonly getAllTimeSheetUseCase: GetAllTimeSheetUseCase) {}

  @Post('/')
  async create(@Body() body: CreateTimeSheetDto) {
    return await this.createUseCase.execute(body);
  }

  @Get('/')
  async getAll(
    @Query() params: PaginateDto
  ) {
    return await this.getAllTimeSheetUseCase.execute(params);
  }
}
