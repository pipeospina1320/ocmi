import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginDto, LoginResponse } from '../dto/login.dto';
import { LoginUseCase } from '../usesCases/login.useCase';
import { RegisterUserDto, RegisterUserResponse } from '../dto/register.dto';
import { RegisterUserUseCase } from '../usesCases/register-user.useCase';
import { Public } from '../../../shared/decorators/public.decorator';
import { GetUserUseCase } from '../usesCases/getUser.useCase';
import { GetUserResponse } from '../dto/get-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}

  @Post('/register')
  @Public()
  async register(
    @Body() body: RegisterUserDto,
  ): Promise<RegisterUserResponse> {
    return await this.registerUseCase.execute(body);
  }

  @Post('/login')
  @Public()
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return await this.loginUseCase.execute(body);
  }

  @Get('/get-user')
  async getUser(@Req() req: Request): Promise<GetUserResponse> {
    return await this.getUserUseCase.execute(req.token);
  }
}
