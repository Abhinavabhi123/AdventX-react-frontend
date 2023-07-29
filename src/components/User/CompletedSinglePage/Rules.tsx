import React from "react";

function Rules() {
  return (
    <div className="w-full h-36 flex justify-center items-center pb-8  bg-gray-100">
      <div className="w-[90%] h-[98%] rounded-md border border-gray-400">
        <div className="w-full h-[20%] flex items-center ps-5">
          <p>Rules:- </p>
        </div>
        <div className="w-full h-[80%]  ps-5 flex flex-col justify-center gap-2">
          <li>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </li>
          <li>
            {" "}
            The point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here
          </li>
          <li>making it look like readable English</li>
        </div>
      </div>
    </div>
  );
}

export default Rules;
