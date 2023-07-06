import React from "react";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import UserList from "../../components/Admin/UsreManagement/UserList";

function UserManagement() {
  return (
    <div className="flex w-screen h-screen flex-row bg-transparent justify-between">
      <div>
        <SideBar />
      </div>
      <div className=" w-[76rem]  h-fullflex flex-col">
        <div>
          <TopBar value="Users" />
        </div>
        <div className="w-full h-full mt-[2.5rem] flex pt-5 justify-center">
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
