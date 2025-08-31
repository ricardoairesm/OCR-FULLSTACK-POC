export interface GeminiMessage{
    message: string;
    role?: string;
}

export interface GeminiRequest{
    message: string;
    userId: string;
    imageId: number;
}

export interface GeminiResponse{
    aiMessage: string;
}