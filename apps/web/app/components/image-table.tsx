import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ImageData, ImageDataDownload } from "../types/images";
import { useSession } from "../lib/auth-client";
import { getUserImages } from "../server/images";

export function ImageTable() {
    const { data: session } = useSession();
    const [imageData, setImageData] = useState<ImageData[]>([]);
    const getUserImageData = async () => {
        const imageUploadResponse = await getUserImages(session?.user.id || "");
        setImageData(imageUploadResponse);

    }

    useEffect(() => {
        getUserImageData();
    }, [])

    const downloadImageData = async (index: number) => {
        const fileContent: ImageDataDownload = {
            content: imageData[index]?.content || "",
            name: imageData[index]?.name || "",
            prompts: imageData[index]?.prompts || []
        } ;
        const mimeType = "text/plain";
        const blob = new Blob([JSON.stringify(fileContent)], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", "my_downloadable_file.txt");
        a.click();
    }

    return (
        <Table>
            <TableCaption>
                <p className="p-5">A list of your uploaded files.</p>
                <Button onClick={getUserImageData} className="p-5">
                    Refresh
                </Button>
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px] pl-10">Image Name</TableHead>
                    <TableHead className="w-[200px] pl-10">Preview</TableHead>
                    <TableHead className="w-[200px] pl-10">Executed Prompts?</TableHead>
                    <TableHead className="w-[200px] pl-10">Download</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {imageData.map((data, index) => (
                    <TableRow key={data.id}>
                        <TableCell className="pl-10">{data.name}</TableCell>
                        <TableCell className="pl-10"><Image src={data.src} alt="" width={250} height={250} /></TableCell>
                        <TableCell className="pl-10">{data.prompts.length > 0 ? "Yes" : "No"}</TableCell>
                        <TableCell className="pl-10">
                            <Button className="p-5" onClick={() => downloadImageData(index)}>
                                Download History
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
