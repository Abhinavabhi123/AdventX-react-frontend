import React from "react";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import Account from "../../components/Admin/Accounts/Account";

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
        <div className="w-full h-full">
          <Account/>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
