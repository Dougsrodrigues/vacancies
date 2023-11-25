import { School } from '../../enterprise/school';

export abstract class SchoolRepository {
  abstract findByEmail(email: string): Promise<School | null>;
  abstract create(school: School): Promise<void>;
}
