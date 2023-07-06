
import SideBar from '../../components/Admin/AdminSideBar/SideBar'
import TopBar from '../../components/Admin/AdminTopBar/TopBar'

function AdminDashboard() {
  return (
    <div className='fle flex-row '>
      <div>
      <SideBar/>
      </div>
      <div className='flex justify-end'>
      <TopBar value="Dashboard"/>
      </div>
    </div>
  )
}

export default AdminDashboard
