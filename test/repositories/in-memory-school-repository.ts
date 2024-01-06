import { SchoolRepository } from "@/domain/school/application/repositories/school-repository"
import { School } from "@/domain/school/enterprise/entities/school"


export class InMemorySchoolRepository implements SchoolRepository {
  public items: School[] = []

  async findByCnpj(cnpj: string) {
    const school = this.items.find((item) => item.cnpj === cnpj)

    if (!school) {
      return null
    }

    return school
  }

  async create(school: School) {
    this.items.push(school)
  }
}