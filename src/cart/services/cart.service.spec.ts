import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../../dist/users/entities/user.entity";
import { Cart } from "../entities/cart.entity";
import { CartService } from "./cart.service";

describe('CartService', () => {
    let service: CartService;
    const mockCartRepository = {
        create: jest.fn().mockImplementation(cart => cart),
        save: jest.fn().mockImplementation(cart => Promise.resolve({
            id: Date.now(),
            created_at: Date.now(),
            updated_at: Date.now(),
            ...cart
        })),
        findOne: jest.fn().mockImplementation((id) => Promise.resolve({
            id,
            created_at: Date.now(),
            updated_at: Date.now(),
            amount: 555,
            currencyCode: 'abc',
            userId: 1
        })),
        merge: jest.fn().mockImplementation((newCart, oldCart) => Promise.resolve({
            id: Date.now(),
            created_at: Date.now(),
            updated_at: Date.now(),
            ...oldCart
        })),
        update: jest.fn().mockImplementation((id, cart) => Promise.resolve({
            id,
            created_at: Date.now(),
            updated_at: Date.now(),
            ...cart
        })),
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

    // it('should create a new cart and return it', async () => {
    //     const cart = { currencyCode: 'ab1', amount: 555, user: { id: 1 } } as Cart;
    //     expect(await service.create(cart)).toEqual({
    //         id: expect.any(Number),
    //         currencyCode: cart.currencyCode,
    //         amount: cart.amount,
    //         userId: cart.userId,
    //         created_at: expect.any(Number),
    //         updated_at: expect.any(Number),
    //     })
    // });
    it('should find a cart with the given id and return it', async () => {
        expect(await service.findOne(10)).toEqual({
            id: 10,
            currencyCode: expect.any(String),
            userId: expect.any(Number),
            amount: expect.any(Number),
            created_at: expect.any(Number),
            updated_at: expect.any(Number),

        })
    });
    it('should update a cart and return it', async () => {
        const cart = { currencyCode: 'abc', amount: 555, userId: 1 };
        expect(await service.update(10, cart)).toEqual({
            id: 10,
            created_at: expect.any(Number),
            updated_at: expect.any(Number),
            amount: cart.amount,
            currencyCode: cart.currencyCode,
            userId: cart.userId,
        })
    });

});