import { PartialType } from '@nestjs/swagger';
import { CreateCustomMessageDTO } from './create-custom-messages.dto'

export class UpdateCustomMessageDTO extends PartialType(CreateCustomMessageDTO) {} 