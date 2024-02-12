import { Module } from '@nestjs/common';
import { CreateUseCase } from './useCases/create.useCase';
import { EmployeeRepository } from '../../../infrastructure/db/repositories/employee.repository';
import { EmployeeController } from './controllers/employee.controller';
import { DeleteUseCase } from './useCases/delete.useCase';
import { GetAllUseCase } from './useCases/getAll.useCase';
import { UpdateUseCase } from './useCases/update.useCase';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [
    CreateUseCase,
    DeleteUseCase,
    GetAllUseCase,
    UpdateUseCase,
    EmployeeRepository,
  ],
  exports: [],
})
export class EmployeeModule {}
