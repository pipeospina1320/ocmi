
import { PayType } from '../../../../shared/enums/hrm';
import { IsDate, IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class CreateTimeSheetDto {
  @IsDate()
  periodPayStart: Date;

  @IsDate()
  periodPayEnd: Date;
}

export interface CreateTimeSheetResponse {
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
