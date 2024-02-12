import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { LoginUseCase } from './usesCases/login.useCase';
import { RegisterUserUseCase } from './usesCases/register-user.useCase';
import { UserRepository } from '../../infrastructure/db/repositories/user.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [LoginUseCase, RegisterUserUseCase, UserRepository],
  exports: [],
})
export class AuthModule {}
