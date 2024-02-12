import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeSheet } from '../entities-index';

@Injectable()
export class TimeSheetRepository extends Repository<TimeSheet> {
  constructor(private dataSource: DataSource) {
    super(TimeSheet, dataSource.createEntityManager());
  }
}
