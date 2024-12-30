// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { isSignedInState, checkVarState, isSignedUpState, placeholderUsernameState, userpfpState, showNavState, tokenState, myChatsState, noChatsOverlayState, webSocketState, createRoomDyn, } from "../atoms.js";
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import { Menu, X } from "lucide-react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { backend } from "../backendString.js";
// import { useWebSocket } from "../hooks/webSocket.js";

// const Navbar = () => {
//     const isSignedIn = useRecoilValue(isSignedInState);
//     const isSignedUp = useRecoilValue(isSignedUpState);
//     const navigate = useNavigate();
//     const setCheckVar = useSetRecoilState(checkVarState);
//     const token = useRecoilValue(tokenState)
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const username = useRecoilValue(placeholderUsernameState);
//     const userpfp = useRecoilValue(userpfpState);
//     const setShowNav = useSetRecoilState(showNavState);
//     const setMyChats = useSetRecoilState(myChatsState);
//     const setNoChatsOverlay = useSetRecoilState(noChatsOverlayState)
//     const socket = useRecoilValue(webSocketState)
//     const [createRoom, setCreateRoom] = useRecoilState(createRoomDyn)
//     const { sendNothing } = useWebSocket();

//     const handleScrollToSection = (sectionId: string, offset = 0) => {
//         const sectionElement = document.getElementById(sectionId);
//         if (sectionElement) {
//             const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;
//             window.scrollTo({
//                 top: sectionTop - offset, // Scroll to the top of the section minus the offset
//                 behavior: 'smooth',
//             });
//         }
//     };

    
//     function handleYourBlogsClick() {
//         if (!(isSignedIn || isSignedUp)) {
//             // navigate("/SignUp");
//             toast.error("Please signIn/signUp first", {
//                 position: "bottom-right",
//                 autoClose: 3000, 
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//             setCheckVar("direct2");
//         } else {
//             navigate("/ViewBlogs");
//         }
//         setIsMenuOpen(false);
//     }

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     const closeMenu = () => {
//         setIsMenuOpen(false);
//     };

    

    

//     return (
//         <div className="flex justify-center items-center">
//             <nav className="fixed top-0 w-[100%] shadow-lg z-50 h-[7%] transition duration-300">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-16">
//                         {/* Logo or Brand (optional) */}
//                         <div className="flex-shrink-0">
//                             <Link to="/" className="text-xl font-bold">
//                                 SuperCarBlog
//                             </Link>
//                         </div>

//                         {/* Desktop Navigation */}
//                         <div className="hidden md:block">
//                             <ul className="flex space-x-6 text-base font-semibold">
                                
//                                 {isSignedIn ? 
//                                 <li>
//                                     <button
//                                         onClick={handleChatClick}
//                                         className="btn btn-ghost"
//                                     >
//                                         Chat
//                                     </button>
//                                 </li> : <li>
//                                     <button className="btn btn-ghost">Sign In to Post</button>
//                                 </li>
//                                 }
                               
                                
                                
//                             </ul>
//                         </div>

//                         {/* Mobile Menu Button */}
//                         <div className="md:hidden flex items-center">
//                             <button 
//                                 onClick={toggleMenu}
//                                 className="btn btn-ghost"
//                             >
//                                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Mobile Menu */}
//                     {isMenuOpen && (
//                         <div className="md:hidden absolute left-0 right-0 top-16 bg-white/90 backdrop-blur-lg shadow-lg">
//                             <ul className="flex flex-col items-center space-y-2 py-4 text-base font-semibold">
                                
//                                 {isSignedIn ? 
//                                 <li>
//                                     <button
//                                         onClick={handleChatClick}
//                                         className="btn btn-ghost"
//                                     >
//                                         Create Blog
//                                     </button>
//                                 </li> : <li>Sign In to Post</li>
//                                 }
//                                 <li>
//                                     <button onClick={() => handleScrollToSection('themeSection')} className="btn btn-ghost">Themes</button>
//                                 </li>
                        
//                                 {(isSignedIn || isSignedUp) ? 
//                                     <li className="flex">
//                                         <button onClick={handleProfileUp} className="btn btn-ghost">Hi {username}</button>
//                                         <div className="avatar">
//                                             <div className="w-10 rounded-full">
//                                                 <img src={userpfp} />
//                                             </div>
//                                         </div>
//                                     </li>
//                                     : 
//                                     <li>
//                                         <button onClick={() => handleScrollToSection('mySection')} className="btn btn-ghost">Sign Up</button>
//                                     </li>
//                                 }
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             </nav>
//         </div>
//     );
// };


// export default Navbar;