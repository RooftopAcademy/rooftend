import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDTO {
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
  @IsString()
  email: string;
}
