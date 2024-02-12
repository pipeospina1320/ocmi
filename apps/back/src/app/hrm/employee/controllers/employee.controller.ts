import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateEmployeeDto,
  CreateEmployeeResponse,
  UpdateEmployeeDto,
  UpdateEmployeeResponse,
} from '../dto/employee.dto';
import { CreateUseCase } from '../useCases/create.useCase';
import { DeleteUseCase } from '../useCases/delete.useCase';
import { PaginateDto } from '../../../../utils/pagination/paginate.type';
import { GetAllUseCase } from '../useCases/getAll.useCase';
import { UpdateUseCase } from '../useCases/update.useCase';

@Controller('hrm/employee')
export class EmployeeController {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
    private readonly getAllUseCase: GetAllUseCase,
    private readonly updateUseCase: UpdateUseCase
  ) {}

  @Post('/')
  async create(
    @Body() body: CreateEmployeeDto
  ): Promise<CreateEmployeeResponse> {
    return await this.createUseCase.execute(body);
  }

  @Patch('/:id')
  async patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateEmployeeDto
  ): Promise<UpdateEmployeeResponse> {
    return await this.updateUseCase.execute(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.deleteUseCase.execute(id);
  }

  @Get('/')
  async getAll(@Query() params: PaginateDto) {
    return await this.getAllUseCase.execute(params);
  }
}
