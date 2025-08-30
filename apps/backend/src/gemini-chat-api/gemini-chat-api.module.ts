import { Module } from '@nestjs/common';
import { OpenaiChatApiService } from './gemini-chat-api.service';
import { OpenaiChatApiController } from './gemini-chat-api.controller';

@Module({
  providers: [OpenaiChatApiService],
  controllers: [OpenaiChatApiController]
})
export class OpenaiChatApiModule {}
