import React from 'react'
import NavBar from '../../components/User/NavBar/Navbar'
import UserCommunityList from '../../components/User/Community/UserCommunityList'


function Communities() {
  return (
    <div className=" w-[99vw] h-[100vh]">
      <div className=" w-full h-20">
        <NavBar />
      </div>
      <div className='w-[full] h-[50rem] bg-red-400'>
        <UserCommunityList/>
      </div>
    </div>
  )
}

export default Communities
