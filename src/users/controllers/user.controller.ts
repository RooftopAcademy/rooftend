import { Controller, Get, Param, Post, Body, Patch,Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){

    }

    @Get()
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
    update(@Param() id:number, @Body() body:any){
        return this.userService.update(id,body);
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.userService.delete(id);
    }
}
