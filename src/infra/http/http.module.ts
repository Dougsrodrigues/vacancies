/*
https://docs.nestjs.com/modules
*/

import { RegisterSchoolUseCase } from '@/domain/school/application/use-cases/register-school';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { CreateSchoolController } from './controllers/create-school.controller';
import { AuthenticateController } from './controllers';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateSchoolController, AuthenticateController],
  providers: [
    RegisterSchoolUseCase
  ],
})
export class HttpModule { }
