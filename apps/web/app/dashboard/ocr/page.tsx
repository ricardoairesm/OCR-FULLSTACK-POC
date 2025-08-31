"use client";

import { ArrowDownCircle, MessageCircle } from "lucide-react"

import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/app-sidebar"
import { Card, CardDescription, CardTitle } from "../../components/ui/card";
import { DropzoneButton } from "../../components/dropzone";
import { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { ChatComponent } from "../../components/chat-component";
import { sendMessageToGemini } from "@/app/server/gemini";
import { useSession } from "@/app/lib/auth-client";
import { GeminiMessage } from "@/app/types/gemineMessage";

export default function Dashboard() {
    const [chatVisible, setChatVisible] = useState<boolean>(false);
    const [imageId, setImageId] = useState<number | null>(null);
    const [showChatIcon, setShowChatIcon] = useState<boolean>(false);
    const chatIconRef = useRef<HTMLButtonElement>(null);
    const [messages, setMessages] = useState<GeminiMessage[]>([]);

    const toggleChat = async () => {
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
                                        Bem vindo ao projeto OCR + LLM POC!
                                    </CardTitle>
                                    <CardDescription className="flex pl-5">
                                        Para iniciar faça o upload do seu arquivo no componente abaixo e extraia o texto para começar a conversa com o Google Gemini!
                                    </CardDescription>
                                    <DropzoneButton setShowChatIcon={setShowChatIcon} setImageId={setImageId} setMessages={setMessages} messages={messages}/>
                                    {showChatIcon && (
                                        <div className=" fixed bottom-4 right-4 z-50">
                                            <Button ref={chatIconRef} onClick={toggleChat} size="icon" className="rounded-full size-14 p-2 shadow-lg">
                                                {!chatVisible ? (
                                                    <MessageCircle className="size-sm" />
                                                ) : (
                                                    <ArrowDownCircle className="size-sm" />
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                    {chatVisible && (
                                        <ChatComponent setIsChatOpen={setChatVisible} imageId={imageId}  setMessages={setMessages} messages={messages}/>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
