import * as React from "react"
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Loader2, Send, X } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"
import { CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { GeminiMessage } from "../types/gemineMessage"
import { sendMessageToGemini } from "../server/gemini"
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { useSession } from "../lib/auth-client";

interface ChatComonentsProps {
    setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setMessages: React.Dispatch<React.SetStateAction<GeminiMessage[]>>;
    messages: GeminiMessage[];
    imageId: number | null;
}

export function ChatComponent({ setIsChatOpen, imageId, setMessages, messages }: ChatComonentsProps) {
    const { data: session } = useSession();
    const [isLoadingResponse, setIsLoadingResponse] = React.useState(false);
    const [input, setInput] = React.useState('');
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const toggleChat = () => {
        setIsChatOpen(false);
    };
    const sendMessage = async (message: string) => {
        setIsLoadingResponse(true);
        const response: GeminiMessage = await sendMessageToGemini({ message, userId: session?.user.id || "", imageId: imageId ? imageId : 0 })
        setMessages([...messages, { message, role: 'user' }, { message: response.message, role: 'gemini' }])
        setIsLoadingResponse(false);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])
    return (
        <div>
            <Card className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px] border-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-bold">Chat with Gemini</CardTitle>
                    <Button onClick={toggleChat} size="sm" className="px-2 py-0" variant="ghost">
                        <X className="size-4" />
                        <span className="sr-only">Close chat</span>
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[300px] pr-4" >
                        {messages?.length === 0 && (
                            <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
                                No message yet
                            </div>
                        )}
                        {messages?.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${message.role === "user"
                                    ? 'text-right'
                                    : 'text-left'
                                    }`}
                            >
                                <div className={`inline-block p-2 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                                    <ReactMarkdown
                                        children={message.message}
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code({ node, className, children, ...props }) {
                                                return (
                                                    <pre className="bg-gray-200 p-2 rounded">
                                                        <code>{children}</code>
                                                    </pre>
                                                );
                                            },
                                    ul: ({children}) => (
                                    <ul className="list-disc ml-4">
                                        {children}
                                    </ul>
                                    ),
                                    ol: ({children}) => (
                                    <li className="list-decimal ml-4">
                                        {children}
                                    </li>
                                    )
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        {isLoadingResponse && (
                            <div className="w-full items-center flex justify-center gap-3">
                                <Loader2 className="h-5 w-5 text-primary animate-spin" />
                            </div>
                        )}
                        <div ref={scrollRef}></div>
                    </ScrollArea>
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleSubmit} className="flex w-full space-x-2 items-center">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message here..."
                            className="flex-1"
                        />
                        <Button type="submit" disabled={!input.trim() || isLoadingResponse} className="px-4 py-2 size-9" size="icon">
                            {isLoadingResponse ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                            <span className="sr-only">Send message</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}
