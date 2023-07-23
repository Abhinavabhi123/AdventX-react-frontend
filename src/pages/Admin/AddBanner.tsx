import React from "react";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";

function AddBanner() {
  return (
    <div className="w-screen h-screen flex ">
      <div className="w-[16rem] h-full ">
        <SideBar />
      </div>
      <div className="w-full h-[53rem]">
        <div>
          <TopBar value={"Banners"} />
        </div>
      </div>
    </div>
  );
}

export default AddBanner;
