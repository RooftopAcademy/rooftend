import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from '../services/cart.service';

describe('CartController', () => {
    let controller: CartController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CartController],
            providers: [CartService],
        }).compile();
        controller = module.get<CartController>(CartController);

    });
    
});