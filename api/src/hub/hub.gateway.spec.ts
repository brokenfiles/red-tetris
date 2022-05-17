import { Test, TestingModule } from '@nestjs/testing';
import { HubGateway } from './hub.gateway';

describe('HubGateway', () => {
  let gateway: HubGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HubGateway],
    }).compile();

    gateway = module.get<HubGateway>(HubGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
