import { Body, Controller, Post, Req } from '@nestjs/common';
import { GeminiChatApiService } from './gemini-chat-api.service';
import type { GeminiRequest, GeminiMessage } from '../types/gemineMessage';


@Controller('gemini-chat-api')
export class GeminiChatApiController {
    constructor(private readonly service: GeminiChatApiService) { }

    @Post()
    getAiModelAnswer(@Body() data: GeminiRequest, @Req() req: Request): Promise<GeminiMessage> {
        return this.service.getAiModelAnswer(data);
    }
}
