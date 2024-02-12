import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeSheetEmployee } from '../entities-index';

@Injectable()
export class TimeSheetEmployeeRepository extends Repository<TimeSheetEmployee> {
  constructor(private dataSource: DataSource) {
    super(TimeSheetEmployee, dataSource.createEntityManager());
  }
}
