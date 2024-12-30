import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./pages/chat.tsx";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./storage/useThemeStore.ts";


function App() {
    const [theme, setTheme] = useTheme();
    return (
        <div data-theme={theme}>
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
