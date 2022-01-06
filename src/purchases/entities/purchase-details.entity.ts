import { ApiProperty } from '@nestjs/swagger';
import DeliveryStatus from '../../deliveries/entities/delivery-status.enum';
import { ItemDetails } from './item-details.entity';

export class PurchaseDetails {
  @ApiProperty({
    name: 'purchasedAt',
    type: 'string',
    format: 'date-time',
    example: '2021-12-13T03:00:00.000Z',
  })
  purchasedAt: Date;

  @ApiProperty({
    name: 'deliveryStatus',
    type: 'string',
    example: DeliveryStatus.PENDING,
  })
  deliveryStatus: DeliveryStatus;

  @ApiProperty({
    name: 'itemDetails',
    type: '[ItemDetails]',
    example:
      '[{"title":"shirt","quantity":5,"price":25.75,"photo":"www.photodelivery.com/fancyShirt"},{"title":"shoes","quantity":2,"price":75.76,"photo":"www.photodelivery.com/fancyShoes"}]',
  })
  itemDetails: Array<ItemDetails>;
}
