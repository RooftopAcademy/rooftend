import { ApiProperty } from "@nestjs/swagger";
import { 
  IsString, 
  Matches, 
  MaxLength, 
  MinLength 
} from "class-validator";
import { PasswordMatch } from "../class-validator/password-match.decorator";

export class EditPasswordDTO {
  @ApiProperty({
    description: 'Current password of user',
    type: String,
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: 'New password of user',
    type: String,
  })
  @IsString()
  @MinLength(8, {
    message: 'NEW_PASSWORD_MIN_LENGTH: 8',
  })
  @MaxLength(16, {
    message: 'NEW_PASSWORD_MAX_LENGTH: 16',
  })
  @Matches(/\d/, { message: 'PASSWORD_MISSING: NUMBER' })
  @Matches(/[A-Z]/, {
    message: 'NEW_PASSWORD_MISSING: CAPITAL_LETTER',
  })
  @Matches(/[a-z]/, {
    message: 'NEW_PASSWORDS_MISSING: LOWER_CASE_LETTER',
  })
  @Matches(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, {
    message: 'NEW_PASSWORDS_MISSING: SPECIAL_CHARACTER',
  })
  newPassword: string;

  @ApiProperty({
    description: 'New password confirmation of user',
    type: String,
  })
  @IsString()
  @PasswordMatch('newPassword', {
    message: 'NEW_PASSWORD_CONFIRMATION_NOT_MATCHING',
  })
  newPasswordConfirmation: string;
}