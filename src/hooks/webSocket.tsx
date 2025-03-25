import { useRecoilState, useRecoilValue } from "recoil"
import { activeRoomState, messagesState, placeholderUsernameState } from "../atoms"
import { useEffect, useRef } from "react"
import { wsString } from "@/variables"

export const useWebSocket = () => {
    const [messages, setMessages] = useRecoilState(messagesState)
    const [activeRoom, setActiveRoom] = useRecoilState(activeRoomState)
    const username = useRecoilValue(placeholderUsernameState)
    const socketRef = useRef<WebSocket | null>(null)
    useEffect(() => {
        const socket = new WebSocket(`${wsString}`)
        socketRef.current = socket

        socket.onopen = () => {
            console.log("wss is connected")
            socket.send(JSON.stringify({
                type: "Nothing",
                payload: {
                    username: username
                }
            }))
        }
        socket.onmessage = (me) => {
            const m = JSON.parse(me.data)
            const { type, payload, messageObject } = m;
            const { roomID, text } = payload
            console.log("Type: ", type)
            if(type === "requestMessage"){
                window.alert(text)
            }

            if(type === "roomAck"){
                console.log("in roomAck")
                console.log("RoomID: ", roomID)
                setActiveRoom(roomID)
            }
            if(type === "chat"){
                //@ts-expect-error: do not know what to do 
                setMessages((prev)=>[...prev, messageObject]) // messages will be an array of messageObject
                
            }
        }

        return () => {
            socket.close();
            console.log("WebSocket disconnected!")
        }
    }, [activeRoom, setActiveRoom, setMessages])
    
    const createRoom = (roomID: string, targetUser: string[]) => {
        if(socketRef.current?.readyState === WebSocket.OPEN){
            socketRef.current.send(JSON.stringify({
                type: "startChat",
                payload: {
                    username: username,
                    roomID: roomID,
                    usernames: targetUser
                }
            }))
        }
    }

    const sendMessage = (message: string, roomID: string, imgUrl: string) => {
        if(socketRef.current?.readyState === WebSocket.OPEN){
            socketRef.current.send(JSON.stringify({
                type: "chat",
                payload: {
                    message: message, 
                    imgUrl: imgUrl,
                    roomID: roomID,
                    username: username
                }
            }))
        }
    }

    const sendNothing = () => {
        if(socketRef.current?.readyState === WebSocket.OPEN){
            socketRef.current.send(JSON.stringify({
                type: "Nothing",
                payload: {
                    username: username
                }
            }))
        }
    }
    
    return { sendNothing, sendMessage, createRoom, messages, activeRoom }

}