import React from 'react'
import { useNavigate } from 'react-router-dom'

function SideBar() {

  const navigate = useNavigate()
  return (
    <div className='bg-gray-400 bg-opacity-10 w-64 h-[30rem] shadow-lg  shadow-slate-500 border-black  flex justify-start rounded-md'>
      <div className='w-full h-[30rem] '>
        <div className='w-full h-16  flex justify-center items-center border-b border-gray-500'>
          <h1 className='text-2xl font-bold italic'>Hello Admin</h1>
        </div>
        <div className='w-full h-full bg-transparent'>
        <div className='w-full h-12 border-b border-gray-500 flex justify-start items-center cursor-pointer' onClick={()=>navigate("/admin/dashboard")}>
          <img src="/icons/icons8-graph-64.png" alt="Dashboard Image" className='w-6 h-6 ml-3' />
          <h1 className='ml-3 text-sm'>DashBoard</h1>
        </div>
        <div className='w-full  h-6 bg-gray-500 bg-opacity-40 flex justify-center items-center cursor-default'>
          <p className="text-xs font-semibold">Layout and Pages</p>
        </div>
        <div className='w-full h-12 border-b border-gray-500 flex justify-start items-center cursor-pointer' onClick={()=>navigate("/admin/eventManagement")}>
          <img src="/icons/events.png" alt="Dashboard Image" className='w-6 h-6 ml-3' />
          <h1 className='ml-3 text-sm'>Events</h1>
        </div>
        <div className='w-full h-12 border-b border-gray-500 flex justify-start items-center cursor-pointer' onClick={()=>navigate("/admin/community")}>
          <img src="/icons/globe.png" alt="Dashboard Image" className='w-6 h-6 ml-3' />
          <h1 className='ml-3 text-sm'>Community</h1>
        </div>
        <div className='w-full h-12 border-b border-gray-500 flex justify-start items-center cursor-pointer' onClick={()=>navigate("/admin/accounts")}>
          <img src="/icons/accounts.png" alt="Dashboard Image" className='w-6 h-6 ml-3' />
          <h1 className='ml-3 text-sm'>Accounts</h1>
        </div>
        <div className='w-full h-12 border-b border-gray-500 flex justify-start items-center cursor-pointer' onClick={()=>navigate("/admin/userManagement")}>
          <img src="/icons/users.png" alt="Dashboard Image" className='w-6 h-6 ml-3' />
          <h1 className='ml-3 text-sm'>Users</h1>
        </div>
        <div className='w-full h-12 border-b border-gray-500 flex justify-start items-center cursor-pointer' onClick={()=>navigate("/admin/bannerManagement")}>
          <img src="/icons/banner.png" alt="Dashboard Image" className='w-6 h-6 ml-3' />
          <h1 className=' ml-3 text-sm'>Banners</h1>
        </div>
        <div className='w-full h-12 border-b border-gray-500 flex justify-start items-center cursor-pointer' onClick={()=>navigate("/admin/advertisement")}>
          <img src="/icons/ads.png" alt="Dashboard Image" className='w-6 h-6 ml-3' />
          <h1 className='ml-3 text-sm'>Advertisement</h1>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
