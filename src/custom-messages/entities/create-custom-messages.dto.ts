import { IsString } from 'class-validator';

export class CreateCustomMessageDTO {
  @IsString()
  subject: string;

  @IsString()
  message: string;
}
