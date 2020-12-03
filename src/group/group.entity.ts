import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGroup } from './user-group.entity';

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => UserGroup, (userGroup) => userGroup.group, {
    eager: true,
  })
  userGroups: UserGroup[];
}
