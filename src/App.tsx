import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./pages/chat.tsx";
import { ToastContainer } from "react-toastify";


function App() {
    return (
        <div>
            <Router>
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
