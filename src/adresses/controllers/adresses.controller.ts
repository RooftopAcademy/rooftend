import { Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AdressesService } from '../services/adresses.service';

@Controller('adresses')
export class AdressesController {

    constructor(private readonly addressesService: AdressesService){}

    @Get()
    @HttpCode(200)
    public findAll(){
        this.addressesService.findAll()
    }

    @Get(':id')
    @HttpCode(200)
    public find(@Param('id') id){
        return `${id}`
    }

    @Patch()
    @HttpCode(200)
    public edit(@Param('id') id:string){
        return this.addressesService.edit(id)
    }

    @Delete('id')
    @HttpCode(203)
    public delete(@Param('id') id:string){
        return this.addressesService.delete(id)
    }
    
    @Post()
    @HttpCode(201)
    public created() {
        return this.addressesService.create()
    }


}
