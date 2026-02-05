import "./index.css"
import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate,Navigate } from "react-router-dom"
const LoginPage=()=>{
    const navigate=useNavigate()
    const [userName,setUserName]=useState("")
    const [password,setPasword]=useState("")
    const [errorMsg, setErrorMsg] = useState("");
    const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 }); 
    navigate("/", { replace: true });
  };
  const onSubmitFailure = (errorMsg) => {

    setErrorMsg(errorMsg);
  };
    const handleSubmit= async(e)=>{
        e.preventDefault()
         setErrorMsg("");
        const userDetails = {username: userName, password:password };
        try{
            const response=await fetch("https://apis.ccbp.in/login",{
                method:"POST",
                body:JSON.stringify(userDetails)
            })
            const data=await response.json()
            if (response.ok){
                onSubmitSuccess(data.jwt_token)
                
            }
            else{
                onSubmitFailure(data.error_msg)
            }
        } catch  {
      setErrorMsg("Username or Password is Invalid");
    }
 
    }
       const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }
    return(
        <div className="login">
<div className=" bg-[#00000080] h-full">
                <div className="image">
         <h1 className="absolute top-6 left-10 text-4xl font-extrabold text-red-600 tracking-wide z-10">
        MOVIES
      </h1>
       </div>
       <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 px-10 py-8 rounded-md shadow-lg w-full max-w-sm h-[60%]">
          <h2 className="text-white text-2xl font-semibold text-center mb-16">
            Login
          </h2>

          <form className="space-y-6">
           
            <div>
              <label className="block text-sm text-gray-400 mb-3">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600 mt-0"
              />
              
            </div>
            <div>
              <label className="block text-sm text-gray-400  mb-3">
                PASSWORD
              </label>
              <input
                type="password"
                onChange={(e)=>setPasword(e.target.value)}
                value={password}
                placeholder="Enter password"
                className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600 "
              />
            </div>
             {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition cursor-pointer"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
           <p className="text-white">UserName:rahul</p>
              <p className="text-white">Password:rahul@2021</p> 
        </div>
       
      </div>
            </div>
        </div>
            
           
       

       
    )
}
export default LoginPage