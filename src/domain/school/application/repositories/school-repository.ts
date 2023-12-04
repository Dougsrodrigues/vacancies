import { School } from '../../enterprise/school';

export abstract class SchoolRepository {
  abstract findByCnpj(cnpj: string): Promise<School | null>;
  abstract create(school: School): Promise<void>;
}
