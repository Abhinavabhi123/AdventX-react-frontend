import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error404() {
    const navigate = useNavigate()
  return (
    <div className='w-screen h-screen'>
      {/* <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <p
              onClick={()=>navigate("/")}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Go back home
            </p>
            
          </div>
        </div>
      </main> */}
      <img className='w-[99vw] h-screen absolute' src="/icons/image_processing20190818-32750-8v6g4s.gif" alt="error" />
     
      <p className='text-white relative'>hello</p>
      </div>
  )
}

export default Error404
