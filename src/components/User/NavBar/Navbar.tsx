import React, { useState, useEffect, } from "react";

import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Cookies from "js-cookie";



import UserAxios from "../../../Store/Axios/UserConfig";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState<string>("");
  const navigate = useNavigate();
  const cookie = Cookies.get("jwtToken");
  const userId: boolean = useSelector((state: any): boolean => {
    return state.user._id;
  });
  const isPrime: boolean = useSelector((state: any): boolean => {
    return state.user.is_prime;
  });
  const primeName: boolean = useSelector((state: any): boolean => {
    return state.user.userName;
  });

  useEffect(() => {
    (async () => {
      if (userId) {
        await UserAxios.get(`getUserProfile/${userId}`).then((response) => {
          if (response?.data?.status === 200) {
            setUserImage(response?.data?.userData?.image);
          }
        });
      }
    })();
  }, [userId]);

  return (
    <div className="navBar absolute  bg-white w-[100%] h-20 flex flex-row items-center border-2">
      <div className="navInnerContaine bg-white w-full  h-max flex flex-row items-center justify-evenly">
        <div className="flex flex-row bg-white w-full">
          <div className="  w-96 flex  justify-around items-center bg-white">
            <img
              src="/An Off-road community (1).png"
              className="w-20 ml-5  cursor-pointer"
              alt="Logo"
              onClick={() => navigate("/")}
            />
            <ul className="flex flex-row bg-white space-x-6">
              <li
                className="bg-white cursor-pointer"
                onClick={() => navigate("/communities")}
              >
                Community
              </li>
              <li
                className="bg-white cursor-pointer"
                onClick={() => navigate("/activities")}
              >
                Activities
              </li>
              <li className="bg-white cursor-pointer"
              onClick={()=>navigate("/about")}
              >About</li>
            </ul>
          </div>
        </div>
        <div className="mr-3 flex items-center justify-between w-18">
          <div className=" flex w-40 justify-between">
            {!isPrime ? (
              <button
                className="w-36 h-6 bg-green-500 text-white rounded-full text-xs flex justify-evenly items-center"
                onClick={() => navigate("/subscribe")}
              >
                <img
                  className="crownImage rounded-full "
                  src="/icons/crown.png"
                  alt="prime"
                />
                Get Membership
              </button>
            ) : (
              <button className="w-fit select-none cursor-default h-6 flex justify-evenly items-center bg-transparent">
                <img
                  className="w-6 mr-2 select-none cursor-default"
                  src="/icons/crown.png"
                  alt="crown"
                />
                {primeName}
              </button>
            )}
          </div>
          {!cookie ? (
            <button
              className="w-14 h-6 bg-gray-400 text-white rounded-full text-xs"
              onClick={() => navigate("/userLogin")}
            >
              Login
            </button>
          ) : userImage ? (
            <div
              className=" w-10 h-10 rounded-full cursor-pointer flex items-center"
              onClick={() => navigate("/profile")}
            >
              <img
                src={`${import.meta.env.VITE_USERIMAGE_API}${userImage}`}
                className="w-[2rem] h-[2rem] rounded-full"
                alt="userImage"
              />
            </div>
          ) : (
            <div
              style={{
                backgroundSize: "2rem 2rem",
                backgroundImage: "url('/icons/person.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
              className=" w-10 h-10 rounded-full cursor-pointer flex items-center"
              onClick={() => navigate("/profile")}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
