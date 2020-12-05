import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.createUser(userDto);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userDto: UserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, userDto);
  }
}
