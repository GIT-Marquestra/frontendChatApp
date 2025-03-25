import { useRecoilState, useRecoilValue } from "recoil";
import {
    messageLoading,
    messagesState,
    placeholderUsernameState,
    roomForMessagesState,
    tokenState,
    userpfpState,
} from "../atoms";
import axios from "axios";
import { backend } from "../backendString";
import { useEffect, useRef } from "react";
import { Avatar } from "@mui/material";

export const GetMessages = () => {
    const roomForMessages = useRecoilValue(roomForMessagesState);
    const token = useRecoilValue(tokenState);
    const userpfp = useRecoilValue(userpfpState)
    const username = useRecoilValue(placeholderUsernameState);
    const [messages, setMessages] = useRecoilState(messagesState);
    const [messLoading, setMessLoading] = useRecoilState(messageLoading);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const getting = async () => {
        try {
            const response = await axios.post(
                `${backend}/user/myMessages`,
                {
                    roomID: roomForMessages,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response) {
                setMessages(response.data.messages);
                setMessLoading(false);
            } else {
                console.log("Response not found!");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        getting();
    }, [roomForMessages]);

    useEffect(() => {
        if (!messLoading) {  
            scrollToBottom();
        }
    }, [messages]);  

    const loadingArray = [" ", " ", " ", " ", " ", " ", " "];

    return (
        <div className="overflow-y-auto h-[80vh]">
            {messLoading ? (
                loadingArray.map((_, index) => (
                    <div
                        key={index}
                        className={`chat ${
                            index % 2 === 0 ? "chat-end mr-5" : "chat-start ml-5"
                        } relative`}
                    >
                        
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <Avatar src="/broken-image.jpg"/>
                            </div>
                        </div>
                      
                        <div className="chat-bubble flex-col">
                            <div className="skeleton h-14 w-64" />
                        </div>
                    </div>
                ))
            ) : (
                <>
                    {messages.map((m: any) => (
                        <div
                            key={m._id}
                            className={`chat ${
                                m.sender === username ? "chat-end mr-5" : "chat-start ml-5"
                            } relative`}
                        >
                          
                            {!(m.sender === username) && (
                                <div className="ml-2 chat-header text-xs">{m.sender}</div>
                            )}
                            <div className="chat-image avatar">
                                {m.sender === username ? 
                                <div className="w-10 rounded-full">
                                <Avatar src={userpfp ? userpfp : '/default-image.jpg'}/>
                                </div> : <div className="w-10 rounded-full">
                                <Avatar src={'/default-image.jpg'}/>
                                </div>
                                }
                            </div>
                            <div className="chat-bubble bg-slate-700 flex-col">
                                {m.imgUrl && (
                                    <a href={m.imgUrl}>
                                        <div className="p-4">
                                            <img
                                                src={m.imgUrl}
                                                alt="imgHere"
                                                className="object-cover h-14"
                                            />
                                        </div>
                                    </a>
                                )}
                                {m.message && <div>{m.message}</div>}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </>
            )}
        </div>
    );
};