import React from 'react'
import SideBar from '../../components/Admin/AdminSideBar/SideBar'
import TopBar from '../../components/Admin/AdminTopBar/TopBar'
import EditBanners from '../../components/Admin/Banners/EditBanner'
function EditBanner() {
  return (
    <div className="w-[99vw] h-screen flex ">
    <div className="w-[16rem] h-full ">
      <SideBar />
    </div>
    <div className="w-full h-[53rem]">
      <div className="w-full h-[11.5rem]">
        <TopBar value={"Add Banner"} />
      </div>
      <div className="w-full h-[70%]  flex justify-center items-center">
        <EditBanners/>
      </div>
    </div>
  </div>
  )
}

export default EditBanner
