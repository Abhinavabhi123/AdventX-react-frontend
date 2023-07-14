import React from 'react'
import NavBar from '../../NavBar/Navbar'

function PaymentSuccess() {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='w-screen h-20'>
        <NavBar/>
      </div>
      <div className='w-screen h-full flex justify-center items-center'>
        <div className='w-[60%] h-[70%] bg-orange-400 rounded-md flex flex-col justify-center items-center'>
          <div>Success</div>
          <div>
            <button className='w-36 h-10 rounded-md bg-green-400'>Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
