import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiForbiddenResponse, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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

    @Get(':id')
    @ApiParam({
        name: "id",
        type: "integer",
        required: true
    })
    @ApiOperation({summary: 'Gets one cart by Id'})
    @ApiResponse({status: 201, description: 'Cart succesfully found'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 404, description: 'No Cart was found that matches that id'})
    getOne(@Param('id') id : number): Promise<Cart>{
        return this.cartService.findOne(id);
    }

    @ApiBody({
        type: Cart
    })
    @Post()
    @ApiOperation({summary: 'Creates cart'})
    @ApiResponse({status: 201, description: 'Cart succesfully created'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    create (@Body() body : any): Promise<Cart>{
        return this.cartService.create(body);
    }

    @Put(':id')
    @ApiParam({
        name: "id",
        type: "integer",
        required: true
    })
    @ApiOperation({summary: 'Updates cart'})
    @ApiResponse({status: 201, description: 'Cart succesfully updated'})
    update(@Param('id') id : number, @Body() body : any): Promise<Cart>{
        return this.cartService.update(id, body);
    }

    @Delete(':id')
    @ApiParam({
        name: "id",
        type: "integer",
        required: true
    })
    @ApiOperation({summary: 'Deletes cart'})
    @ApiResponse({status: 204, description: 'Cart succesfully deleted'})
    @ApiForbiddenResponse({ status: 403, description: 'Forbidden.'})
    delete(@Param('id') id : number ): Promise<Boolean>{
        return this.cartService.delete(id);
    }

}

