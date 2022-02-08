import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { StringMatch } from '../class-validator/string-match.decorator';

export class EmailChangeDTO {
  @ApiProperty({
    description: 'Email of user',
    type: String,
  })
  @IsEmail(
    {},
    {
      message: 'EMAIL_NOT_VALID',
    },
  )
  email: string;

  @ApiProperty({
    description: 'Email confirmation of user',
    type: String,
  })
  @IsString()
  @StringMatch('email', {
    message: 'EMAIL_CONFIRMATION_NOT_MATCHING',
  })
  emailConfirmation: string;
}
