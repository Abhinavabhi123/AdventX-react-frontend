import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import UserList from "../../components/Admin/UsreManagement/UserList";

function UserManagement() {
  return (
    <div className="flex w-[99vw] h-screen flex-row bg-transparent justify-between">
      <div>
        <SideBar />
      </div>
      <div className=" w-[89rem]  h-full flex flex-col">
        <div>
          <TopBar value="Users" />
        </div>
        <div className="w-[99%] h-full mt-[2.5rem] flex pt-5 justify-center">
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
