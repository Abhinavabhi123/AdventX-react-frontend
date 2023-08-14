import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import NavBar from "../../NavBar/Navbar";
import UserAxios from "../../../../Store/Axios/UserConfig";

function PaymentSuccess() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const _id = urlParams.get("_id");
  const userId = useSelector((state: any) => state.user._id);
  useEffect(() => {
    if (_id && userId) {
      (async () => {
        await UserAxios.post("addPrimeUser", { _id, userId }).then(
          (response) => {
            console.log(response?.data);

            if (response?.data?.status === 200) {
              console.log("Success");

              Cookies.remove("jwtToken");
              Cookies.set("jwtToken", response?.data?.jwtToken);
              setTimeout(() => {
                navigate("/");
              }, 4000);
            }
          }
        );
      })();
    }
  }, [_id, userId]);
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-screen h-20">
        <NavBar />
      </div>
      <div className="w-screen h-full flex justify-center items-center">
        <div className="w-[60%] h-[70%] shadow-md shadow-gray-600 border border-gray-300 rounded-md flex flex-col justify-around items-center">
          <img className="absolute w-96" src="/gifs/done gifs.gif" alt="gif" />
          <div className="relative">Success</div>
          <div>
            <button className="w-36 h-10 rounded-md bg-green-400 relative" onClick={()=>navigate("/")}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
