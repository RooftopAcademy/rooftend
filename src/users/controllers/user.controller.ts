import { Controller, Get, Param, Post, Body, Patch,Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){

    }

    @Get('filter')
    getAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id:number ){
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() body:any){
        return this.userService.create(body)
    }

    @Patch(':id')
    actualizar(@Param() id:number, @Body() body:any){
        return this.userService.update(id,body);
    }

    @Delete(':id')
    eliminar(@Param('id') id:number){
        return this.userService.delete(id);
    }
}
