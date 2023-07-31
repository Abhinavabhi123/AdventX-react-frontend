import React from "react";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";

function Accounts() {
  return (
    <div className="communityBody">
      <div className="communitySide">
        <SideBar />
      </div>
      <div className="community_topBar">
        <div className="">
          <TopBar value={"Community"} />
        </div>
        <div className="w-full h-full bg-red-500">

        </div>
      </div>
    </div>
  );
}

export default Accounts;
