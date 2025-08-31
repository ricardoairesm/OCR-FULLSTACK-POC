"use server";

import { ImageData, ImageUploadDTO, ImageUploadResponse } from '../types/images';
export const getUserImages = async (userId: string): Promise<ImageData[]> => {
    const res = await fetch(`${process.env.BACKEND_URL}/image/${userId}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch images");
    }
    return res.json();
};

export const uploadImage = async (uploadDto: ImageUploadDTO): Promise<ImageUploadResponse> => {
    const res = await fetch(`${process.env.BACKEND_URL}/image/`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(uploadDto)
    });

    if (!res.ok) {
        throw new Error("Failed to upload image");
    }

    const response: ImageUploadResponse = await res.json();
    return response;
};