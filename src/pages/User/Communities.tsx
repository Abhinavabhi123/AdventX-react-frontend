import React from 'react'
import NavBar from '../../components/User/NavBar/Navbar'
import UserCommunityList from '../../components/User/Community/UserCommunityList'


function Communities() {
  return (
    <div className=" w-screen h-[100vh]">
      <div className=" w-full h-20">
        <NavBar />
      </div>
      <div className='w-[96.5rem] h-[70rem] bg-red-300'>
        <UserCommunityList/>
      </div>
    </div>
  )
}

export default Communities
