import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationMiddleware } from './auth/middleware/authorization.middleware';
import { GroupModificationAuthMiddleware } from './group/middleware/group-modification.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    GroupModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(GroupModificationAuthMiddleware)
      .exclude({ path: 'groups/*', method: RequestMethod.GET })
      .forRoutes('groups/*');
  }
}
