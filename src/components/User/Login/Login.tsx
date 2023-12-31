import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email.length === 0) {
        toast.error("please enter the email");
        return;
      }      
      if (email.substring(0, 1).trim() === '') {
        toast.error("Please remove the space before the event name");
        return
      }
      if (email[0] === " ") {
        toast.error("Please remove the space before the event name");
        return;
      }
      const validDomains = ["gmail.com", "yahoo.com", "hotmail.com"];

      const domain = email.split("@")[1];
      if (!validDomains.includes(domain)) {
        toast.error("Enter a valid email domain");
        return;
      }
      if(password.length===0){
        toast.error("Enter the password");
        return
      }
      await axios
        .post(
          `${import.meta.env.VITE_USER_API}userLogin`,
          { email, password },
          { withCredentials: true }
        )
        .then((response) => {
          const result = response?.data;
          if (result.message === "Access granted" && result.status === 200) {
            Cookies.set("jwtToken", result.jwtToken);
            // const userName = `${result.userData?.firstName} ${result.userData?.lastName}`;
            navigate("/");
          }
         
        }).catch((error)=>{
          console.error(error);
          if(error?.response?.data?.status!==500){
            toast.error(error?.response?.data?.error)
            return
          }else{
            navigate("/error500")
          }
        })
    } catch (error){
     
      console.error(error,"error");
    }
  };
  return (
    <div
      className=" flex flex-col items-center justify-center  w-[100vw]"
      style={{
        height: "51.7rem",
        backgroundSize: "104rem 51.7rem",
        backgroundImage:
          "url('https://i.pinimg.com/originals/05/b3/1a/05b31a061a39390c2dcb058aded8fa44.jpg')",
          backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white bg-opacity-40 w-96 h-96 rounded-lg m-3">
        <div className="bg-transparent flex flex-col items-center justify-center mt-5">
          <h4 className="bg-transparent font-bold">Welcome back. </h4>
          <h4 className="bg-transparent">Log in and start exploring.</h4>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col  items-center justify-center mt-5">
            <input
              type="email"
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
            <button className="bg-green-500 w-60 h-8 rounded-full mt-5 border-2 border-gray-700">
              Log in
            </button>
          </div>

          {/* bottom area */}
          <div className="w-full bg-transparent h-36 rounded-lg flex items-center flex-col">
            <div className="w-60 h-px mt-3 bg-gray-400"></div>
            <button
              className="bg-blue-500 w-60 h-8 rounded-full mt-2"
              onClick={() => navigate("/userSignup")}
            >
              Signup
            </button>
            <p
              className="text-black font-bold text-sm cursor-pointer mt-3 hover:underline decoration-double"
              onClick={() => navigate("/forgetPass")}
            >
              Forget the password
            </p>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default Login;
