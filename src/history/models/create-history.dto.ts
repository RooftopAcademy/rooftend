import { OmitType, PartialType } from '@nestjs/swagger';
import { HistoryDto } from './history.dto';

export class CreateHistoryDto extends PartialType(
  OmitType(HistoryDto, [] as const),
) {}
