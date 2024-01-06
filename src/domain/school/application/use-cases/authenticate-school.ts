import { Encrypter } from '@/core/cryptography/encrypter';
import { HashComparer } from '@/core/cryptography/hash-comparer';
import { Either, left, right } from '@/core/either';
import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';
import { SchoolRepository } from '../repositories/school-repository';
import { SchoolAlreadyExistsError } from './errors/school-already-exists-error';

interface AuthenticateSchoolUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateSchoolUseCaseResponse = Either<
  SchoolAlreadyExistsError,
  { accessToken: string }
>;

@Injectable()
export class AuthenticateSchoolUseCase {
  constructor(
    private schoolRepository: SchoolRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) { }

  async execute({
    email,
    password
  }: AuthenticateSchoolUseCaseRequest): Promise<AuthenticateSchoolUseCaseResponse> {
    const school = await this.schoolRepository.findByEmail(email)

    if (!school) {
      return left(new WrongCredentialsError())
    }


    const isValidPassword = await this.hashComparer.compare(password, school.password)

    if (!isValidPassword) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: school.id.toString
    })

    return right({
      accessToken,
    });
  }
}
