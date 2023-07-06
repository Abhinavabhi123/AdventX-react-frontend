
import SideBar from '../../components/Admin/AdminSideBar/SideBar'
import TopBar from '../../components/Admin/AdminTopBar/TopBar'
import CommunityList from '../../components/Admin/ComunityList/CommunityList'

function Community() {
  return (
    <div className='fle flex-row '>
      <div>
      <SideBar/>
      </div>
      <div className='flex justify-end'>
      <TopBar value='Community'/>
      </div>
      <CommunityList/>
    </div>
  )
}

export default Community
