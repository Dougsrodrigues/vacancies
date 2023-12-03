import { User, UserProps } from '@/domain/user/enterprise/user';

export interface SchoolProps extends UserProps {

}

export class School extends User<SchoolProps> {


}
