import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User, UserProps } from '@/domain/user/enterprise/entities/user';
export interface SchoolProps extends UserProps {
  cnpj: string;
}
export class School extends User<SchoolProps> {
  get cnpj(): string {
    return this.props.cnpj
  }

  static create(props: SchoolProps, id?: UniqueEntityID) {
    const school = new School(props, id);

    return school;
  }
}
