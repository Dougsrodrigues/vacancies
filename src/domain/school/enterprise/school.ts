import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface SchoolProps {
  name: string;
  email: string;
  password: string;
}

export class School<
  Props extends SchoolProps,
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

  static create(props: SchoolProps, id?: UniqueEntityID) {
    const school = new School(props, id);

    return school;
  }
}
