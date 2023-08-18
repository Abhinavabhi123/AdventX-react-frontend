import SideBar from '../../components/Admin/AdminSideBar/SideBar'
import TopBar from '../../components/Admin/AdminTopBar/TopBar'
import EditEvent from '../../components/Admin/EditEvent/EditEvent'

function EditEvents() {
  return (
    <div className="w-[99vw] h-screen flex ">
    <div className="w-[16rem] h-full ">
      <SideBar />
    </div>
    <div className="w-full h-[43rem]">
      <div>
        <TopBar value={"Edit Event"} />
      </div>
      <div className="h-full w-full flex justify-center items-center">
      <EditEvent/>
      </div>
    </div>
  </div>
  )
}

export default EditEvents
