import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar.tsx";
import Chat from "./pages/chat.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showNavState, webSocketState } from "./atoms.ts";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { wsString } from "./backendString.ts";


function App() {
    const showNav = useRecoilValue(showNavState)
    const setSocket = useSetRecoilState(webSocketState)
    useEffect(() => {
        const ws = new WebSocket(`${wsString}`);
        ws.onopen = () => {
            console.log("Web socket connected")
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log("Message from wss: ", data)
        }

        ws.onerror = (error) => {
            console.log("ws error: ", error)
        }

        ws.onclose = () => {
            console.log("wss disconnected")
        }

        setSocket(ws)

        return () => {
            ws.close
        }
    }, [setSocket])
    return (
        <div>
            <Router>
                {showNav && <Navbar/>}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Chat" element={<Chat/>}/>
                </Routes>
            </Router>
            <ToastContainer />
        </div>
    )
}

export default App
