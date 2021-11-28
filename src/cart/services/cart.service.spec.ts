import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Cart } from "../entities/cart.entity";
import { CartService } from "./cart.service";

describe('CartService', () => {
    let service: CartService;
    const mockCartRepository = {
        create: jest.fn().mockImplementation(cart => cart),
        save: jest.fn().mockImplementation(cart => Promise.resolve({id: Date.now(), created_at: Date.now(), updated_at: Date.now(), ...cart}))
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

    it('should create a new cart and return it', async () =>{
        const cart = {currencyCode: 'ab1', amount: 555, userId : 1};
        expect(await service.create(cart)).toEqual({
            id: expect.any(Number),
            currencyCode: cart.currencyCode,
            amount: cart.amount,
            userId: cart.userId,
            created_at: expect.any(Number),
            updated_at: expect.any(Number),
        })
    })
});