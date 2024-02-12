import { v4 as uuid } from 'uuid';

export const randomUUID = () => {
  return uuid();
};

export class DecimalColumnTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
