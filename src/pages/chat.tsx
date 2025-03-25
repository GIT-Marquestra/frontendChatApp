import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { callGetFuncState, chatsLoadingState, createRoomDyn, finalRoomNameState, groupArr, imageState, imgPrevState, imgURLstate, inputValueState, isSignedInState, isSignedUpState, isUploadingState, myChatsState, noChatsOverlayState, placeholderEmailState, placeholderPasswordState, placeholderUsernameState, roomForMessagesState, roomIDstate, roomNameState, showNewChatNoteState, showRoomNameChangeModalState, tokenState, typeVisState, updateProfileState, upformState, userpfpState } from "../atoms"
import Search from "../components/searchBar"
import { GetMessages } from "../components/getMessages"
import { useWebSocket } from "../hooks/webSocket"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { backend } from "../backendString"
import { Image } from "lucide-react"
import { FlipWords } from "@/components/ui/flip-words"
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { motion } from 'framer-motion';
import { Avatar } from "@mui/material"

const Chat = () => {
    const setShowNewChat = useSetRecoilState(showNewChatNoteState)
    const token = useRecoilValue(tokenState)
    const roomIDforMessage = useRecoilValue(roomForMessagesState)
    const [image, setImage] = useRecoilState(imageState)
    const [imgUrl, setImgUrl] = useRecoilState(imgURLstate)
    const setIsUploading = useSetRecoilState(isUploadingState)
    const imgUrlRef = useRef()
    const [imgPrev, setImgPrev] = useRecoilState(imgPrevState)
    const username = useRecoilValue(placeholderUsernameState);
    const isSignedIn = useRecoilValue(isSignedInState);
    const isSignedUp = useRecoilValue(isSignedUpState);
    const userpfp = useRecoilValue(userpfpState);
    const setMyChats = useSetRecoilState(myChatsState);
    const setNoChatsOverlay = useSetRecoilState(noChatsOverlayState)
    const [createRoom, setCreateRoom] = useRecoilState(createRoomDyn)
    const typeVis = useRecoilValue(typeVisState)
    const fileRef = useRef<HTMLInputElement | null>()
    const setChatsLoading = useSetRecoilState(chatsLoadingState)
    const [scale, setScale] = useState(1);
    const { sendMessage } = useWebSocket()
    const roomName = useRecoilValue(roomNameState)
    const finalName = useRecoilValue(finalRoomNameState)
    const setUpdateProfile = useSetRecoilState(updateProfileState)
    const inputRef = useRef();
    const setShowRoomNameChangeModal = useSetRecoilState(showRoomNameChangeModalState)

    

    const handleNewChatClick = () => {
        setScale(1.2);
        
        // Reset scale after 150ms
        setTimeout(() => {
            setScale(1);
        }, 150);
        setShowNewChat(true)
        setTimeout(() => {
            setShowNewChat(false)
        }, 500)
    }

    

    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent default action, like form submission
            handleMessageSend(); // Call the function to send the message
        }

    }
    
    const handleMessageSend = async () => {
        let messToSend = ''
        if(inputRef.current){
            // @ts-ignore
            messToSend = inputRef.current.value

        }
        const imageData = new FormData()
        console.log(image)
        if(image){
            setIsUploading(true)
            imageData.append("file", image)
            imageData.append("upload_preset", "my_unsigned_preset");
            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dutrfbtao/image/upload", imageData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                console.log("in image if block")
                imgUrlRef.current = response.data.secure_url
                if(imgUrlRef.current){
                    setImgUrl(imgUrlRef.current)
                    setIsUploading(false)
                }
            } catch (error) {
                console.log("Error while uploading the image: ", error)
            }
        }
        console.log("messtosend: ", messToSend, imgUrl)
        if(messToSend || imgUrlRef.current){
            // @ts-ignore
            sendMessage(messToSend, roomIDforMessage, imgUrlRef.current)
            
        }
        if(fileRef.current){
            // @ts-ignore
            fileRef.current.value = ''
        }
        console.log("mess sent")
        // @ts-ignore
        document.getElementById("inputBox").value = ''
        //@ts-ignore
        imgUrlRef.current = ''
        setImgPrev(null)
        setImage(null)
        
    }
    async function handleChatClick() {
          
        const getMyChatsFunc = async () => {
            try {
                const response = await axios.get(`${backend}/user/myChats`, {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json",
                    }
                })
                if(response.status === 200){
                    setMyChats(response.data.chats)
                    setNoChatsOverlay(false)
                    setChatsLoading(false)
                } else if(response.status === 560){ // got no chats, hence let the user search for users
                    setNoChatsOverlay(true)
                }
            } catch (error) {
                console.error("Error: ", error)
                setNoChatsOverlay(false)
            }
        }
        getMyChatsFunc()
        if(createRoom){
            getMyChatsFunc()
            setCreateRoom(false)
        }
    
    }

    useEffect(() => {
        handleChatClick()
    }, [isSignedIn, finalName, createRoom])

    const deleteImage = async (publicId: string) => {
        
        try {
            const response = await axios.post(`${backend}/user/deleteImg`, publicId)
            console.log("Deletion result: ", response)
        } catch (error) {
            console.log("Error while deletion: ", error)
        }
        
    };

    const handleRemove = () => {
        deleteImage(imgUrl)
        setImgPrev(null)
    }
    

    
    const handleImageUpload = async (e: any) => {
        const file = e.target.files[0];
        if(!file){
            return
        }
        setImage(file)
         
        const reader = new FileReader();
        reader.onload = () => {
            // @ts-ignore
            setImgPrev(reader.result as string)
        }
        reader.readAsDataURL(file)

        
        console.log("in handleIMgUpload")
        

        
    }
    const handleProfileUp = () => {
        setUpdateProfile(true)
    }

    const handleRoomNameClick = () => {
        setShowRoomNameChangeModal(true)
    }


    return (
        <div className="h-screen drawer lg:drawer-open bg-black">
            
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <label htmlFor="my-drawer" className="btn absolute z-40 top-20 ml-0 lg:hidden btn-circle swap swap-rotate">
      <input type="checkbox" />
      <svg
        className="swap-off fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>
    </label>
  <div className="drawer-content flex-col relative items-center mb-3 flex justify-end">
    <div id="miniNav" className="h-[7%] w-full border-b-slate-700 border-b-2">
    <ul className="flex justify-between h-full items-center">
    <li>
        <button onClick={handleRoomNameClick} className="btn btn-ghost">{roomName}</button>
    </li>
    <li className="mx-6">
    {(isSignedIn || isSignedUp) && 
        <div className="flex">
            <button onClick={handleProfileUp} className="btn btn-ghost">Hi {username}</button>
            
            <Avatar src={userpfp ? userpfp : '/default-image.jpg'}/>
            
        </div>
    }
    </li>
    
    </ul>
    
    </div>

    <div
      id="chatArea"
      className="flex p-5 flex-col w-[100%] relative h-[92vh] max-h-screen"
    >
      {typeVis ? 
      <div>
        <div className="overflow-y-auto flex-grow p-2">
            <GetMessages />
        </div>
        <div className="w-full flex justify-center relative px-4">

            <input
            id="inputBox"
            onKeyDown={handleKeyPress}
            // @ts-ignore
            ref={inputRef}
            type="text"
            placeholder="Type here"
            className="input w-full md:w-[65%] bg-black input-bordered"
            />
            <button onClick={handleMessageSend} className="btn btn-ghost ml-2">
            Send
            </button>
            {imgPrev ? <div className="right-64 absolute bottom-16 p-4 h-32 w-28">
                <img src={imgPrev} className="h-3/4" alt="previewImg" />
                <button onClick={handleRemove} className="btn">Remove</button>
            </div> : <div></div>}
            {/* @ts-ignore */}
            <input ref={fileRef} onChange={handleImageUpload} type="file" className="hidden ml-2"/>
            <button type="button" onClick={()=>{fileRef.current?.click()}} className="button btn btn-circle"><Image size={20}/></button>
        </div> 

      </div>
      
      : <div className="flex-col justify-center flex items-center w-full h-2/3">
        
        <PebbleWrapper />
        
        
        </div>}
    </div>
  </div>

  {/* Drawer Sidebar */}
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu text-base-content bg-black border-r-slate-600 border-r-2 min-h-full w-80 p-4 overflow-y-auto">
    <li className="h-[5em] mt-10 flex justify-center font-lexend items-center text-2xl font-bold text-white">
    <AcUnitIcon style={{ fontSize: 70, color: "lightblue" }} />ChatMon
    </li>
        
        <span className="flex mt-5 justify-end"><span className="flex font-lexend text-xl m-1 justify-center items-center">Add</span><AddCircleOutlineIcon
            style={{
                fontSize: 40,
                color: "lightblue",
                transform: `scale(${scale})`,
                transition: 'transform 150ms ease',
                cursor: 'pointer',
            }}
            onClick={handleNewChatClick}
        /></span>
      
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <GetChats />
      </div>
    </ul>
  </div>
  <ProfileUpModal/>
  <RoomChangeModal/>
  <NewChat />
</div>
)

}

