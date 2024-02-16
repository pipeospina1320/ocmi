import { PayType } from '../../../../shared/enums/hrm';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsEnum(PayType)
  payType: PayType;

  @IsNumber()
  @Min(0)
  payRate: number;
}

export interface CreateEmployeeResponse {
  id: string;
  name: string;
  payType: PayType;
  payRate: number;
}

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(PayType)
  @IsOptional()
  payType?: PayType;

  @IsNumber()
  @Min(0)
  @IsOptional()
  payRate?: number;
}

export interface UpdateEmployeeResponse {
  id: string;
  name: string;
  payType: PayType;
  payRate: number;
}
