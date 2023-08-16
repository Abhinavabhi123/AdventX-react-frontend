
import CardList from "../../components/Admin/AdminDashboard/CardList";
import CommunityTable from "../../components/Admin/AdminDashboard/CommunityTables/CommunityTable";
import DashboardUsers from "../../components/Admin/AdminDashboard/DashboardUsers/DashboardUsers";
import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";


function AdminDashboard() {

  return (
    <div className="flex w-[99vw] h-screen flex-row bg-transparent justify-between">
      <div>
        <SideBar />
      </div>
      <div className=" w-[89rem]  h-full flex flex-col">
        <div>
          <TopBar value="Dashboard" />
        </div>
        <div className="w-full h-fit bg--300">
          <CardList />
          <CommunityTable/>
          <DashboardUsers/>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
