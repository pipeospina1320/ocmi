import { ServiceError } from '../../../utils/error.service';
import { UserRepository } from '../../../infrastructure/db/repositories/user.repository';
import { UseCaseInterface } from '../../../shared/interfaces/useCase/useCase.interface';
import AuthErrors from '../auth.errors';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { GetUserResponse } from '../dto/get-user.dto';
import { User } from '../../../infrastructure/db/entities-index';

@Injectable()
export class GetUserUseCase implements UseCaseInterface<GetUserResponse> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(token: string): Promise<GetUserResponse> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      if (!decoded) {
        throw new ServiceError(AuthErrors.INVALID_TOKEN());
      }

      // // TODO validar  usuario
      const user: User = await this.userRepository.findOneBy({
        id: decoded.id,
      });

      if (!user) {
        throw new ServiceError(AuthErrors.INVALID_TOKEN());
      }

      return {
        user: {
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
