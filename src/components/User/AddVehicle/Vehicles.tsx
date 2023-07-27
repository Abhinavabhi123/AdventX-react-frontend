import React from 'react'

function Vehicles() {
  return (
    <div className="w-[30%] h-[50rem] bg-transparent flex justify-center pt-5">
          <div
            className="w-[80%] h-[90%] bg-white rounded-md"
            style={{
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <div className="w-full h-10 bg-red-300 rounded-t-md flex justify-center items-center border-b  border-gray-500">
                <p>Your Vehicles</p>
            </div>
          </div>
        </div>
  )
}

export default Vehicles
