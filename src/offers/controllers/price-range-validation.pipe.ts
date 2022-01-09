import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  isDefined,
} from 'class-validator';
import { PriceRangeDTO } from '../dto/price-range.dto';

@Injectable()
export class PriceRangeValidationPipe implements PipeTransform<string, Promise<PriceRangeDTO>> {

  async transform(range: string): Promise<PriceRangeDTO> {
    if (!isDefined(range)) {
      return null;
    }

    if (!/^\d+-\d+$/.test(range)) {
      throw new BadRequestException('Invalid value for price parameter.');
    };

    const [min, max] = range.split('-')
      .map((limit) => parseInt(limit));

    return { min, max }
  }
}