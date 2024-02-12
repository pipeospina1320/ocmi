import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Employee } from '../entities/employee';

@Injectable()
export class EmployeeRepository extends Repository<Employee> {
  constructor(private dataSource: DataSource) {
    super(Employee, dataSource.createEntityManager());
  }
}
