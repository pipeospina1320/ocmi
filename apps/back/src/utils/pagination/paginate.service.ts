import { FindOptionsRelations, ObjectLiteral, Repository } from 'typeorm';
import { PaginateDto } from './paginate.type';

export interface PaginateResponse<Entity> {
  data: Partial<Entity[]>;
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
  };
}

export type WhereOptions<Entity> = {
  [P in keyof Entity]?: Entity[P];
};

export async function paginate<Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
  filter: PaginateDto,
  where?: WhereOptions<Entity>,
  relations?: FindOptionsRelations<Entity>
): Promise<PaginateResponse<Entity>> {
  const { page, limit } = filter;

  const data = await repository.findAndCount({
    skip: page * limit,
    take: limit,
    where,
    relations
  });

  const total_pages =
    data[1] % limit === 0 ? data[1] / limit : Math.trunc(data[1] / limit + 1);

  return {
    pagination: {
      currentPage: page,
      totalRecords: data[1],
      totalPages: Number(total_pages),
    },
    data: data[0],
  };
}
