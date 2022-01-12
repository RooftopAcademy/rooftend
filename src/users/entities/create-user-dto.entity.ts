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
  @MinLength(8)
  @MaxLength(16)
  @Matches(/^(?=.*[0-9])(?=.*[!-/:-@[-`{-~])[a-z0-9!@#$%^&/]/)
  password: string;

  @ApiProperty({
    description: 'Password Confirmation of user',
    type: String,
  })
  @IsString()
  @PasswordMatch('password')
  passwordConfirmation: string;

  @ApiProperty({
    description: 'Email of user',
    type: String,
  })
  @IsEmail()
  email: string;
}
