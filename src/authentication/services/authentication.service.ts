import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../../users/entities/create-user-dto.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async checkEmail(user: CreateUserDTO) {
    const userExists = await this.usersService.findOneByEmail(
      user.email.toLowerCase(),
    );

    if (userExists) {
      throw new HttpException(
        'The user is already registered',
        HttpStatus.CONFLICT,
      );
    }
  }

  async checkPass(password: string) {
    if (password.length > 16) {
      throw new HttpException(
        'Password must not contain more than 16 characters.',
        HttpStatus.CONFLICT,
      );
    }

    if (password.length < 8) {
      throw new HttpException(
        'Password must contain at least 8 characters.',
        HttpStatus.CONFLICT,
      );
    }

    //buscar expresión regular que funcione
    // const regEx = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/g;
    // if (regEx.test(password)) {
    //   throw new HttpException(
    //     'The password can contain letters,numbers and special characters only.',
    //     HttpStatus.CONFLICT,
    //   );
    // }
  }

  async create(user: CreateUserDTO) {
    user.email = user.email.toLowerCase();
    user.password = await bcrypt.hash(user.password, 10);
    await this.usersService.create(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email.toLowerCase());

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await bcrypt.compare(pass, user.password);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
