import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function) {
    const userId: string = req.header('x-auth');
    if (userId) {
      try {
        await this.userService.getUserById(userId);
        next();
      } catch (error: any) {
        throw new UnauthorizedException('User not found');
      }
    } else {
      throw new UnauthorizedException('Auth header missing');
    }
  }
}
