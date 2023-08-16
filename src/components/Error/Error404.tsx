import React from "react";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen">
      <img
        className="w-[99vw] h-screen absolute"
        src="/icons/image_processing20190818-32750-8v6g4s.gif"
        alt="error"
      />

      <p className="text-white relative">hello</p>
    </div>
  );
}

export default Error404;
