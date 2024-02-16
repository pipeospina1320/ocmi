import { Module } from '@nestjs/common';
import { CreateUseCase } from './useCases/time-sheet/create.useCase';
import { TimeSheetController } from './controllers/time-sheet.controller';
import { TimeSheetRepository } from '../../../infrastructure/db/repositories/time-sheet.repository';
import { EmployeeRepository } from '../../../infrastructure/db/repositories/employee.repository';
import { TimeSheetEmployeeRepository } from '../../../infrastructure/db/repositories/time-sheet-employee.repository';
import { GetAllEmployeeUseCase } from './useCases/employee/getAll.useCase';
import { TimeSheetEmployeeController } from './controllers/time-sheet-employee.controller';
import { UpdateEmployeeUseCase } from './useCases/employee/updateEmployee.useCase';
import { GetAllTimeSheetUseCase } from './useCases/time-sheet/getAll.useCase';
import { InitFormTimeSheetUseCase } from './useCases/time-sheet/initForm.useCase';

@Module({
  imports: [],
  controllers: [TimeSheetController, TimeSheetEmployeeController],
  providers: [
    CreateUseCase,
    GetAllEmployeeUseCase,
    UpdateEmployeeUseCase,
    GetAllTimeSheetUseCase,
    InitFormTimeSheetUseCase,
    TimeSheetRepository,
    EmployeeRepository,
    TimeSheetEmployeeRepository,
  ],
  exports: [],
})
export class TimeSheetModule {}
