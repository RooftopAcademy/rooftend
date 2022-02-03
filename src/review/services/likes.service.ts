import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsService } from '../../items/services/items.service';
import Status from '../../statusCodes/status.interface';
import STATUS from '../../statusCodes/statusCodes';
import { User } from '../../users/entities/user.entity';
import { Likes } from '../entities/likes.entity';
import { ItemReviewsService } from './itemReviews.service';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Likes)
        private readonly likesRepository: Repository<Likes>,
        private itemReviewsService: ItemReviewsService,
    ) { }

    async react(liked: boolean, user: User, itemReviewId: number) {

        try {
            // Busco si el usuario reacciono a esa review.
            const reacted = await this.likesRepository.findOne({
                where: {
                    user: { id: user.id },
                    itemReview: { id: itemReviewId },
                },
            });
            reacted ?
                // Si el paramatro liked es igual a valor actual de la comuna liked, tiene que updatear a null
                // de lo contrario, actualizarlo a lo que diga el parametro liked
                this.setLiked(reacted, liked == reacted.liked ? null : liked) :

                //si no reacciono previamente 
                // si reacciono previamente o si la reaccion es nueva
                this.firstReaction(liked, user, itemReviewId)

            return await this.countLikesAndDislikes(itemReviewId)
        }

        catch (err) {
            throw new UnprocessableEntityException();
        }
    }

    async firstReaction(liked: boolean, user: User, itemReviewId: number) {
        const review = await this.itemReviewsService.findOne(itemReviewId);
        const likeEntity = this.likesRepository.create({
            'user': user,
            'itemReview': review,
            'liked': liked,
        });
        await this.likesRepository.save(likeEntity);
    }

    async setLiked(reacted: Likes, liked?: boolean | null) {
        await this.likesRepository.update(reacted.id, {
            'liked': liked,
        });

    }


    async countLikesAndDislikes(itemReviewId: number) {

        return await this.likesRepository.query(
            `SELECT CASE  WHEN liked = true THEN 'likes' ELSE 'dislikes' END liked  , COUNT(*) FROM likes 
            WHERE item_review_id = ${itemReviewId} AND liked IS NOT NULL
            GROUP BY liked`)
    }
}


