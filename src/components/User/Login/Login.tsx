import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

function Login() {
    const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const submitHandler=()=>{
    console.log(email,password);
    
  }
  return (
    <div
      className=" flex flex-col items-center justify-center w-screen"
      style={{
        height: "50rem",
        backgroundSize: "100reM 50rem",
        backgroundImage:
          "url('https://i.pinimg.com/originals/05/b3/1a/05b31a061a39390c2dcb058aded8fa44.jpg')",
      }}
    >
      <div className="bg-white w-96 h-96 border-2 border-solid border-black rounded-lg m-3">
        <div className="bg-transparent flex flex-col items-center justify-center mt-5">
          <h4 className="bg-transparent">Welcome back. </h4>
          <h4 className="bg-transparent">Log in and start exploring.</h4>
        </div>
        <div className="flex flex-col w-full items-center justify-center mt-5">
          <input
            type="text"
            placeholder="Enter Email"
            className="placeholder-gray-500 pl-2 text-xs w-60 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
            
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="placeholder-gray-500 pl-2 text-xs w-60 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-700 w-60 h-8 rounded-full mt-5 border-2 border-gray-700" onClick={submitHandler}>
            Log in
          </button>
        </div>
        {/* bottom area */}
        <div className="w-full bg-transparent h-36 rounded-lg flex items-center flex-col">
          <div className="w-60 h-0.5 mt-1 bg-gray-400"></div>
          <button className="bg-blue-500 w-60 h-8 rounded-full mt-2" onClick={()=>navigate("/userSignup")}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
