import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LogInUserDTO {
  @ApiProperty({
    description: 'Password of user',
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Email of user',
    type: String,
  })
  @IsEmail()
  email: string;
}
