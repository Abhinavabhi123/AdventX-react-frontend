import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";

function BannerManagement() {
    const navigate =useNavigate()
  return (
    <div className="w-screen h-screen flex ">
      <div className="w-[16rem] h-full ">
        <SideBar />
      </div>
      <div className="w-full h-[53rem]">
        <div>
          <TopBar value={"Banners"} />
        </div>
      <div  className="w-full h-full flex justify-center items-center">
        <div className="w-[97%] h-[95%] bg-violet-500">
            <div className="w-full h-12 flex justify-end items-center pr-5">
                <button className=" w-24 h-8 text-xs font-bold bg-yellow-300 flex justify-evenly items-center rounded-md" onClick={()=>navigate("/bannerManagement/addBanner")  }>
                    <img className="w-5" src="/icons/banner1.png" alt="banner logo" />
                    Add Banner
                </button>
            </div>
            <div>

            </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default BannerManagement;
