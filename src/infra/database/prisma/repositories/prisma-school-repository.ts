import { SchoolRepository } from "@/domain/school/application/repositories/school-repository";
import { School } from "@/domain/school/enterprise/entities/school";
import { Injectable } from "@nestjs/common";
import { PrismaSchoolMapper } from "../mappers/prisma-school-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaSchoolRepository implements SchoolRepository {
  constructor(
    private prisma: PrismaService
  ) { }


  async create(school: School): Promise<void> {
    const data = PrismaSchoolMapper.toPrisma(school)

    await this.prisma.school.create({
      data
    })
  }

  async findByCnpj(cnpj: string): Promise<School> {
    const school = await this.prisma.school.findUnique({
      where: {
        cnpj
      }
    })

    if (!school) return null

    return PrismaSchoolMapper.toDomain(school)
  }


  async findByEmail(email: string): Promise<School> {
    const school = await this.prisma.school.findUnique({
      where: {
        email
      }
    })

    if (!school) return null

    return PrismaSchoolMapper.toDomain(school)
  }

}