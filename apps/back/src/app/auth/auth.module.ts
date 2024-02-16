import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { LoginUseCase } from './usesCases/login.useCase';
import { RegisterUserUseCase } from './usesCases/register-user.useCase';
import { UserRepository } from '../../infrastructure/db/repositories/user.repository';
import { GetUserUseCase } from './usesCases/getUser.useCase';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    GetUserUseCase,
    RegisterUserUseCase,
    UserRepository,
  ],
  exports: [],
})
export class AuthModule {}
