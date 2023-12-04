import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { School } from "@/domain/school/enterprise/school";
import { Role } from "@/domain/user/enterprise/user";
import { Prisma, School as PrismaQuestion } from "@prisma/client";

export class PrismaSchoolMapper {
  static toDomain(raw: PrismaQuestion): School {
    return School.create({
      id: new UniqueEntityID(raw.id),
      cnpj: raw.cnpj,
      email: raw.email,
      name: raw.name,
      password: raw.password,
      role: raw.role as Role
    },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(school: School): Prisma.SchoolUncheckedCreateInput {
    return {
      id: school.id.toString(),
      cnpj: school.cnpj,
      email: school.email,
      name: school.name,
      password: school.password,
      role: school.role as Role
    }
  }
}