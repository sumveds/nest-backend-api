import { UserGroup } from 'src/group/user-group.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ name: 'email', unique: true })
  email: string;

  @OneToMany((type) => UserGroup, (userGroup) => userGroup.user)
  userGroups: UserGroup[];
}
