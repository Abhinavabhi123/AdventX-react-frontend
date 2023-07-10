import React from 'react'
import NavBar from '../../components/User/NavBar/Navbar'
import ForgetPassword from '../../components/User/Forget/ForgetPassword'

function ForgetPass() {
  return (
    <div>
        <div>
            <NavBar/>
        </div>
        <div className='w-screen h-[43.8rem] flex justify-center items-center'>
           <ForgetPassword/> 
        </div>
      
    </div>
  )
}

export default ForgetPass
