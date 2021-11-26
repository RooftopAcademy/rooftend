import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Cart } from "../entities/cart.entity";
import { CartService } from "./cart.service";

describe('CartService', () => {
    let service: CartService;
    const mockCartRepository = {
        
    }

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [CartService,{
                provide: getRepositoryToken(Cart),
                useValue: mockCartRepository
            }],
        }).compile();

        service = module.get<CartService>(CartService);
    });

    it('should be defined', () =>{
        expect(service).toBeDefined();
    });
});