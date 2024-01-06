import { WrongCredentialsError } from '@/core/errors/wrong-credentials-error';
import { AuthenticateSchoolUseCase } from '@/domain/school/application/use-cases';
import { RoleEnum } from '@/domain/user/enterprise/entities/user';
import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';


const authenticateBySchema = z.object({
  role: z.nativeEnum(RoleEnum),
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBySchema = z.infer<typeof authenticateBySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateSchoolUseCase: AuthenticateSchoolUseCase) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBySchema))
  async handle(@Body() body: AuthenticateBySchema) {
    const { email, password } = body

    const result = await this.authenticateSchoolUseCase.execute({
      email, password
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
