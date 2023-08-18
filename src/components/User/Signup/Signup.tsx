import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { UserApi } from "../../../Store/api";
import OTP from "../OTP/OTP";
import UserEmailContext from "../../../Store/Context/Context";
import { showErrorToast, showSuccessToast, styledToast } from "../../ToastMessage/Toast";
import { Toaster, toast } from "react-hot-toast";
type userDataType = {
  fName: string;
  lName: string;
  Mobile: string;
  email: string;
  password: string;
};

function Signup() {
  const navigate = useNavigate();
  const [showOpt, setShowOtp] = useState(false);
  useEffect(() => {
    console.log();
  }, [showOpt]);

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [Mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      if(fName.length===0){
        showErrorToast("Please Enter first name")
        return
      }
      if(fName[0]===" "){
        showErrorToast("Please remove the space before the text")
        return
      }
      if(fName.trim()===""||typeof fName!=="string"){
        showErrorToast("Please  enter first name")
        return
      }
      const symbols = /[-!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/;
      if (symbols.test(fName)) {
        showErrorToast("Please  remove the special symbols in first name");
        return;
      }

      if(lName.length===0){
        showErrorToast("Please Enter last name")
        return
      }
      if(lName[0]===" "){
        showErrorToast("Please remove the space before the last name")
        return
      }
      if(lName.trim()===""||typeof lName!=="string"){
        showErrorToast("Please  enter last name")
        return
      }
      
      if (symbols.test(lName)) {
        showErrorToast("Please  remove the special symbols in last name");
        return;
      }
      if (symbols.test(Mobile)) {
        showErrorToast("Please  remove the special symbols in mobile");
        return;
      }
      if(Mobile.length!==10){
        showErrorToast("Please enter a valid mobile number");
        return
      }
      if(Mobile[0]===" "){
        showErrorToast("Please remove the space in the mobile number");
        return
      }
      if(Mobile.trim()===""||typeof Mobile!=="string"||Mobile.trim().length!==10){
        showErrorToast("Please enter a valid mobile number");
        return
      }
      
      if (symbols.test(Mobile)) {
        showErrorToast("Please  remove the special symbols in mobile");
        return;
      }
      const validDomains = [
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
        ];
        
        const domain = email.split("@")[1];
        if (!validDomains.includes(domain)) {
        showErrorToast("Please enter valid email")
        return;
      }
      if(email.length===0){
        showErrorToast("Please enter email")
        return
      }
      if(password[0]===" "){
        showErrorToast("Please enter valid password")
        return
      }
      if(password.length<6){
        showErrorToast("Please enter at least 6 characters for password")
        return
      }
      if(password!==confPass){
        showErrorToast("Password is not matching to the confirm password ")
        return
      }
      toast.loading("Please wait")
      await axios.post(`${import.meta.env.VITE_USER_API}sendOpt`, { email }).then((response) => {
        toast.dismiss()
        if (response.data.message) {
          styledToast("OTP is sended to your email")
          setShowOtp(true);
        }
      }).catch((error)=>{
        console.error(error);
        if(error?.response?.data?.status!==500){
          showErrorToast(error?.response?.data?.error)
        }else{
          navigate("/error500")
        }
      })
    } catch (error) {
      console.error(error);
    }
  };
  const userData: userDataType = {
    fName,
    lName,
    Mobile,
    email,
    password,
  };
  if (showOpt === true) {
    return (
      <UserEmailContext.Provider value={userData}>
        <OTP />
      </UserEmailContext.Provider>
    );
  }

  return (
    <div
      style={{
        height: "51.7rem",
        backgroundSize: "104rem 51.7rem",
        backgroundImage:
          "url('https://images8.alphacoders.com/109/1092575.jpg')",
          backgroundRepeat: "no-repeat"
      }}
      className="flex justify-center items-center w-[100vw]"
    >
      <div className=" bg-white bg-opacity-30 rounded-md w-96 h-96 flex flex-col items-center ">
        <div className="flex flex-col items-center">
          <img
            className="w-20 ml-5 "
            src="/An Off-road logo bw4 .png"
            alt="logo"
          />
          <h2>Create your free account</h2>
        </div>
        {/* input div */}
        <form onSubmit={submitForm}>
          <div className=" flex flex-col items-center mt-2">
            {/* left */}
            <div className="left flex flex-row mr-1 gap-2">
              <input
                type="text"
                placeholder="First Name"
                className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
                onChange={(e) => setFname(e.target.value)}
              />
              <input
                type="text"
                placeholder="LastName"
                className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="second flex flex-row mr-1 gap-2">
              <input
                type="number"
                placeholder="Mobile"
                className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5 spin-button-none"
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email id"
                className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* right */}
            <div className="right flex flex-row mr-1 gap-2">
              <input
                type="text"
                placeholder="Password"
                minLength={6}
                className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                minLength={6}
                placeholder="confirm Password"
                className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
                onChange={(e) => setConfPass(e.target.value)}
              />
            </div>
          </div>

          {/* submit div */}
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-400 w-20 h-6 rounded-md border-2 mt-2 border-black text-sm">
              Signup
            </button>
          </div>
        </form>
        <Toaster/>
        <div>
          <h6></h6>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
