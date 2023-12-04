import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';


export type Role = 'school' | 'professional'

export enum RoleEnum {
  School = 'school',
  Professional = 'professional'
}

export interface UserProps {
  id?: UniqueEntityID
  name: string;
  email: string;
  password: string;
  role: Role;
}

export class User<
  Props extends UserProps,
> extends Entity<Props> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get role(): string {
    return this.props.role;
  }
}
