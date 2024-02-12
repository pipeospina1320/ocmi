import { ServiceError } from '../../../utils/error.service';
import { UserRepository } from '../../../infrastructure/db/repositories/user.repository';
import { UseCaseInterface } from '../../../shared/interfaces/useCase/useCase.interface';
import { RegisterUserDto, RegisterUserResponse } from '../dto/register.dto';
import AuthErrors from '../auth.errors';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { randomUUID } from '../../../utils/utils';
import { User } from '../../../infrastructure/db/entities-index';

@Injectable()
export class RegisterUserUseCase
  implements UseCaseInterface<RegisterUserResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: RegisterUserDto) {
    const { password, confirmPassword, email, name } = data;

    if (password !== confirmPassword) {
      throw new ServiceError(AuthErrors.INVALID_CONFIRMATION_PASSWORD());
    }

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new ServiceError(AuthErrors.USER_ALREADY_EXISTS(email));
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = new User({
      id: randomUUID(),
      email: email,
      password: hashedPassword,
      name: name,
    });

    await this.userRepository.save(newUser);

    return {
      user: newUser.name,
    };
  }

  private hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };
}
