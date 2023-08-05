import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import AdminCompleteEvent from "../../components/Admin/CompleteEvent/AdminCompleteEvent";

function CompleteEvent() {
   const {id}=useParams()

  return (
    <div className="communityBody">
      <div className="communitySide">
        <SideBar />
      </div>
      <div className="community_topBar">
        <div className="">
          <TopBar value={"Complete Event"} />
        </div>
        <div className="w-full h-[40rem]">
        <AdminCompleteEvent id={id} />
        </div>
      </div>
    </div>
  );
}

export default CompleteEvent;
