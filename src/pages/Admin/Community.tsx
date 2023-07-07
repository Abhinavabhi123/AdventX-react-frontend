import "./Community.css"
import SideBar from '../../components/Admin/AdminSideBar/SideBar'
import TopBar from '../../components/Admin/AdminTopBar/TopBar'
import CommunityList from '../../components/Admin/ComunityList/CommunityList'

function Community() {
  return (
      <div className='communityBody'>
        <div className="communitySide">
          <SideBar/>
        </div>
        <div></div>
      </div>
  )
}

export default Community
