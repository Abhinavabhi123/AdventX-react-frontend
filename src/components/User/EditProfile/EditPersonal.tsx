import React from 'react'

function EditPersonal() {
  return (
    <div className="w-[50%] h-full">
    <div className="w-full h-10 flex items-center ps-5">
      Personal Details:
    </div>
    <form className="w-full h-[47.4rem] bg-green-500 flex flex-col justify-between">
      <div className="flex flex-col h-fit gap-4 items-center">
        {/* first name input */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
          <p className="text-sm">
            First Name
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Enter First Name"
            className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
          />
        </div>
        {/* second name input */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
          <p className="text-sm">
            Last Name
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Enter Last Name"
            className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
          />
        </div>
        {/* mobile input */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
          <p className="text-sm">
            Mobile
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="number"
            placeholder="Enter Mobile number"
            className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
          />
        </div>
        {/* about input */}
        <div className="w-[18rem] flex flex-col h-14  m-0 mt-3 justify-center">
          <p className="text-sm">
            About you
            <span className="text-red-500">*</span>{" "}
          </p>
          <textarea className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-[5rem] flex-shrink-0 border-2 border-solid border-gray-500 rounded-md" />
        </div>
        {/* physical details */}
        <div className="w-full mt-3 flex justify-center items-center">
          <div className="w-[18rem] flex flex-col h-14  m-0 justify-center items-center">
            <p className="text-sm">
              Height
              <span className="text-red-500">*</span>{" "}
            </p>
            <input
              type="number"
              placeholder="Height"
              className="placeholder-gray-500 pl-2 text-xs w-[10rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          <div className="w-[18rem] flex flex-col h-14  m-0 items-center justify-center">
            <p className="text-sm">
              Weight
              <span className="text-red-500">*</span>{" "}
            </p>
            <input
              type="number"
              placeholder="Weight"
              className="placeholder-gray-500 pl-2 text-xs w-[10rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
        </div>
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
          <p className="text-sm">
            Date of Birth
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="date"
            placeholder="Enter First Name"
            className="placeholder-gray-500 pl-2 pr-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
          />
        </div>
      </div>
      <div className="w-full h-20 mb-[5rem] flex justify-center items-center">
        <div className="w-40 h-6  flex justify-between">
          <button className="bg-cyan-400 w-16 rounded-md">Cancel</button>
          <button className="bg-cyan-400 w-16 rounded-md">Save</button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default EditPersonal
