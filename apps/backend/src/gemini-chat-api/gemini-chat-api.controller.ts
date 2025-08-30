import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiChatApiService } from './gemini-chat-api.service';
import type { GeminiRequest } from '@repo/types';

@Controller('gemini-chat-api')
export class OpenaiChatApiController {
    constructor(private readonly service: OpenaiChatApiService) { }

    @Post()
    getAiModelAnswer(@Body() data: GeminiRequest) {
        return this.service.getAiModelAnswer(data);
    }
}
