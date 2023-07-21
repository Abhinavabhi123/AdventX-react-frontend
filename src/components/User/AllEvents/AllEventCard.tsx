import React from "react";

interface Props{
    value?: any
}

  
  function AllEventCard(props: Props) {
    const data = props.value;
  return (
    <div
      className="rounded-md mr-2 bg-white bg-opacity-50"
      style={{
        boxShadow: " rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
      }}
    >
      <div className="w-[12rem] h-full  flex flex-col items-center ">
        <div className="w-[11.3rem] h-[60%] mt-1">
          <img
            className="w-[11.6rem] h-[full] rounded-md"
            src={data?.primaryImage}
            alt=""
          />
        </div>
        <div className="w-[11.6rem] h-16  flex justify-center items-center">
          <div className="w-[98%] h-full overflow-hidden">
            <p className=" text-xs ml-1">Type:- {data?.eventType}</p>
            <p className=" text-xs text-black font-semibold">
              <span className="text-xs text-black ml-1 font-normal">
                Name:-
              </span>{" "}
              {data?.eventName}
            </p>
            <p className=" text-xs  ml-1">Location:- {data?.location}</p>
            <p className=" text-xs  ml-1">Date:- {data?.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllEventCard;
