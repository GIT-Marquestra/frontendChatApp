import { useRecoilState, useRecoilValue } from "recoil"
import { callGetFuncState, noMessage, placeholderUsernameState, reRender2State, roomForMessagesState, roomMessState, sendReRenderState, tempChatState, tokenState } from "../atoms"
import axios from "axios"
import { backend } from "../backendString"

export const GetMessages = () => {
    const roomForMessages = useRecoilValue(roomForMessagesState)
    const token = useRecoilValue(tokenState)
    const [callGetFunc, setCallGetFunc] = useRecoilState(callGetFuncState)
    const [roomMess, setRoomMess] = useRecoilState(roomMessState)
    const username = useRecoilValue(placeholderUsernameState)
    const [reRender, setReRender] = useRecoilState(sendReRenderState)
    const temp = useRecoilValue(tempChatState)
    const no = useRecoilValue(noMessage)
    const [reRender2, setReRender2] = useRecoilState(reRender2State)
    const getting = async () => {
        console.log("in getting function")
        try { // @ts-ignore
            const response = await axios.post(`${backend}/user/myMessages`, {
                roomID: roomForMessages
            }, {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                }
            })

            if(response){
                console.log("Getting function response: ", response.data)
                setRoomMess(response.data.messages)
            } else {
                console.log("Response not found!")
            }

        } catch (error) {
            console.log("Error: ", error)
        } finally {
            setCallGetFunc(false)
            setReRender(false)
            setReRender2(false)
        }
    }
    if(callGetFunc || reRender || reRender2){
        getting()
    } else {
        console.log("Call get function not triggered", callGetFunc)
    }
    // onClick send, the message should be send rendered dynamically, plus should be saved in the db
    //
    const user = temp.username; // try using individual atoms for each
    const { roomID, message } = temp;
    
    return(
        <div>
            
            {
                roomMess.map((m: any) => (
                    <div key={m._id} className={`chat ${m.sender === username ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    <div className="chat-bubble">{m.message}</div>
                    </div>
                ))
            }

            <div>
                {no ? <div key={roomID} className={`chat ${user === username ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                        <div className="chat-bubble">{message}</div>
                </div> : <div></div>}
            </div> 

        </div>
    )

}

