"use client";

import { Card, CardDescription, CardTitle } from "../../components/ui/card";
import { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { ImageTable } from "@/app/components/image-table";
import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";
import { AppSidebar } from '../../components/app-sidebar';


export default function Dashboard() {
    const [chatVisible, setChatVisible] = useState<boolean>(false);
    const [imageId, setImageId] = useState<number | null>(null);
    const [showChatIcon, setShowChatIcon] = useState<boolean>(false);
    const chatIconRef = useRef<HTMLButtonElement>(null);
    

    const toggleChat = () => {
        setChatVisible(!chatVisible)
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardTitle className="flex pl-5">
                                        Aqui você encontra as imagens que fez upload anteriormente, assim como os prompts feitos para o Gemini envolvedo esta imagem.
                                    </CardTitle>
                                    <ImageTable />
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
