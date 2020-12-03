import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddMemberDto } from './dto/add-member.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';
import { Group } from './group.entity';
import { UserGroup } from './user-group.entity';

@EntityRepository(UserGroup)
export class UserGroupRepository extends Repository<UserGroup> {
  async getUserGroup(userId: string, groupId: string): Promise<UserGroup> {
    return await this.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
    });
  }

  async associateMember(
    addMemberDto: AddMemberDto,
    groupId: string,
  ): Promise<void> {
    const userGroup = new UserGroup();

    const user = new User();
    user.id = addMemberDto.userId;
    userGroup.user = user;

    const group = new Group();
    group.id = groupId;
    userGroup.group = group;

    userGroup.role = addMemberDto.role;

    await userGroup.save();
  }

  async removeMember(
    removeMemberDto: RemoveMemberDto,
    groupId: string,
  ): Promise<void> {
    const userGroup = new UserGroup();

    const user = new User();
    user.id = removeMemberDto.userId;
    userGroup.user = user;

    const group = new Group();
    group.id = groupId;
    userGroup.group = group;

    await userGroup.remove();
  }
}
