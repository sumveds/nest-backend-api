import { Role } from 'src/auth/role.enum';
import { User } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Group } from './group.entity';

@Entity()
@Unique(['user.id', 'group.id'])
export class UserGroup extends BaseEntity {
  @Column()
  role: Role;
  @ManyToOne((type) => User, (user) => user.userGroups, {
    primary: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;
  @ManyToOne((type) => Group, (group) => group.userGroups, {
    primary: true,
    onDelete: 'CASCADE',
  })
  group: Group;
}
