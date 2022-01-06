import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      email,
    });

    return user;
  }

  ///////

  async addUserToDatabase(user: User) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
  }
}
