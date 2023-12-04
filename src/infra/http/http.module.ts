/*
https://docs.nestjs.com/modules
*/

import { RegisterSchoolUseCase } from '@/domain/school/application/use-cases/register-school';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateSchoolController } from './controllers/create-school.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateSchoolController],
  providers: [
    RegisterSchoolUseCase
  ],
})
export class HttpModule { }
