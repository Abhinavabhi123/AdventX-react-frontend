import React from "react";
import { useNavigate } from "react-router-dom";
 
interface Props{
  data:string
}

function Error404({data}:Props) {
  const navigate = useNavigate();
  return (
    <div className="w-[99vw] h-screen flex justify-center items-center">
      <img
        className="w-[99vw] h-screen absolute"
        src="/icons/image_processing20190818-32750-8v6g4s.gif"
        alt="error"
      />
      <button className="text-white relative mt-[20rem] bg-blue-400  w-32 h-8 rounded-md" onClick={()=>navigate(`${data}`)}>
        Back to Home
      </button>
    </div>
  );
}

export default Error404;
