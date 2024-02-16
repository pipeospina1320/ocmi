import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUseCase } from '../useCases/time-sheet/create.useCase';
import {
  CreateTimeSheetDto,
  InitFormTimeSheetDto,
} from '../dto/time-sheet.dto';
import { PaginateDto } from '../../../../utils/pagination/paginate.type';
import { GetAllTimeSheetUseCase } from '../useCases/time-sheet/getAll.useCase';
import { InitFormTimeSheetUseCase } from '../useCases/time-sheet/initForm.useCase';

@Controller('hrm/time-sheet')
export class TimeSheetController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly getAllTimeSheetUseCase: GetAllTimeSheetUseCase,
    private readonly initFormTimeSheetDto: InitFormTimeSheetUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: CreateTimeSheetDto) {
    return await this.createUseCase.execute(body);
  }

  @Get('/')
  async getAll(@Query() params: PaginateDto) {
    return await this.getAllTimeSheetUseCase.execute(params);
  }

  @Get('/init-form')
  async initForm(@Query() { id }: InitFormTimeSheetDto) {
    return await this.initFormTimeSheetDto.execute(id);
  }
}
