import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import EventDetails from "../../components/Admin/EventDetails/EventDetails";

function EventManagement() {
    const navigate = useNavigate()
  return (
    <div className="w-screen h-screen flex ">
      <div className="w-[16rem] h-full ">
        <SideBar />
      </div>
      <div className="w-full h-[53rem]">
        <div>
          <TopBar value={"Event"} />
        </div>
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-[96%] h-[50rem]  rounded-md border border-dashed border-blue-600 flex flex-col">
            <div className="w-full h-12  flex items-center justify-end" onClick={()=>{navigate("/admin/addEvent")}}>
              <button className="w-32 h-8 text-sm  bg-blue-300 mr-5 rounded-md flex items-center justify-evenly">
                <img className="w-7 h-7" src="/icons/add.png" alt="add" /> Add
                Event
              </button>
            </div>
          <div className="w-full h-full flex justify-center items-center">
            <div className=" w-[97%] h-[97%] bg-green-400">
                
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventManagement;
