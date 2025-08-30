"use server";

import { ImageUploadDTO } from '@repo/types';
export const getUserImages = async (userId: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/image/${userId}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch images");
    }
    return res.json();
};

export const uploadImage = async (uploadDto: ImageUploadDTO) => {
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

    return res.body?.pipeThrough(new TextDecoderStream()).getReader().read().then(({ value }) => {
        return value;
    }) || '';
};