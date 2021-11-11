import { Controller, Get, Param, Post, Body, Patch,Delete,
Query,ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){

    }

    @Get()
    getAll(){
        return this.userService.findAll();
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ) {
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate({
      page,
      limit,
      route: '/users',
    });
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
