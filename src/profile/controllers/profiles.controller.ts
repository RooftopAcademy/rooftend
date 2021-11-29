import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Delete,
  Req,
  Param,
  Res,
} from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from '../services/profile/profile.service';

@Controller('profiles')
export class ProfilesController {
  public constructor(private readonly service: ProfileService) {}
  @Get()
  public index(@Req() req: Request) {
    return this.service.all();
  }

  @Get(':id')
  public find(@Param('id') id, @Res() res) {
    this.service
      .find(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return res.status(404).end(err.message);
      });
  }

  @Patch(':id')
  public edit(@Body() body, @Res() res) {
    return res.send(`${body} updated`);
  }

  @Delete(':id')
  public delete(@Param('id') id, @Res() res) {
    res.send('ok');
  }

  @Post()
  public create(@Body() body, @Res() res) {
    res.send(body);
  }
}
