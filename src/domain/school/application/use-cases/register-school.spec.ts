import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemorySchoolRepository } from 'test/repositories/in-memory-school-repository'
import { RegisterSchoolUseCase } from './register-school'

let inMemorySchoolRepository: InMemorySchoolRepository
let fakeHasher: FakeHasher

let sut: RegisterSchoolUseCase

describe('Register School', () => {
  beforeEach(() => {
    inMemorySchoolRepository = new InMemorySchoolRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterSchoolUseCase(inMemorySchoolRepository, fakeHasher)
  })

  it('should be able to register a new school', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      school: inMemorySchoolRepository.items[0],
    })
  })

  it('should hash school password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    const passwordSchool = inMemorySchoolRepository.items[0].password


    expect(result.isRight()).toBe(true)
    expect(passwordSchool).toEqual(hashedPassword)
  })
})