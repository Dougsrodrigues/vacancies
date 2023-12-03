import { Either, left, right } from '@/core/either';
import { RoleEnum } from '@/domain/user/enterprise/user';
import { HashGenerator } from '@/infra/cryptography/hash-generator';
import { Injectable } from '@nestjs/common';
import { School } from '../../enterprise/school';
import { SchoolRepository } from '../repositories/school-repository';
import { SchoolAlreadyExistsError } from './errors/school-already-exists-error';

interface RegisterSchoolUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterSchoolUseCaseResponse = Either<
  SchoolAlreadyExistsError,
  { school: School }
>;

@Injectable()
export class RegisterSchoolUseCase {
  constructor(
    private schoolRepository: SchoolRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async execute({
    email,
    name,
    password,
  }: RegisterSchoolUseCaseRequest): Promise<RegisterSchoolUseCaseResponse> {
    const schoolWithSameEmail = await this.schoolRepository.findByEmail(email);

    if (schoolWithSameEmail) {
      return left(new SchoolAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const school = School.create({
      name,
      email,
      password: hashedPassword,
      role: RoleEnum.School
    });

    await this.schoolRepository.create(school);

    return right({
      school,
    });
  }
}
