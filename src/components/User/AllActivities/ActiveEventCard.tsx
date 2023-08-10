import React from "react";
import { useNavigate } from "react-router-dom";
interface Event {
  event: {
    _id: string;
    eventName: string;
    eventType: string;
    // fee:number;
    // firstPrice:number;
    location: string;
    primaryImage: string;
    // secondPrice:number;
    // subName:string;
    // thirdPrice:number
  };
}

function ActiveEventCard({ event }: Event) {
  const navigate = useNavigate();
  console.log(event, "dgdfg");

  return (
    <div
      className="w-[17.4rem]  h-52 bg-transparent rounded-md flex flex-col items-center cursor-pointer border border-gray-300 "
      onClick={() => navigate(`/eventSinglePage/${event?._id}`)}
    >
      <div className="w-[95%] h-[70%] bg-transparent flex items-center  justify-center">
        <img src={event?.primaryImage} alt="" className="h-36 w-64" />
      </div>
      <div className="w-[95%] h-[30%] ">
        <p className="text-xs ms-2 mt-2">Name: {event?.eventName}</p>
        <p className="text-xs ms-2">Type: {event?.eventType}</p>
        <p className="text-xs ms-2">Location: {event?.location}</p>
      </div>
    </div>
  );
}

export default ActiveEventCard;
