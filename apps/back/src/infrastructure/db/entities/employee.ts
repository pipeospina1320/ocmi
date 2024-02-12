import { DecimalColumnTransformer } from '../../../utils/utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TimeSheetEmployee } from './time-sheet-employee';
import { PayType } from '../../../shared/enums/hrm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: PayType })
  pay_type: PayType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
    default: 0,
  })
  pay_rate: number;

  @OneToMany(() => TimeSheetEmployee, (t) => t.employee)
  timeSheets: TimeSheetEmployee[];

  /**
   * Auto generated created at column
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Auto generated updated at column
   */
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: Omit<Employee, 'updatedAt' | 'createdAt' | 'timeSheets'>) {
    Object.assign(this, data);
  }
}
