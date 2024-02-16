import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

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

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const generateRandomEmail = () => {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}@example.com`;
};
