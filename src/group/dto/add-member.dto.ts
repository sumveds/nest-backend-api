import { IsNotEmpty, IsUUID } from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class AddMemberDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  role: Role;
}
