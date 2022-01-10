import { Reflector } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PoliciesGuard } from './policies.guard';

describe('TestGuard', () => {
  let guard: PoliciesGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciesGuard, Reflector, CaslAbilityFactory],
    })
      .overrideProvider(Reflector)
      .useValue({ get: jest.fn() })
      .overrideProvider(CaslAbilityFactory)
      .useValue({ createForUser: jest.fn() })
      .compile();

    guard = module.get<PoliciesGuard>(PoliciesGuard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
