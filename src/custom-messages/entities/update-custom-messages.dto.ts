import { IsOptional, IsString } from 'class-validator';

export class UpdateCustomMessageDTO {
  @IsOptional()
  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  message: string;
}
