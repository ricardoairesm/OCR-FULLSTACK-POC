import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiChatApiService } from './gemini-chat-api.service';

describe('OpenaiChatApiService', () => {
  let service: OpenaiChatApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiChatApiService],
    }).compile();

    service = module.get<OpenaiChatApiService>(OpenaiChatApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
