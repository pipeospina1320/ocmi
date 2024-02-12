import { UseCaseInterface } from '../../../../shared/interfaces/useCase/useCase.interface';
import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../../../infrastructure/db/repositories/employee.repository';
import { Employee } from '../../../../infrastructure/db/entities/employee';
import { PaginateDto } from '../../../../utils/pagination/paginate.type';
import {
  PaginateResponse,
  paginate,
} from '../../../../utils/pagination/paginate.service';

@Injectable()
export class GetAllUseCase
  implements UseCaseInterface<PaginateResponse<Employee>>
{
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(paginateDto: PaginateDto) {
    return await paginate<Employee>(this.employeeRepository, paginateDto);
  }
}
