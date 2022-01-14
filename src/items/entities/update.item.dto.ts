import { PartialType } from '@nestjs/swagger';
import { CreateItemDTO } from './create.item.dto';

export class UpdateItemDTO extends PartialType(CreateItemDTO) {} 