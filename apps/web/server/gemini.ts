import { GeminiRequest, GeminiResponse } from '@repo/types';
export const sendMessageToGemini = async (messageDTO: GeminiRequest): Promise<GeminiResponse> => {
    const res = await fetch(`${process.env.BACKEND_URL}/gemini-chat-api/`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(messageDTO)
    });

    if (!res.ok) {
        throw new Error("Failed to get gemini response");
    }

    const response: GeminiResponse = JSON.parse(res.body?.toString() || '{}');
    console.log('Gemini Response:', response);

    return response;
};