import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ImageModule } from './image/image.module';
import { GeminiChatApiModule } from './gemini-chat-api/gemini-chat-api.module';

@Module({
  imports: [DatabaseModule, ImageModule, GeminiChatApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
