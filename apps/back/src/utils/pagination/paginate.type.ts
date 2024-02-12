import { IsNumber, Min } from 'class-validator';

export class PaginateDto {
  @IsNumber()
  @Min(0)
  page: number;

  @IsNumber()
  @Min(1)
  limit: number;
}
