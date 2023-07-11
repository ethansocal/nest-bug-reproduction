import { Test, TestingModule } from '@nestjs/testing';
import { FencingtimeService } from './fencingtime.service';

describe('FencingtimeService', () => {
  let service: FencingtimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FencingtimeService],
    }).compile();

    service = module.get<FencingtimeService>(FencingtimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
