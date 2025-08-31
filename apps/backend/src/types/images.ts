import { Prompt } from "./prompt";

export interface ImageUploadDTO {
    fileName: string;
    userId: string;
    content: string;
}

export interface ImageUploadResponse {
    extractedText: string;
    imageId: number;
}

export interface ImageData {
    id: number;
    content: string;
    name: string;
    src: string;
    createdAt: Date;
    updatedAt: Date;
    prompts: Prompt[]
}

export interface ImageDataDownload{
    content: string;
    name: string;
    prompts: Prompt[];
}