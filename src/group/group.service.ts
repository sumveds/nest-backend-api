import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';
import { Group } from './group.entity';
import { GroupRepository } from './group.repository';
import { UserGroup } from './user-group.entity';
import { UserGroupRepository } from './user-group.repository';

@Injectable()
export class GroupService {
  private logger = new Logger('GroupService');

  @InjectRepository(GroupRepository)
  private groupRepository: GroupRepository;

  @InjectRepository(UserGroupRepository)
  private userGroupRepository: UserGroupRepository;

  async getGroupById(id: string): Promise<Group> {
    const found = await this.groupRepository.getGroup(id);
    if (!found) {
      throw new NotFoundException(`Group id ${id} not found`);
    }
    return found;
  }

  async deleteGroup(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }

  async createGroup(
    createGroupDto: CreateGroupDto,
    userId: string,
  ): Promise<Group> {
    return await this.groupRepository.createGroup(createGroupDto, userId);
  }

  async getUserGroup(userId: string, groupId: string): Promise<UserGroup> {
    return await this.userGroupRepository.getUserGroup(userId, groupId);
  }

  async associateMember(
    addMemberDto: AddMemberDto,
    groupId: string,
  ): Promise<void> {
    return await this.userGroupRepository.associateMember(
      addMemberDto,
      groupId,
    );
  }

  async removeMember(
    removeMemberDto: RemoveMemberDto,
    groupId: string,
  ): Promise<void> {
    return await this.userGroupRepository.removeMember(
      removeMemberDto,
      groupId,
    );
  }
}
