import { School } from '../../enterprise/entities/school';

export abstract class SchoolRepository {
  abstract findByCnpj(cnpj: string): Promise<School | null>;
  abstract findByEmail(email: string): Promise<School | null>;
  abstract create(school: School): Promise<void>;
}
