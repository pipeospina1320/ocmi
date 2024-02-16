import { PayType } from '../../../../shared/enums/hrm';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class UpdateTimeSheetEmployeeDto {
  @IsNumber()
  hours: number;
}

export interface CreateTimeSheetEmployeeResponse {
  id: string;
}

export class UpdateEmployeeDto {
  @IsString()
  name: string;

  @IsEnum(PayType)
  payType: PayType;

  @IsNumber()
  @Min(0)
  payRate: number;
}

export interface UpdateEmployeeResponse {
  id: string;
}
