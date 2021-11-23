import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'The user id',
    type: BigInt,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Username',
    type: String,
  })
  @IsString()
  username: string;

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

  @ApiProperty({
    description: 'account status of user',
    type: String,
  })
  @IsString()
  accountStatus: string;

  
}
