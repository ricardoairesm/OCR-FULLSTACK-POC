import { Module } from '@nestjs/common';
import { GeminiChatApiService } from './gemini-chat-api.service';
import { GeminiChatApiController } from './gemini-chat-api.controller';

@Module({
  providers: [GeminiChatApiService],
  controllers: [GeminiChatApiController]
})
export class GeminiChatApiModule {}
