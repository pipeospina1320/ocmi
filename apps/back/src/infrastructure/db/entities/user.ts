import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({
    unique: true,
  })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

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

  constructor(data: Omit<User, 'updatedAt' | 'createdAt'>) {
    Object.assign(this, data);
  }
}
