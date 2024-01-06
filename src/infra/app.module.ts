import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';

import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (envs) => envSchema.parse(envs),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule
  ]
})
export class AppModule { }
