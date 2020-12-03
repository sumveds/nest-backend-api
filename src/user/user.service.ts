import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;

  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    return found;
  }

  async createUser(userDto: UserDto): Promise<User> {
    try {
      const user = await this.userRepository.createUser(userDto);
      return user;
    } catch (error) {
      Logger.error('Error occured while creating user', error.stack);
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(id: string, userDto: UserDto): Promise<User> {
    try {
      const user = new User();
      user.id = id;
      user.email = userDto.email;
      return await this.userRepository.save(user);
    } catch (error) {
      Logger.error('Error occured while creating user', error.stack);
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
