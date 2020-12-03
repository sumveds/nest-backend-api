import { Connection, EntityRepository, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { User } from '../user/user.entity';
import { UserGroup } from './user-group.entity';
import { Role } from 'src/auth/role.enum';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  constructor(private connection: Connection) {
    super();
  }

  async getGroup(groupId: string): Promise<Group> {
    return await this.findOne(groupId);
  }

  async createGroup(
    createGroupDto: CreateGroupDto,
    userId: string,
  ): Promise<Group> {
    return await this.connection.transaction(async () => {
      const { name } = createGroupDto;

      const group = new Group();
      group.name = name;

      const user = new User();
      user.id = userId;

      const userGroup = new UserGroup();
      userGroup.user = user;
      userGroup.role = Role.MANAGER;
      userGroup.group = group;
      await group.save();
      await userGroup.save();

      return group;
    });
  }
}
