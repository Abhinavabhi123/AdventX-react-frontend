import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import EventDetails from "../../components/Admin/EventDetails/EventDetails";

function AddEvent() {
  return (
    <div className="w-[99vw] h-screen flex ">
      <div className="w-[16rem] h-full ">
        <SideBar />
      </div>
      <div className="w-full h-[43rem]">
        <div>
          <TopBar value={"Create Event"} />
        </div>
        <div className="h-full w-full flex justify-center items-center">
          <EventDetails/>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
