import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import DBConfig from './config/typeorm.config';
import { EnvConfig } from './config/env.config';
import { AuthModule } from './app/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/guards/auth.guard';
import { HrmModule } from './app/hrm/hrm.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return { ...DBConfig.options, autoLoadEntities: true };
      },
    }),
    JwtModule.register({
      global: true,
      secret: EnvConfig.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    HrmModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
