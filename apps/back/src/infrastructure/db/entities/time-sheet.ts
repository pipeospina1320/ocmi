import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('time_sheets')
export class TimeSheet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
  })
  check_date: Date;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value.toISOString().slice(0, 10), // format the Date to YYYY-MM-DD
    },
  })
  period_pay_start: Date;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value.toISOString().slice(0, 10), // format the Date to YYYY-MM-DD
    },
  })
  period_pay_end: Date;

  @Column({ default: 0 })
  gross_payroll: number;

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

  constructor(data: Omit<TimeSheet, 'updatedAt' | 'createdAt'>) {
    Object.assign(this, data);
  }
}
