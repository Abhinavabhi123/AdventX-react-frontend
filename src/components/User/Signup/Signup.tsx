import React,{useState} from "react";

function Signup() {
    const [fName,setFname]=useState('')
    const [lName,setLname]=useState('')
    const [Mobile,setMobile]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confPass,setConfPass]=useState('')

    const submitForm=()=>{
    console.log(fName,lName,Mobile,email,password,confPass)
    }

  return (
    <div
      style={{
        height: "50rem",
        backgroundSize: "100reM 50rem",
        backgroundImage:
          "url('https://images8.alphacoders.com/109/1092575.jpg')",
      }}
      className="flex justify-center items-center"
    >
      <div className=" bg-white rounded-md w-96 h-96 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <img
            className="w-20 ml-5"
            src="/An Off-road logo bw4 .png"
            alt="logo"
          />
          <h2>Create your free account</h2>
        </div>
        {/* input div */}
        <div className=" flex flex-col items-center mt-2">
            {/* left */}
          <div className="left flex flex-row mr-1 gap-2">
            <input
              type="text"
              placeholder="First Name"
              className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
              onChange={(e)=>setFname(e.target.value)}
              />
            <input
              type="text"
              placeholder="LastName"
              className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
              onChange={(e)=>setLname(e.target.value)}
            />
              </div>
              <div className="second flex flex-row mr-1 gap-2">

            <input
              type="text"
              placeholder="Mobile"
              className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
              maxLength={10}
              onChange={(e)=>setMobile(e.target.value)}
              />
              <input
              type="text"
              placeholder="Email id"
              className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
              onChange={(e)=>setEmail(e.target.value)}
            />
              </div>
          {/* right */}
          <div className="right flex flex-row mr-1 gap-2">
            
            <input
              type="text"
              placeholder="Password"
              minLength={6}
              className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <input
              type="text"
              minLength={6}
              placeholder="confirm Password"
              className="placeholder-gray-500 pl-2 text-xs w-36 h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md mt-5"
              onChange={(e)=>setConfPass(e.target.value)}
            />
          </div>
        </div>

        {/* submit div */}
        <div>
          <button className="bg-blue-400 w-20 h-6 rounded-md border-2 mt-2 border-black text-sm" onClick={submitForm}>Signup</button>
        </div>
        <div>
          <h6></h6>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
