import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    const userId: string = req.header('x-auth');
    return this.groupService.createGroup(createGroupDto, userId);
  }

  @Get('/:id')
  getGroupById(@Param('id', ParseUUIDPipe) id: string): Promise<Group> {
    return this.groupService.getGroupById(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteGroup(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.groupService.deleteGroup(id);
  }

  @Post('/:id/members')
  @HttpCode(HttpStatus.NO_CONTENT)
  associateMember(
    @Body() addMemberDto: AddMemberDto,
    @Param('id', ParseUUIDPipe) groupId: string,
  ): Promise<void> {
    return this.groupService.associateMember(addMemberDto, groupId);
  }

  @Delete('/:id/members')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMember(
    @Body() removeMemberDto: RemoveMemberDto,
    @Param('id', ParseUUIDPipe) groupId: string,
  ): Promise<void> {
    return this.groupService.removeMember(removeMemberDto, groupId);
  }
}
