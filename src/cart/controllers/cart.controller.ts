import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {

    constructor( private cartService : CartService ){}

    @Get()
    getAll(){
        return this.cartService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id : number){
        return this.cartService.findOne(id);
    }

    @Post()
    create (@Body() body : any){
        return this.cartService.create(body);
    }

    @Put(':id')
    update(@Param('id') id : number, @Body() body : any){
        return this.cartService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id : number ){
        return this.cartService.delete(id);
    }

}
