import React, { useState,useRef } from "react";
import "./ForgetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";


function ForgetPassword() {
  const navigate =useNavigate()
  const ref = useRef(null)
  // *sending otp to mail
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  // * checking otp
  const [change, setChange] = useState(false);
  const [otp, setOpt] = useState("");

  // *Changing password
  const [password,setPassword]=useState('')
  const [confPassword,setConfPassword]=useState('')
  const [checkEmail, setCheckEmail] = useState("");

  const SubmitForget = async () => {
    try {
      console.log("submitting");const validDomains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
      ];
      if(email.length===0){
        showErrorToast("Please enter the email")
        return
      }
      if(email[0]===" "){
        showErrorToast('Please remove the space before entered text')
        return
      }
  
      const domain = email.split("@")[1];
      if (!validDomains.includes(domain)) {
        showErrorToast("enter valid email")
        return;
    }

      await axios.post(`${import.meta.env.VITE_USER_API}postForget`, { email }).then((response) => {
        console.log(response);
        if (response.data.message === "Success") {
          setCheckEmail(response.data.email);
          setOpen(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const confirmOTP = async () => {
    try {
      if(otp.length<=3||otp.length>=7){
        showErrorToast('Enter the otp correctly')
        return
      }
      const enteredOtp = Number(otp);
      await axios.post(`${import.meta.env.VITE_USER_API}postOtp`, { enteredOtp }).then((response) => {
        console.log(response);
        if (response.data.message === "Otp matching") {
          setChange(true);
          setOpt("")
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const changePass =async()=>{
    try {
      if(password.length<6){
        showErrorToast("Please enter at least 6 characters for password")
        return
      }
      if(password === confPassword){
        await axios.post(`${import.meta.env.VITE_USER_API}changePass`,{checkEmail,password}).then((response)=>{
          console.log(response);
          if(response.data.message === "Password Changed"){
            navigate("/userLogin")
          }
          
        })
      }else{
        showErrorToast("Password is not matching to confirm password")
        return
    }
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="w-96 h-96 rounded-md forgetCard">
        <div className=" w-full h-20  flex flex-col justify-center items-center">
          <h1 className="text-xl">Forgot your password?</h1>
          <p className="text-sm">Enter your email to get help logging in.</p>
        </div>
        <div className="w-full h-40 bg-gray-300 flex flex-col items-center justify-evenly">
          {!open ? (
            <>
              <input
                type="text"
                placeholder="Enter the email"
                className="pl-2 text-xs border border-gray-600 rounded-md w-64 h-8"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={SubmitForget}
                className="bg-blue-500 w-36 h-8 rounded-md text-sm"
              >
                Send Email
              </button>
            </>
          ) : (
            <>
              {!change ? (
                <>
                  <input
                    type="number"
                    placeholder="Enter the Otp here"
                    className="pl-2 text-xs border border-gray-600 rounded-md w-64 h-8 spin-button-none"
                    onChange={(e) => setOpt(e.target.value)}
                  />
                  <button
                    onClick={confirmOTP}
                    type="submit"
                    className="bg-blue-500 w-36 h-8 rounded-md text-sm"
                  >
                    Send OTP
                  </button>
                </>
              ) : (
               
                   <>
                  <input
                    type="number"
                    placeholder="Enter Password here"
                    ref={ref}
                    className="pl-2 text-xs border border-gray-600 rounded-md w-64 h-8 spin-button-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Enter the confirm Password"
                    className="pl-2 text-xs border border-gray-600 rounded-md w-64 h-8 spin-button-none"
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                  <button
                    onClick={changePass}
                    type="submit"
                    className="bg-blue-500 w-36 h-8 test-sm rounded-md"
                  >
                    Submit Change
                  </button>
                </>
                
              )}
            </>
          )}
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
      <Toaster/>
    </>
  );
}

export default ForgetPassword;
