import { ServiceError } from '../../../utils/error.service';
import { UserRepository } from '../../../infrastructure/db/repositories/user.repository';
import { UseCaseInterface } from '../../../shared/interfaces/useCase/useCase.interface';
import { JwtPayload, LoginDto, LoginResponse } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import AuthErrors from '../auth.errors';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase implements UseCaseInterface<LoginResponse> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(body: LoginDto): Promise<LoginResponse> {
    const { password, email } = body;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) throw new ServiceError(AuthErrors.INVALID_CREDENTIAL());

    if (!bcrypt.compareSync(password, user.password))
      throw new ServiceError(AuthErrors.INVALID_CREDENTIAL());

    const token = await this.getJwtToken({
      id: user.id,
    });

    return {
      email,
      token,
    };
  }

  private async getJwtToken(payload: JwtPayload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
