import { Role } from '@/libs/schemas';

export interface PayloadProps {
  sub: string;
  email: string;
  role: Role;
}
