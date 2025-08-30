import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiChatApiController } from './gemini-chat-api.controller';

describe('OpenaiChatApiController', () => {
  let controller: OpenaiChatApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenaiChatApiController],
    }).compile();

    controller = module.get<OpenaiChatApiController>(OpenaiChatApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
