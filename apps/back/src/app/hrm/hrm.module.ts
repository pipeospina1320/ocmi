import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { TimeSheetModule } from './timesheets/time-sheet.module';

@Module({
  imports: [EmployeeModule, TimeSheetModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class HrmModule {}
