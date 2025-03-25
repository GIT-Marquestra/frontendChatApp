import axios from "axios";
import { useRecoilState } from "recoil";
import { inputValueState, searchRecState } from "../atoms";
import { backendString } from "@/variables";

const Search = () => {
    const [searchRec, setSearchRec] = useRecoilState(searchRecState); 
    const [inputValue, setInputValue] = useRecoilState(inputValueState); 

    const fetchResults = async (value: string) => {
        if (value.trim() === "") {
            setSearchRec([]);
            return;
        }

        try {
            const response = await axios.get(`${backendString}/user/search?username=${value}`);
            setSearchRec(response.data); 
        } catch (error) {
            console.error("Error fetching users:", error);
            setSearchRec([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        fetchResults(value);
    };

    
    const handleSuggestionClick = (user: any) => {
        setInputValue(user.username);
        setSearchRec([]);
    };


    return (
        <div className="relative">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for users here!"
                className="input w-full input-bordered"
            />

            {searchRec.length > 0 && (
                <div className="absolute mt-1 rounded shadow">
                    {searchRec.map((user: any, index: number) => (
                        <p
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-slate-800"
                            onClick={() => handleSuggestionClick(user)}
                        >
                            {user.username}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;

// import React, { useState } from "react";
// import axios from "axios";
// import { backend } from "../backendString";
// import { useRecoilState } from "recoil";
// import { searchRecState } from "../atoms";
// import { useState } from "react";


// const Search = () => {
//     const [searchRec, setSearchRec] = useRecoilState(searchRecState)
//     const [inputValue, setInputValue] = useState("");
//     const fetchUsers = async (to: string) => {
//         const t = to
//         if (t.trim() === "") {
//             setSearchRec([]); // Clear suggestions if the input is empty
//             return;
//         }
//         try {
//             console.log(t)
//             const response = await axios.get(`${backend}/user/search?username=${t}`)
//             setSearchRec(response.data.users)
//         } catch(error){
//             console.log("Error: ", error)
//             setSearchRec([])
//         } 
//     }
//     const changed = (e: any): void => {
//         const data = e.target.value
//         setInputValue(data)
//         fetchUsers(data)
//     }

//     const handleSuggestionClick = (user: any): void => {
//         setSearchRec([])
//         setInputValue(user)
//     }
//     console.log(searchRec)
//     return (
//         <div>
//             <input type="text" className="input input-bordered" placeholder="Search here" onChange={changed}/>
//             <div>
//                 {searchRec.map((user: any) => (
//                     <p onClick={()=>{handleSuggestionClick(user)}} key={user._id}>{user.username}</p>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Search

