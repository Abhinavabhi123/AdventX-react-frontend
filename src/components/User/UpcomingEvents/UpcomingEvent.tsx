import React, { useEffect, useState } from "react";
import "./Event.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

interface Data {
  _id: string;
}
function UpcomingEvent() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${import.meta.env.VITE_USER_API}getAllUpEvents`)
        .then((response) => {
          setData(response?.data.eventData);
        }).catch((error)=>{
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong in this page")
          }else{
            navigate("/error500")
          }
        })
    })();
  }, []);
  return (
    <div className="ml-2">
      <div className="w-full h-8  flex items-center">
        <h1>Upcoming Events</h1>
      </div>
      <div className="w-full h-52 flex cursor-pointer">
        <div className="w-[95%] h-full overflow-x-scroll over scroll-smooth flex">
          {data.map((item, i) => {
            return <EventCard key={i} value={item} />;
          })}
        </div>
        <div className="w-[5%] h-full flex  justify-center items-center">
          <div
            className="tooltip w-8 h-8 rounded-full  flex justify-center items-center cursor-pointer mb-5 bg-white"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            onClick={() => navigate("/activities")}
          >
            <img
              className="w-4"
              src="/icons/right_arrow.png"
              alt="right arrow"
            />
            <span className="tooltiptext">See All</span>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default UpcomingEvent;
