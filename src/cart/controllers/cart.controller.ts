import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';
import { CartService } from '../services/cart.service';

@ApiTags('Carts')
@Controller('carts')
export class CartController {

    constructor( private cartService : CartService ){}

    @Get()
    @ApiOperation({summary: 'Gets all carts'})
    @ApiResponse({status: 201, description: 'Listing all Carts'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    getAll(): Promise<Cart[]>{
        return this.cartService.findAll();
    }


}


