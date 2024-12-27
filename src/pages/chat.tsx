import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { callGetFuncState, createRoomDyn, inputValueState, messToSendState, myChatsState, noChatsOverlayState, noMessage, placeholderUsernameState, reRender2State, roomForMessagesState, roomIDstate, sendReRenderState, showNavState, showNewChatNoteState, tempChatState, webSocketState } from "../atoms"
import { useNavigate } from "react-router-dom"
import Search from "../components/searchBar"
import { GetMessages } from "../components/getMessages"

const Chat = () => {
    const setShowNav = useSetRecoilState(showNavState)
    const navigate = useNavigate()
    const setRoomID = useSetRecoilState(roomIDstate)
    const setShowNewChat = useSetRecoilState(showNewChatNoteState)
    const [messToSend, setMessToSend] = useRecoilState(messToSendState)
    const username = useRecoilValue(placeholderUsernameState)
    const roomIDforMessage = useRecoilValue(roomForMessagesState)
    const setReRender = useSetRecoilState(sendReRenderState)
    const setTemp = useSetRecoilState(tempChatState)
    const setNo = useSetRecoilState(noMessage)
    const setReRender2 = useSetRecoilState(reRender2State)
    const showNavbar = () => {
        setShowNav(true)
        navigate("/")
    }

    const socket = useRecoilValue(webSocketState)
    try {
        if(socket){
            socket.onmessage = (wssMessage: any) => {
                const m = JSON.parse(wssMessage.data)
                // console.log(m)
                const { type } = m
                // @ts-ignore
                const { username, roomID, usernames, text, message } = m.payload
                
                if(type === "requestMessage"){
                    window.alert(text)
                }

                if(type === "roomAck"){
                    setRoomID(roomID)
                }

                if(type === "chat"){
                    setTemp(m.payload)
                    setNo(true)
                    setReRender2(true)
                }
            }
        }
    } catch (error) {
        console.log("Error: ", error)
    }

    const handleNewChatClick = () => {
        setShowNewChat(true)
        setTimeout(() => {
            setShowNewChat(false)
        }, 500)
    }

    const handleInputChange = (e: any) => {
        e.preventDefault()
        setMessToSend(e.target.value)
    }

    const handleMessageSend = () => {
        socket?.send(JSON.stringify({
            type: "chat",
            payload: {
                message: messToSend,
                username: username,
                roomID: roomIDforMessage
            }
        }))
        setReRender(true)
        // console.log("control reached")
        // @ts-ignore
        document.getElementById("inputBox").value = null
        
    }

    


    return (
        <div className="p-4">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            
        <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />

        {/* hamburger icon */}
        <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        </label>
        <div id="chatArea" className="ml-60">
            <GetMessages/>
        </div>
        
        <div className="w-[100%] absolute bottom-2 flex justify-center"><input id="inputBox" onChange={handleInputChange} type="text" placeholder="Type here" className="input w-[65%] input-bordered"/><button onClick={handleMessageSend} className="btn btn-ghost">Send</button></div>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li><a className="h-[5em] flex justify-center items-center text-2xl">Talks</a></li>
            {/* the list items should come from the database */}
            <li>
                <div className="z-40">
                    <button onClick={handleNewChatClick} className="btn btn-ghost">New Chat</button>
                    <button className="btn btn-ghost">Group Chat</button>
                </div>
            </li>
            <GetChats/>
            </ul>
        </div>
            <button className="btn bottom-2 left-2 absolute btn-ghost" onClick={showNavbar}>Home</button>
            {/* <Note/> */}
            <NewChat/>
        </div> 
)

}

const GetChats = () => {
    const myChats = useRecoilValue(myChatsState)
    const setRoomForMessages = useSetRecoilState(roomForMessagesState)
    const setCallGetFunc = useSetRecoilState(callGetFuncState)
    console.log("myChats: ", myChats)
    const handleChatOpening = (r: string) => {
        console.log("in function handleChatOpening", r)
        setRoomForMessages(r)
        setCallGetFunc(true)
    }
    return (
        <div>
            {
                myChats.map((p) => (
                    <li onClick={()=>{handleChatOpening(p[1])}} key={p[1]}><a>{p[0]}</a></li>
                ))
            }
        </div>
    )
}
// @ts-ignore
const Note = () => {
   const noChatsOverlay = useRecoilValue(noChatsOverlayState)
    const showNote = () => {
        console.log("showing Note...")
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        modal?.showModal();
    }
    if(!noChatsOverlay){
        showNote()
    }

    return (
        <div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Looks like you don't have any chats yet!</h3>
                    <p className="py-4">Find someone to chat with!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn m-2">Find</button>
                            <button className="btn m-2">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
const NewChat = () => {
    const showNewChat = useRecoilValue(showNewChatNoteState)
    const roomID = useRecoilValue(roomIDstate)
    const socket = useRecoilValue(webSocketState)
    const username = useRecoilValue(placeholderUsernameState)
    const [inputValue, setInputValue] = useRecoilState(inputValueState)
    const setCreateRoom = useSetRecoilState(createRoomDyn)
    const showNote = () => {
        console.log("showing Note...")
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
        modal?.showModal();
    }

    if(showNewChat){
        showNote()
    }

    const handleCreateRoom = () => {
        setInputValue("")
        setCreateRoom(true)
        try {
            console.log(roomID)
            socket?.send(JSON.stringify({
                type: "startChat",
                payload: {
                    username: username,
                    usernames: [inputValue],
                    roomID: roomID
                }
            }))
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-6"><Search/></h3>
                    <p className="py-4">Find someone to chat with!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={handleCreateRoom} className="btn m-2">Create Room</button>
                            <button className="btn m-2">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
export default Chat