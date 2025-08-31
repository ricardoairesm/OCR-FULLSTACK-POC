import { Injectable } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import type { GeminiRequest, GeminiMessage } from 'src/types/gemineMessage';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';


const DEFAULT_SYSTEM_MESSAGE = `
You are an AI assistant for an OCR text extraction application. Here are the key features included in the application:
    - Text Extraction: The application can extract text from images using OCR (Optical Character Recognition) technology.
    - Image Upload: Users can upload images containing text, and the application will process these images to extract the text content.
    - User Authentication: The application includes user authentication features, allowing users to create accounts, log in, and manage their profiles.
    - Chat Interface: The application provides a chat interface where users can interact with the AI assistant to get help with text extraction, ask questions about the extracted text, and receive guidance on using the application.
    - History Tracking: The application keeps a history of user interactions and extracted texts, allowing users to review past activities.

    Answer user queries about the extracted text that he is going to ask to be summarized and about the OCR text extraction application only. Do not answer questions that are not related to the application or the extracted text. If you do not know the answer, respond with "I'm sorry, I don't have that information."

    Format your responses using Markdown. Use **bold**, *italics*, \`code\`, lists, and other markdown features as appropriate. Always ensure responses are clear and well-structured.

    Limit your responses to a total of 1000 characters.
`;

class GeminiChatHistory {
    readonly chatHistory: BaseMessage[];
    constructor(systemMessage?: string) {
        this.chatHistory = [];
        if (systemMessage) {
            this.addSystemMessage(systemMessage);
        }
    }

    private addSystemMessage(message: string) {
        this.chatHistory.push(new SystemMessage(message));
    }

    addAiMessage(message: string) {
        this.chatHistory.push(new AIMessage(message));
    }

    addHumanMessage(message: string) {
        this.chatHistory.push(new HumanMessage(message));
    }
}


@Injectable()
export class GeminiChatApiService {
    private readonly chatHistory: GeminiChatHistory;
    private readonly chat: ChatGoogleGenerativeAI
    private readonly databaseService: DatabaseService;
    constructor() {
        this.databaseService = new DatabaseService();
        this.chatHistory = new GeminiChatHistory(DEFAULT_SYSTEM_MESSAGE);
        this.chat = new ChatGoogleGenerativeAI({
            temperature: 0.7,
            model: process.env.GEMINI_API_DEFAULT_MODEL!
        });
    }

    async getAiModelAnswer(userMessage: GeminiRequest): Promise<GeminiMessage> {
        this.chatHistory.addHumanMessage(userMessage.message);
        const result = await this.chat.invoke(this.chatHistory.chatHistory);
        const aiMessage = result.text;
        this.chatHistory.addAiMessage(aiMessage);
        try {
            const newPrompt: Prisma.PromptsCreateInput = {
                question: userMessage.message,
                geminiAnswer: aiMessage,
                image: { connect: { id: userMessage.imageId } },
                published: true,
            };
            await this.databaseService.prompts.create({ data: newPrompt });
        } catch (error) {
            console.error('Error creating prompt record:', error);
            throw error;
        }
        const response: GeminiMessage = { message: aiMessage, role: 'gemini' };
        return response;
    }
}
