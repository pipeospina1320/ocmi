import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, LoginResponse } from '../dto/login.dto';
import { LoginUseCase } from '../usesCases/login.useCase';
import { RegisterUserDto, RegisterUserResponse } from '../dto/register.dto';
import { RegisterUserUseCase } from '../usesCases/register-user.useCase';
import { Public } from '../../../shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUserUseCase
  ) {}

  @Post('/register')
  @Public()
  async registerCompany(
    @Body() body: RegisterUserDto
  ): Promise<RegisterUserResponse> {
    return await this.registerUseCase.execute(body);
  }

  @Post('/login')
  @Public()
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return await this.loginUseCase.execute(body);
  }
}
