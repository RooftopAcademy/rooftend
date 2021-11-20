import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { QuestionsService } from 'src/questions/services/questions.service';
import { Questions } from '../models/questions.interface';
import { DeleteResult } from 'typeorm';
import { Response } from 'express';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { QuestionsEntity } from '../models/questions.entity';

@Controller('questions')
export class QuestionsController {

    constructor(private QuestionsService: QuestionsService) { }

    @Get(':item_id')
    async findAll(
        @Param('item_id') item_id: number,
        @Res() res: Response,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<QuestionsEntity, IPaginationMeta> | void> {
        limit = limit > 100 ? 100 : limit;
        const paginatedQuestions = await this.QuestionsService.paginate({
            page,
            limit,
            route: 'item/item_id'
        }, item_id);
        if (paginatedQuestions)
            return res.status(200).send(paginatedQuestions).end()
        return res.status(404).end('Error! Questions Not Found')
    }

    @Post()
    @HttpCode(201)
    create(@Body() Question: Questions): Promise<Questions> {
        return this.QuestionsService.createQuestion(Question)
    }



    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.QuestionsService.deleteQuestion(id)
    }

}

