import React, { FormEvent, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserEmailContext from "../../../Store/Context/Context";
import axios from "axios";
// import { UserApi } from "../../../Store/api";

function OTP() {
  const userEmail = useContext(UserEmailContext);
  const [seconds, setSeconds] = useState(30);
  const [resend,setResend]=useState(false)
  console.log(typeof userEmail);
  const { fName, lName, Mobile, email, password } = userEmail || {};

  const navigate = useNavigate();
  const [otp, setOtp] = useState(0);

  //   * SetTimeout process
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    if (seconds === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [seconds,resend]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const submitOTP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otpLength = otp.toString();
    try {
      if (otpLength.length === 6) {
        await axios
          .post(`${import.meta.env.VITE_USER_API}postSignup`, {
            fName,
            lName,
            Mobile,
            email,
            password,
            otp,
          })
          .then((response) => {
            console.log(response);
            if (response.data?.status === 200 && response.data?.message) {
              navigate("/userLogin");
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick=async():Promise<void>=>{
    try {
        console.log("hello");
        setSeconds(30)
        await axios.post(`${import.meta.env.VITE_USER_API}sendOpt`, { email }).then((response) => {
            console.log(response);
        });
    } catch (error) {
        console.error(error);
    }
  }


  return (
    <div className="w-screen h-[88vh] bg-transparent flex items-center justify-center">
      <div className="h-96 w-96 bg-white rounded-lg shadow-lg shadow-gray-400 ">
        <div className="flex  flex-col items-center mt-5">
          <p className="text-xl">Verify Your Email</p>
          <p className="text-xs font-thin">The OTP sended to your email</p>
          <p className="text-sm text-gray-500 font-thin">{email} </p>
        </div>
        <form
          onSubmit={submitOTP}
          className="flex flex-col items-center mt-5  bg-transparent"
        >
          <input
            type="number"
            placeholder="Enter OTP Here"
            maxLength={6}
            className=" text-center w-72 h-12 mt-3 border rounded-lg text-sm border-solid border-black spin-button-none"
            onChange={(e) => {
              const maxDigits = 6; // Maximum number of digits allowed
              const input = e.target as HTMLInputElement;
              const inputValue = input.value.replace(/\D/g, ""); // Remove non-digit characters
              if (inputValue.length > maxDigits) {
                input.value = inputValue.slice(0, maxDigits); // Truncate the input to the maximum digits
              }
              setOtp(Number(input.value));
              setOtp(Number(e.target.value));
            }}
          />
          {seconds > 0 ? (
            <>
              <button className="bg-indigo-600 w-36 mt-5 h-12 rounded-2xl font-medium text-white">
                Submit OTP
              </button>
              <div className="mt-3">
                {minutes < 10 ? "0" + minutes : minutes}:
                {remainingSeconds < 10
                  ? "0" + remainingSeconds
                  : remainingSeconds}
              </div>
            </>
          ) : (
            <button onClick={handleButtonClick} className="bg-gray-400 w-36 mt-5 h-12 rounded-2xl font-medium text-white">
              Resend OTP
            </button>
          )}
          <div className="mt-2 w-20 h-px bg-gray-400"></div>
        </form>
        <div className="flex flex-col items-center mt-[1.5rem]">
          <p className="text-thin text-gray-500 text-[0.8rem]">
            Check the email you are provided while
          </p>
          <p className="text-thin text-gray-500 text-[0.8rem]">
            sign-up,and verify the mail for{" "}
          </p>
          <p className="text-thin text-gray-500 text-[0.8rem]">
            getting access to the world of Adventures
          </p>
        </div>
      </div>
    </div>
  );
}

export default OTP;
