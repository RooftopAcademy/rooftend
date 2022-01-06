import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressesService } from '../services/addresses.service';

@Controller('adresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @HttpCode(200)
  public findAll() {
    this.addressesService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  public find(@Param('id') id) {
    return this.addressesService.find(id);
  }

  @Patch()
  @HttpCode(200)
  public edit(@Param('id') id: string) {
    return this.addressesService.edit(id);
  }

  @Delete('id')
  @HttpCode(203)
  public delete(@Param('id') id: string) {
    return this.addressesService.delete(id);
  }

  @Post()
  @HttpCode(201)
  public created(@Body() body) {
    return this.addressesService.create(body);
  }
}
