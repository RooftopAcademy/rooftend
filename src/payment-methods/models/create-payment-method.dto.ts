import { ApiProperty } from '@nestjs/swagger';

/* eslint-disable prettier/prettier */
export default class PaymentMethodDto {
  @ApiProperty({
    example: 'CASH',
    description: 'The name of the payment method',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'Cash',
    description: 'The type of the payment method, usually similar to the name',
    type: String,
  })
  type: string;
}
