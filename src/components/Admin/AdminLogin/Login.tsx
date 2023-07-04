import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { AdminApi } from "../../../Store/api";

function Login() {
  const navigate =useNavigate()
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const formSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
     await axios.post(`${AdminApi}AdminLogin`,{email,password}).then((response)=>{
      console.log(response.data);
      
      if(response.data?.access === true){
        navigate("/dashboard")
      }
      
     })
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        backgroundSize: "100reM 50rem",
        backgroundImage: "url('https://wallpapercave.com/wp/wp6984580.jpg')",
      }}
    >
      <div className="w-96 h-96 bg-white  bg-opacity-25 flex flex-col justify-center rounded-md  items-center">
        <div className=" flex flex-col items-center ">
          <p className="text-xl">Welcome Back</p>
          <p className="text-xl">Login and Make it Perfect</p>
        </div>
        <div className=" w-36 mt-5 h-px bg-gray-800"></div>
        <div className="flex flex-col items-center">
          <form className="flex flex-col items-center" onSubmit={formSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              className="placeholder-gray-500 pl-2 text-xs w-72 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="placeholder-gray-500 pl-2 text-xs w-72 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
              onChange={(e) => setpassword(e.target.value)}
            />
            <button className="mt-5 w-14 h-7 border-orange-500 border-x hover:text-white rounded-md bg-blue-500">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
