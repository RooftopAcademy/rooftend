import { ApiProperty } from '@nestjs/swagger';
import DeliveryStatus from '../../deliveries/entities/delivery-status.enum';

export class PurchaseDetails {
  @ApiProperty({
    name: 'purchasedAt',
    type: 'string',
    format: 'date-time',
    example: '2021-12-13T03:00:00.000Z',
  })
  purchasedAt: Date;

  @ApiProperty({
    name: 'title',
    type: 'string',
    example: 'Fancy TV 40 inches',
  })
  title: string;

  @ApiProperty({
    name: 'price',
    type: 'number',
    format: 'float',
    example: 2536.25,
  })
  price: number;

  @ApiProperty({
    name: 'quantity',
    type: 'number',
    format: 'integer',
    example: 1369,
  })
  quantity: number;

  @ApiProperty({
    name: 'photo',
    type: 'string',
    example: 'www.photodelivery.com/40inchesTV',
  })
  photo: string;

  @ApiProperty({
    name: 'deliveryStatus',
    type: 'string',
    example: DeliveryStatus.PENDING,
  })
  deliveryStatus: DeliveryStatus;
}
