import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../../Store/api";


interface Value{
    value:string 
}

function ChangePass(props:Value) {
    const navigate = useNavigate()
    const[confMail]=props.value
    const[password,setPassword]=useState("")

    const ChangePass=async()=>{
        try {
           await axios.post(`${UserApi}changePass`,{confMail,password}).then((response)=>{
            console.log(response); 
            navigate("/userLogin")
           })
           
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <form onSubmit={ChangePass}>
    <div className="w-96 h-96 rounded-md forgetCard">
      <div className=" w-full h-20  flex flex-col justify-center items-center">
        <h1 className="text-xl">Forgot your password?</h1>
        <p className="text-sm">Enter your email to get help logging in.</p>
      </div>
      <div className="w-full h-40 bg-gray-300 flex flex-col items-center justify-evenly">
        <input
          type="text"
          placeholder="Enter the email"
          className="pl-2 text-xs border border-gray-600 rounded-md w-64 h-8"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 w-36 h-8 rounded-md">
          Send Email
        </button>
      </div>
      <div className="w-full h-36 rounded-b-md  flex flex-col items-center">
        <p className="text-sm font-medium mt-3">Back to sign in</p>
        <p className="text-center text-xs p-2 text-gray-500 mt-3">
          Note: The password reset email may take a few minutes. If you are
          resubmitting this form, please note that any previous password reset
          emails you have requested will not work.
        </p>
      </div>
    </div>
  </form>
  );
}

export default ChangePass;
