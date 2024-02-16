import { DecimalColumnTransformer } from '../../../utils/utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee';
import { PayType } from '../../../shared/enums/hrm';
import { TimeSheet } from './time-sheet';

@Entity('time_sheets_employee')
export class TimeSheetEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  time_sheet_id: string;

  @Column('uuid')
  employee_id: string;

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

  @Column()
  hours: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
    default: 0,
  })
  gross_wage: number;

  @ManyToOne(() => Employee, (e) => e.timeSheets)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => TimeSheet)
  @JoinColumn({ name: 'time_sheet_id' })
  timeSheet: TimeSheet;

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

  constructor(
    data: Omit<
      TimeSheetEmployee,
      'employee' | 'timeSheet' | 'updatedAt' | 'createdAt'
    >,
  ) {
    Object.assign(this, data);
  }
}
