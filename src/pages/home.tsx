import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { checkVarState, inUpState, isSignedInState, isSignedUpState, nameOfUserState, placeholderUsernameState, showNavState, signInFormDataState, signUpFormDataState, tokenState } from '../atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { placeholderEmailState, placeholderPasswordState, targetSectionState, userpfpState } from '../atoms';
import { backend } from '../backendString';
import { toast } from 'react-toastify';
import axios from 'axios';

function Home() {
  const isSignedIn = useRecoilValue(isSignedInState)
  return (
    <div>
      <div className='mt-44 relative'>
        {!(isSignedIn) && <LogComponent />}
      </div>

      <div className='bottom-80 flex justify-center'>
      </div>
    </div>
  )
  
}

function LogComponent() {
  const setIsSignedUp = useSetRecoilState(isSignedUpState);
  const [signUpFormData, setSignUpFormData] = useRecoilState(signUpFormDataState);
  const [signInFormData, setSignInFormData] = useRecoilState(signInFormDataState);
  const setIsSignedIn = useSetRecoilState(isSignedInState);
  const [checkVar, setCheckVar] = useRecoilState(checkVarState);
  const setNameOfUser = useSetRecoilState(nameOfUserState);
  const navigate = useNavigate();
  const [inup, setInup] = useRecoilState(inUpState);
  const setUsername = useSetRecoilState(placeholderUsernameState);
  const setEmail = useSetRecoilState(placeholderEmailState);
  const setPassword = useSetRecoilState(placeholderPasswordState);
  const setUserpfp = useSetRecoilState(userpfpState);
  const targetSection = useRecoilValue(targetSectionState);
  const setShowNav = useSetRecoilState(showNavState);
  const setToken = useSetRecoilState(tokenState)

  
  useEffect(() => {
    if (targetSection === 'mySection') {
      const section = document.getElementById(targetSection);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [targetSection]);

  const toggleInup = () => {
    setInup(e => !e);
  };

  const handleSignInChange = (e: any) => {
    const { name, value } = e.target;
    setSignInFormData({
      ...signInFormData,
      [name]: value,
    });
  };

  const handleSignUpChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (signUpFormData) {
      try {
        const response = await axios.post(`${backend}/user/signup`, signUpFormData);
        if (response.status === 201) {
          toast.success("User Signed Up", {
            position: "bottom-right",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        //   setUserpfp(response.userpfp);
        } else {
          toast.error("Can't sign up", {
            position: "bottom-right",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setIsSignedUp(true);
        setNameOfUser(response.data.nameOfUser);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    } else {
      console.log(signUpFormData);
    }
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    
    if (signInFormData) {
      try {
        const response = await axios.post(`${backend}/user/signin`, signInFormData);
        console.log("Response", response);
        
        if (response.data.message === "Incorrect Credentials!") {
          toast.error("Incorrect Credentials, please try again.");
          return;
        }

        // Fetching all the data
        setNameOfUser(response.data.nameOfUser);
        setUsername(response.data.username);
        setPassword(response.data.password);
        setEmail(response.data.email);
        setUserpfp(response.data.userpfp);
        setIsSignedIn(true);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token)
        
        // Navigation logic
        if (checkVar === "direct") {
          navigate("/Chat");
          setShowNav(false)
          setCheckVar("");
        } else if (checkVar === "direct2") {
          navigate("/ViewBlogs");
        } else {
          navigate("/");
        }
        console.log("Toasting...")
        setTimeout(() => {
          toast.success("User Signed In", {
            position: "bottom-right",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 100);
      } catch (error) {
        toast.error("Incorrect credentials!", {
          position: "bottom-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(`Error: ${error}`);
      }
    } else {
      console.log(signInFormData);
    }
  };

  return (
    <div id="mySection" className="w-full max-w-md mx-auto px-4 sm:px-0">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-6 sm:px-8 pt-6 pb-8 mb-4 w-full">
        <div className="mb-6">
          {inup ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
                Sign In
              </h2>
              <div>
                <input 
                  className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSignInChange} 
                  type="email" 
                  placeholder="Enter Your Email" 
                  name="email"
                  required
                /> 
              </div>
              <div>
                <input 
                  className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSignInChange} 
                  type="password" 
                  placeholder="Enter Your Password" 
                  name="password"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
                Sign Up
              </h2>
              <div>
                <input 
                  className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSignUpChange} 
                  type="text" 
                  placeholder="Enter Your Name" 
                  name="username"
                  required
                />
              </div>
              <div>
                <input 
                  className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSignUpChange} 
                  type="email" 
                  placeholder="Enter Your Email" 
                  name="email"
                  required
                /> 
              </div>
              <div>
                <input 
                  className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSignUpChange} 
                  type="password" 
                  placeholder="Enter Your Password" 
                  name="password"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 text-sm sm:text-base"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
        <div className="text-center">
          <button 
            onClick={toggleInup} 
            className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm"
          >
            {inup ? "Back to Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home
