"use client";

import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { Group, Stack, Text, Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Tesseract from "tesseract.js";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  const [imageData, setImageData] = useState<null | string>(null);
    const loadFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend =  () => {
            const imageDataUrl = reader.result as string;
            setImageData(imageDataUrl);
        }
        reader.readAsDataURL(file);
    }

    const [uploadProgress, setUploadProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState("");  
    const [ocrResult, setOcrResult] = useState('');


    const handleExtractText = async () => {
        setUploadProgress(0);
        setProgressLabel('Initializing');

        const response = await Tesseract.recognize(imageData!, 'eng');
        setOcrResult(response.data.text);
        setProgressLabel('Completed');
        console.log(response.data)
    }

    return (
        <>
            <Group align="center" style = {{padding: '10px'}}>
                <Stack style = {{flex: '1'}}>
                    <Dropzone
                        onDrop={(files) => files[0] && loadFile(files[0])}
                        // onReject={(files) => console.log('rejected files', files)}
                        // maxSize={3 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        multiple={false}
                    >
                        {() => (
                            <Text size="xl" inline>
                                Drag images here or click to select files
                            </Text>
                        )}
                    </Dropzone>
                    {!!imageData && <Image src={imageData} style = {{maxWidth: '600px'}} alt="" width= {600} height={600} />}
                </Stack>
                <Stack>
                    <Button disabled={!imageData} onClick={handleExtractText}>Extract Text</Button>
                    <Text>{progressLabel.toUpperCase()}</Text>
                    {!!ocrResult &&
                        <Stack style = {{flex: '1'}}>
                            <Text size='xl'>Extracted Text:</Text>
                            <Text style = {{fontFamily: 'sans-serif', background: 'black', padding: '10px'}}>{ocrResult}</Text>
                        </Stack>
                    }
                </Stack>
            </Group>
        </>
    );
}