const PebbleWrapper = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="w-96 h-80 flex-col rounded-xl flex justify-center items-center">
          <motion.div
            animate={{
              y: [0, -20, 0], // Float up and down
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <AcUnitIcon style={{ fontSize: 100, color: "lightblue" }} />
          </motion.div>
        <div className="hidden md:block">
          <Welcome />
        </div>
        </div>
      </div>
    );
  };
  
const GetChats = () => {
    const myChats = useRecoilValue(myChatsState)
    const setRoomForMessages = useSetRecoilState(roomForMessagesState)
    const setCallGetFunc = useSetRecoilState(callGetFuncState)
    const setTypeVis = useSetRecoilState(typeVisState)
    const chatsLoading = useRecoilValue(chatsLoadingState)
    const setRoomName = useSetRecoilState(roomNameState)
    const handleChatOpening = (q: string, r: string) => {
        setTypeVis(true)
        setRoomName(q)
        setRoomForMessages(r) // setting the room here 
        setCallGetFunc(true)
    }
    const loadingArray = Array.from({ length: 7 });
    
    return (
        <div>
            {chatsLoading ? (
                <ul className="overflow-y-auto">
                    {loadingArray.map((_, index) => (
                        <li key={index} className="skeleton h-8 my-7 rounded-md">
                            <a className="skeleton-text"></a> 
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    {myChats.map((p) => (
                        <li onClick={() => handleChatOpening(p[0], p[1])} key={p[1]} className="my-2 text-md">
                            <a>{p[0]}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
const NewChat = () => {
    const showNewChat = useRecoilValue(showNewChatNoteState)
    const roomID = useRecoilValue(roomIDstate)
    const [inputValue, setInputValue] = useRecoilState(inputValueState)
    const setCreateRoom = useSetRecoilState(createRoomDyn)
    const { createRoom } = useWebSocket()
    const [groupArray, setGroupArr] = useRecoilState(groupArr)
    const showNote = () => {
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
        modal?.showModal();
    }

    if(showNewChat){
        showNote()
    }

    const handleCreateRoom = () => {
        setInputValue("")
        setCreateRoom(true)
        if(groupArray){
            // @ts-ignore
            createRoom(roomID, groupArray) // this will not cause an error!
        }else{
            window.alert("Please add member")
        }
        setGroupArr([])
    }

    const handleAddMember = () => {
        // @ts-ignore
        setGroupArr((p)=>[...p, inputValue])
        setInputValue('')
    }

    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box relative">
                    <h3 className="font-bold text-lg mb-6"><Search/></h3>
                    {
                        groupArray.map((m: string)=>(
                            <span key={Math.random()}>{m}, </span>
                        ))
                    }
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={handleCreateRoom} className="btn m-2">Create Room</button>
                            <button onClick={()=>{setGroupArr([])}} className="btn m-2">Close</button>
                        </form>
                    </div>
                    <button className="btn m-2 absolute bottom-5" onClick={handleAddMember}>Add Member</button>
                </div>
            </dialog>
        </div>
    );
};
const RoomChangeModal = () => {
    const [showRoomNameChangeModal, setshowRoomNameChangeModal] = useRecoilState(showRoomNameChangeModalState)
    const [roomName, setRoomName] = useRecoilState(roomNameState)
    const roomForMessages = useRecoilValue(roomForMessagesState)
    const setFinalName = useSetRecoilState(finalRoomNameState)
    const username = useRecoilValue(placeholderUsernameState)
    const token = useRecoilValue(tokenState)
    const showNote = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
        modal?.showModal();
    }

    if(showRoomNameChangeModal){
        showNote()
    }



    const handleInputChange = (e: any) => {
        setRoomName(e.target.value)
    }

    const handleChangeName = async (p: string, q: string, r: string) => {
        console.log("in handleChangeName")
        console.log(username)
        
        try {
            const response = await axios.put(`${backend}/user/changeRoomName`, {
                roomID: p,
                roomName: q,
                username: r,
                
            }, {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                }
            },) // isme to ye change krega, dhundhega kaise
            if(response.status === 200){
                setshowRoomNameChangeModal(false)
                setRoomName(roomName)
                setFinalName(q)
                window.alert(`Room name changed to: ${q}`)
                
            }
        } catch (error) {
            console.error("Error: ", error)
        
        } finally {
            setshowRoomNameChangeModal(false)
        }
    }
    const handleClose = () => {
        setshowRoomNameChangeModal(false)
    }

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box relative">
                    <h2>Change Room Name To</h2>
                    <input onChange={handleInputChange} type="text" className="input input-bordered" placeholder="roomName" />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={()=>{handleChangeName(roomForMessages, roomName, username)}} className="btn m-2">Change Name</button>
                            <button onClick={handleClose} className="btn m-2">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
const ProfileUpModal = () => {
    const username = useRecoilValue(placeholderUsernameState)
    const updateProfile = useRecoilValue(updateProfileState)
    const email = useRecoilValue(placeholderEmailState)
    const password = useRecoilValue(placeholderPasswordState)
    const token = useRecoilValue(tokenState)
    const [upForm, setUpform] = useRecoilState(upformState)
    const pfpFileRef = useRef()
    const urlRef = useRef('')
    const [image, setImage] = useRecoilState(imageState)
    const userpfp = useRecoilValue(userpfpState)
    const setUpdateProfile = useSetRecoilState(updateProfileState)
    const showNote = () => {
        const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
        modal?.showModal();
    }

    if(updateProfile){
        showNote()
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setUpform({
            ...upForm,
            [name]: value
        })
        
    }

    const handlePfpUpload = async (e: any) => {
        console.log("in handleUpdate")
        const file = e.target.files[0];
        if(!file){
            return
        }
        setImage(file)
        
    
    }

    const handleUpdate = async () => {
        console.log("in handleUpdate")
        const imageData = new FormData()
        
        if (image) {
            imageData.append("file", image);
            imageData.append("upload_preset", "my_unsigned_preset");
            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dutrfbtao/image/upload", imageData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                
                urlRef.current = response.data.secure_url;
                console.log("in handleUpdate: ", urlRef.current)
                
            } catch (error) {
                console.error("Error while uploading the image: ", error);
            }
        }
        
        try {
            console.log("in handleUpdate")
            const payload = {
                ...upForm,
                userpfp: urlRef.current
            }
            const response = await axios.put(`${backend}/user/updatePfp`, payload, {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                }
            },) // isme to ye change krega, dhundhega kaise
            if(response.status === 200){
                window.alert("Updated")
                
            }
        } catch (error) {
            console.error("Error: ", error)
        
        } finally {
            setUpdateProfile(false)
            setImage(null)
            setUpform({
                username: "",
                email: "",
                password: "",
                userpfp: ""
            })
            setImage(null)
            urlRef.current = ''
        }
    }

        
    const handleClose = () => {
        setUpdateProfile(false)
        setImage(null)
        urlRef.current = ''
    }

    return (
        <div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box flex flex-col items-center relative">
                    {/* @ts-ignore */}
                    <input ref={pfpFileRef} onChange={handlePfpUpload} type="file" className="hidden ml-2"/>
                    {/* @ts-ignore */}
                    <button type="button" onClick={()=>{pfpFileRef.current?.click()}} className="button btn btn-circle"><Avatar src={userpfp ? userpfp : `/broken-image.jpg`}/></button>
                    <input onChange={handleInputChange} type="text" className="input m-2 w-2/3 input-bordered" placeholder={username} name="username"/>
                    <input onChange={handleInputChange} type="email" className="input m-2 w-2/3 input-bordered" placeholder={email} name="email"/>
                    <input onChange={handleInputChange} type="password" className="input m-2 w-2/3 input-bordered" placeholder={password} name="password"/>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={handleUpdate} className="btn m-2">Update</button>
                            <button onClick={handleClose} className="btn m-2">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

const Welcome = () => {
    const words = ["Hi there!", "Welcome", "Choose chat to talk"]
    return (
        <div>
            <h1><FlipWords 
                words={words}
                duration={2000}
                className="text-3xl font-bold text-white"
            /></h1>
        </div>
    )
}

export default Chat