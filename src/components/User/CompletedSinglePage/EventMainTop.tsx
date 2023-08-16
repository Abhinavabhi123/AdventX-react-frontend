import axios from "axios";
import React, { useEffect, useState } from "react";
// import { UserApi } from "../../../Store/api";

interface EventMainTopProps {
  id: string | undefined;
}
interface Event{
    subName:string;
    location:string;
    date:string;
    eventType:string;
    description:string;
    eventName:string;
    primaryImage:string;
}

function EventMainTop({ id }: EventMainTopProps) {
   
  const [eventData, setEventData] = useState<Event>({
    subName:"",
    location:"",
    date:"",
    eventType:"",
    description:"",
    eventName:"",
    primaryImage:""
  });
  useEffect(() => {
    (async () => {
      if (id) {
        await axios
          .get(`${import.meta.env.VITE_USER_API}getUserEvent`, {
            params: {
              id,
            },
            withCredentials: true,
          })
          .then((response) => {

            if (response?.data?.status === 200) {
              setEventData(response?.data?.eventData);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })();
  }, [id]);
  
  

  return (
    <div className="w-full h-[27rem]  pb-5 bg-white">
      <div className="w-full h-[13%]  flex items-center ps-[5.5rem] ">
        <h1 className="font-semibold italic"> {eventData?.eventName}</h1>
      </div>
      <div className=" w-full h-[87%]  flex ">
        <div className="w-[60%] h-full flex justify-center">
          <div className="w-[80%] h-full border-e border-gray-600">
            <img
              className=" w-[80%] h-full rounded-md"
              src={eventData?.primaryImage}
              alt=""
            />
          </div>
        </div>
        <div className="w-[40%] h-full ">
          <div className=" w-full h-[30%] bg-transparent ps-3 bg-slate-100 flex flex-col justify-center ">
            <p>Sub title:- {eventData?.subName} </p>
            <p>Location:- {eventData?.location} </p>
            <p>Date:- {eventData?.date}</p>
            <p>Type:- {eventData?.eventType}</p>
          </div>
          <div className=" w-full h-[70%] bg-transparent">
            <div className="w-full h-[13%] underline">Description</div>
            <div className="w-full h-[87%] bg-transparent flex justify-center items-center pe-10">
              <div className="w-[95%] h-[90%] bg-transparent border border-gray-500 rounded ps-3 pt-1 overflow-y-scroll over">
                <p>{eventData?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventMainTop;
