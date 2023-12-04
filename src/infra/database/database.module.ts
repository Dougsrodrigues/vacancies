/*
https://docs.nestjs.com/modules
*/

import { SchoolRepository } from '@/domain/school/application/repositories/school-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaSchoolRepository } from './prisma/repositories/prisma-school-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: SchoolRepository,
      useClass: PrismaSchoolRepository
    }
  ],
  exports: [PrismaService, SchoolRepository],
})
export class DatabaseModule { }
