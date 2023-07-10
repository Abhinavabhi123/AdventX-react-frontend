import React, { useState } from "react";
import "./Community.css";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import CommunityList from "../../components/Admin/ComunityList/CommunityList";
import { useNavigate } from "react-router-dom"; "react-router-dom"
import CreateCommunity from "../../components/Admin/CreateCommunity/CreateCommunity";

function Community() {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className="communityBody">
      <div className="communitySide">
        <SideBar />
      </div>
      <div className="community_topBar">
        <div className="">
          <TopBar value={"Community"} />
        </div>
        <div className="communityMain flex justify-center items-center">
          <div className="communityMain_inner w-[98%] h-[98%] rounded-md bg-opacity-20 border-dashed border-[2px] border-blue-800">
            {/* {!openAdd ? (
              <> */}
                <div className="w-full h-20 border-b-[2px] flex justify-end items-center">
                  <button
                    onClick={() =>
                      navigate("/admin/createCommunity")
                      // openAdd == false ? setOpenAdd(true) : setOpenAdd(false)
                    }
                    className="mr-5 bg-blue-500 w-36 h-9 rounded-md"
                  >
                    Create Community
                  </button>
                </div>
                <div className="w-full h-full flex flex-col items-center pt-3">
                  <p className="mb-3">Community List</p>
                  <div className=" over w-[90%] h-[80%]  border-2 overflow-y-scroll border-black rounded-md">
                    <CommunityList />
                  </div>
                </div>
              {/* </>
            ) : ( */}
             {/* <CreateCommunity/> */}
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
