import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import CreateCommuniti from "../../components/Admin/CreateCommunity/CreateCommunity";

function CreateCommunity() {
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
            <CreateCommuniti/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCommunity;
