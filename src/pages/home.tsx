import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { checkVarState, inUpState, isSignedInState, isSignedUpState, nameOfUserState, placeholderUsernameState, showNavState, signInFormDataState, signUpFormDataState, tokenState } from '../atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { placeholderEmailState, placeholderPasswordState, targetSectionState, userpfpState } from '../atoms';
import { toast } from 'react-toastify';
import axios from 'axios';
import Globe from '@/components/globe';
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { motion } from 'framer-motion';


function Home() {
  return (
    <div className=' w-[100vw] h-screen flex bg-black'>
      <div className='w-1/2 flex items-center'>
        <div className='w-full'>
        <SignupFormDemo/>
          
        </div>
      </div>
      <div className='w-1/2'>
        <div>
          {<Globe/>}
        </div>
      </div>
    </div>
  )
  
}

function SignupFormDemo() {
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
        const response = await axios.post(`${process.env.BACKEND_STRING}/user/signup`, signUpFormData);
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
        const response = await axios.post(`${process.env.BACKEND_STRING}/user/signin`, signInFormData);
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
        console.log("hi")
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
          navigate("/Chat");
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
    <div> 
      
      
      {
      inup ? <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black">
      <PebbleWrapper/>
      <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to ChatMon if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSignIn}>
        {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-white">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          
        </div> */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" name="email" onChange={handleSignInChange}  type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input id="password" onChange={handleSignInChange} name="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        
      </form>
    </div> : 
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black">
    <PebbleWrapper/>
    <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
      Login to ChatMon if you can because we don&apos;t have a login flow
      yet
    </p>

    <form className="my-8" onSubmit={handleSignUp}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="firstname" className="text-white">Your Name</Label>
          <Input id="firstname" placeholder="Enter your name" name="username" onChange={handleSignUpChange} required type="text" />
        </LabelInputContainer>
        
      </div>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email" className="text-white">Email Address</Label>
        <Input onChange={handleSignUpChange}  id="email" placeholder="Enter Your Email" name="email" type="email" />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input id="password" onChange={handleSignUpChange} name="password" placeholder="••••••••" type="password" />
      </LabelInputContainer>
      

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        Sign up &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        
      </form>
    </div>
    }

      
      
      <div className="text-center">
            <button 
              onClick={toggleInup} 
              className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm"
            >
              {inup ? "Back to Sign Up" : "Already have an account? Sign In"}
            </button>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};


const PebbleWrapper = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className="h-20 flex-col rounded-xl flex justify-center items-center">
        <motion.div
          animate={{
            y: [5, -5, 5], // Float up and down
            
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <AcUnitIcon style={{ fontSize: 60, color: "lightblue" }} />
        </motion.div>
      </div>
      <div className='text-3xl font-lexend'>Chatmon</div>
    </div>
  );
};


export default Home



