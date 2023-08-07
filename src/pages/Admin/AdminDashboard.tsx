
import SideBar from '../../components/Admin/AdminSideBar/SideBar'
import TopBar from '../../components/Admin/AdminTopBar/TopBar'

function AdminDashboard() {
  return (
    <div className='fle flex-row w-[99vw] '>
      <div>
      <SideBar/>
      </div>
      <div className=''>
      <TopBar value="Dashboard"/>
      </div>
    </div>
  )
}

export default AdminDashboard
