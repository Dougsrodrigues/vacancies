import { SchoolRepository } from "@/domain/school/application/repositories/school-repository"
import { School } from "@/domain/school/enterprise/school"


export class InMemorySchoolRepository implements SchoolRepository {
  public items: School[] = []

  async findByEmail(email: string) {
    const school = this.items.find((item) => item.email === email)

    if (!school) {
      return null
    }

    return school
  }

  async create(school: School) {
    this.items.push(school)
  }
}