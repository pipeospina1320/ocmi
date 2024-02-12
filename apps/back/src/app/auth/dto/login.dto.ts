import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
}

export interface JwtPayload {
  id: string;
}
