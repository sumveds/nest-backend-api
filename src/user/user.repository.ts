import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor() {
    super();
  }

  async createUser(userDto: UserDto): Promise<User> {
    const { email } = userDto;
    const user = new User();
    user.email = email;
    await user.save();
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    console.log(this);
    const users = await this.find({ where: { email } });
    const user = users && users.length > 0 ? users[0] : undefined;
    return user;
  }
}
