import { RegisterSchoolUseCase } from '@/domain/school/application/use-cases/register-school';
import { RoleEnum } from '@/domain/user/enterprise/user';
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';


const createSchoolBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cnpj: z.string(),
  role: z.enum([RoleEnum.Professional, RoleEnum.School]),
})

type CreateSchoolBodySchema = z.infer<typeof createSchoolBodySchema>

@Controller('/school')
export class CreateSchoolController {
  constructor(private registerSchoolUseCase: RegisterSchoolUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createSchoolBodySchema))
  async handle(@Body() body: CreateSchoolBodySchema) {

    const {
      email,
      name,
      password,
      role,
      cnpj
    } = body

    await this.registerSchoolUseCase.execute({
      email,
      name,
      password,
      role,
      cnpj
    })

    return 'ok'
  }
}
