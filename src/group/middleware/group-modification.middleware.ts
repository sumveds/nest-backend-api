import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Role } from 'src/auth/role.enum';
import { GroupService } from '../group.service';

@Injectable()
export class GroupModificationAuthMiddleware implements NestMiddleware {
  constructor(private groupService: GroupService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function) {
    const userId: string = req.header('x-auth');
    const groupId = req.params['0'].split('/')[0];
    const userGroup = await this.groupService.getUserGroup(userId, groupId);
    if (
      userGroup &&
      [Role.GLOBAL_MANAGER, Role.MANAGER].includes(userGroup.role)
    ) {
      next();
    } else {
      throw new UnauthorizedException('Operation unauthorized');
    }
  }
}
