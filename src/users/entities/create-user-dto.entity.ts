import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PasswordMatch } from '../class-validator/password-match.decorator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Password of user',
    type: String,
  })
  @IsString()
  @MinLength(8, {
    message: 'Password must not contain less than 8 characters',
  })
  @MaxLength(16, {
    message: 'Password must not contain more than 16 characters',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one capital letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @ApiProperty({
    description: 'Password Confirmation of user',
    type: String,
  })
  @IsString()
  @PasswordMatch('password', {
    message: 'Password and password confirmation not matching',
  })
  passwordConfirmation: string;

  @ApiProperty({
    description: 'Email of user',
    type: String,
  })
  @IsEmail(
    {},
    {
      message: 'Email is not valid',
    },
  )
  email: string;
}
