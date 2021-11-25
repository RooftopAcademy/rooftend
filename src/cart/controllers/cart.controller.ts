import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';
import { CartService } from '../services/cart.service';

@ApiHeader({
    name: 'RooftopApi',
    description: 'Rooftop Api Documentation',
  })
@ApiTags('carts')
@Controller('carts')
export class CartController {

    constructor( private cartService : CartService ){}

    @Get()
    @ApiOperation({summary: 'Gets all carts'})
    getAll(){
        return this.cartService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Gets one cart by Id'})
    getOne(@Param('id') id : number){
        return this.cartService.findOne(id);
    }

    @Post()
    @ApiOperation({summary: 'Creates cart'})
    @ApiResponse({status: 201, description: 'Cart succesfully created'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create (@Body() body : any): Promise<Cart>{
        return this.cartService.create(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Updates cart'})
    update(@Param('id') id : number, @Body() body : any){
        return this.cartService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deletes cart'})
    delete(@Param('id') id : number ){
        return this.cartService.delete(id);
    }

}
