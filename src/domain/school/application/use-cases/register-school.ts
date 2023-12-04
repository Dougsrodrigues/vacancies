import { HashGenerator } from '@/core/cryptography/hash-generator';
import { Either, left, right } from '@/core/either';
import { Role, RoleEnum } from '@/domain/user/enterprise/entities/user';
import { Injectable } from '@nestjs/common';
import { School } from '../../enterprise/entities/school';
import { SchoolRepository } from '../repositories/school-repository';
import { SchoolAlreadyExistsError } from './errors/school-already-exists-error';

interface RegisterSchoolUseCaseRequest {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  role: Role
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
    cnpj
  }: RegisterSchoolUseCaseRequest): Promise<RegisterSchoolUseCaseResponse> {
    const schoolWithSameCnpj = await this.schoolRepository.findByCnpj(cnpj);

    if (schoolWithSameCnpj) {
      return left(new SchoolAlreadyExistsError(cnpj));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const school = School.create({
      name,
      email,
      password: hashedPassword,
      role: RoleEnum.School,
      cnpj,
    });

    await this.schoolRepository.create(school);

    return right({
      school,
    });
  }
}
