import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../../Store/api";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { userActions } from "../../../Store/redux/UserAuth";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${UserApi}userLogin`,
          { email, password },
          { withCredentials: true }
        )
        .then((response) => {
          const result = response?.data;
          if (result.message === "Access granted" && result.status === 200) {
            console.log(result, "it is the result of the response");
            const userName = `${result.userData?.firstName} ${result.userData?.lastName}`;
            dispatch(
              userActions.userAddDetails({
                userName: userName,
                email: result?.userData?.email,
                userToken: result?.jwtToken,
                loggedIn: result?.loggedIn,
              })
            );

            navigate("/");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className=" flex flex-col items-center justify-center w-screen"
      style={{
        height: "50rem",
        backgroundSize: "99rem 50rem",
        backgroundImage:
          "url('https://i.pinimg.com/originals/05/b3/1a/05b31a061a39390c2dcb058aded8fa44.jpg')",
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
            <p className="text-black font-bold text-sm cursor-pointer mt-3 hover:underline decoration-double" 
            onClick={()=>navigate("/forgetPass")}
            >
              Forget the password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
