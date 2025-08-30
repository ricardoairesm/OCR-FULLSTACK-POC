import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromptModule } from './prompt/prompt.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/prompt.module';
import { ImageModule } from './image/image.module';
import { OpenaiChatApiModule } from './gemini-chat-api/gemini-chat-api.module';

@Module({
  imports: [UserModule, PromptModule, DatabaseModule, ImageModule, OpenaiChatApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
