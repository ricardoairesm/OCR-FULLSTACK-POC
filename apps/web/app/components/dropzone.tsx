"use client";

import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './DropzoneButton.module.css';
import { Loader2 } from 'lucide-react';

import { uploadImage } from '../server/images';
import { useSession } from '../lib/auth-client';
import { ImageUploadResponse } from '../types/images';
import { Button, Group, Image, MantineProvider, Text } from '@mantine/core';
import Tesseract from 'tesseract.js';
import { sendMessageToGemini } from '../server/gemini';
import { GeminiMessage } from '../types/gemineMessage';

interface DropzoneButtonProps {
    setShowChatIcon: Dispatch<SetStateAction<boolean>>;
    setImageId: Dispatch<SetStateAction<number | null>>;
    setMessages: React.Dispatch<React.SetStateAction<GeminiMessage[]>>;
    messages: GeminiMessage[];
}

export function DropzoneButton({ setShowChatIcon, setImageId, setMessages, messages }: DropzoneButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [imageData, setImageData] = useState<null | string>(null);
    const [textExtracted, setTextExtracted] = useState('');
    const [file, setFile] = useState<null | File>(null);
    const { data: session } = useSession();
    const loadFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUrl = reader.result as string;
            setImageData(imageDataUrl);
            setFile(file);
        }
        reader.readAsDataURL(file);
    }

    const handleExtractText = async () => {
        setIsLoading(true);
        if (!imageData) {
            console.error('No image data available for text extraction.');
            return;
        }
        if (!file) {
            console.error('No file selected for upload.');
            return;
        }

        const tesseractResponse = await Tesseract.recognize(imageData, 'eng');
        const extractedText = tesseractResponse.data.text;
        const imageUploadResponse: ImageUploadResponse = await uploadImage({ fileName: file.name, userId: session?.user.id || '', content: tesseractResponse.data.text });
        setShowChatIcon(true);
        setTextExtracted(extractedText);
        setImageId(imageUploadResponse.imageId)
        setIsLoading(false);
        const message = "Can you summarize the following text for me: " + extractedText
        const initialMessage = await sendMessageToGemini({message, userId: session?.user.id || '', imageId: imageUploadResponse.imageId })
        setMessages([...messages, { message , role: 'user' }, { message: initialMessage.message, role: 'gemini' }])
    }

    return (
        <MantineProvider>
            <div className={classes.wrapper}>
                <Dropzone
                    onDrop={(files) => files[0] && loadFile(files[0])}
                    className={classes.dropzone}
                    radius="md"
                    accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg, MIME_TYPES.webp]}
                    maxSize={30 * 1024 ** 2}
                    multiple={false}
                >
                    {(status) => (
                        <div style={{ pointerEvents: 'none' }}>
                            <Text className={classes.description}>
                                Click or drag and drop files here to upload. We can accept <i>.png, .svg, .jpeg, .webp</i> files that
                                are less than 30mb in size.
                            </Text>
                        </div>
                    )}
                </Dropzone>

                <Button disabled={!imageData || isLoading} className={classes.control} size="md" radius="xl" onClick={handleExtractText}>
                    {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Extract Text"}
                </Button>

                <Group className='mt-4' position='center'>
                    {!!imageData && <Image src={imageData} style={{ maxWidth: '400px', alignContent: 'center' }} />}
                </Group>

                <Group className='mt-4' position='center'>
                    {textExtracted && (
                        <div>
                            <Text size='xl'>Extracted Text:</Text>
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{textExtracted}</pre>
                        </div>
                    )}
                </Group>
            </div>
        </MantineProvider>
    );
}