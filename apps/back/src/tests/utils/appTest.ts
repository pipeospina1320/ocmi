import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../main.module';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { generateRandomEmail, hashPassword } from '../../utils/utils';
import { User } from '../../infrastructure/db/entities-index';
import { randomUUID } from 'crypto';
import { EnvConfig } from '../../config/env.config';

export class AppInstance {
  moduleRef: TestingModule;
  async getAppInstance(): Promise<INestApplication> {
    this.moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = this.moduleRef.createNestApplication();

    return await app.init();
  }

  getConnection(): EntityManager {
    // Get the database connection
    return this.moduleRef.get<EntityManager>(EntityManager);
  }

  getJWTService(): JwtService {
    return this.moduleRef.get<JwtService>(JwtService);
  }

  async getToken() {
    const manager = this.getConnection();

    const hashedPassword = await hashPassword('123456');

    const storedUser = await manager.save(
      new User({
        id: randomUUID(),
        email: generateRandomEmail(),
        password: hashedPassword,
        name: 'Pruebas',
      }),
    );

    try {
      const token = await this.getJWTService().signAsync(
        { id: storedUser.id },
        { secret: EnvConfig.JWT_SECRET },
      );

      return { token, storedUser };
    } catch (error) {
      throw new Error('Error getting token');
    }
  }
}
