import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UpdateTimeSheetEmployeeDto } from '../dto/time-sheet-employee.dto';
import { UpdateEmployeeUseCase } from '../useCases/employee/updateEmployee.useCase';
import { PaginateDto } from '../../../../utils/pagination/paginate.type';
import { GetAllEmployeeUseCase } from '../useCases/employee/getAll.useCase';

@Controller('hrm/time-sheet/employee')
export class TimeSheetEmployeeController {
  constructor(
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly getAllEmployeeUseCase: GetAllEmployeeUseCase,
  ) {}

  @Patch('/update-hours/:id')
  async create(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTimeSheetEmployeeDto,
  ) {
    return await this.updateEmployeeUseCase.execute(id, body);
  }

  @Get('/:id')
  async getAll(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() params: PaginateDto,
  ) {
    return await this.getAllEmployeeUseCase.execute(id, params);
  }
}
