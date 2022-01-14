import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Cart } from "../entities/cart.entity";
import { CartService } from "./cart.service";

describe('CartService', () => {
    let service: CartService;
    const newUser = new User();
    newUser.id = 1;

    const mockCartRepository = {
        create: jest.fn().mockImplementation(() => ({
            id: 1,
            createdAt: Date.now(), 
            updatedAt: Date.now(),
            purchasedAt: null,
            amount: 555, 
            currencyCode: 'abc', 
            user: newUser, 
        })),

        findOne: jest.fn().mockImplementation(() => Promise.resolve({ 
            id: 10 , 
            createdAt: Date.now(), 
            updatedAt: Date.now(), 
            amount: 555, 
            currencyCode: 'abc', 
            user: newUser,
            purchasedAt: null, 
        })),

        save: jest.fn((cart: Cart) => cart),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CartService, {
                provide: getRepositoryToken(Cart),
                useValue: mockCartRepository
            }],
        }).compile();

        service = module.get<CartService>(CartService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new cart and return it', async () => {
        const cart = { currencyCode: 'ab1', amount: 555, userId: 1 };
        expect(await service.create(newUser)).toEqual({
            id: 1,
            currencyCode: 'abc',
            amount: 555,
            user: newUser,
            createdAt: expect.any(Number),
            updatedAt: expect.any(Number),
            purchasedAt: null,
        })
        expect(mockCartRepository.create).toHaveBeenCalled();
        expect(mockCartRepository.save).toHaveBeenCalled();
    });

    it('should find a cart with the given cart id and return it', async () => {
        expect(await service.findOne(10)).toEqual({
            id: 10,
            currencyCode: expect.any(String),
            user: newUser,
            amount: expect.any(Number),
            createdAt: expect.any(Number),
            updatedAt: expect.any(Number),
            purchasedAt: null,
        })
        expect(mockCartRepository.findOne).toHaveBeenCalled();
    });

    it('should find a valid cart that matches the given user id and return it ', async () => {
        newUser.id = 42
        expect(await service.findCart(42)).toEqual({
            id: 10,
            currencyCode: expect.any(String),
            user: newUser,
            amount: expect.any(Number),
            createdAt: expect.any(Number),
            updatedAt: expect.any(Number),
            purchasedAt: null,
        })
        expect(mockCartRepository.findOne).toHaveBeenCalled();
    });

    
});