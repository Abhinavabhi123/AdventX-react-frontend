import React, { useEffect, useState } from "react";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { UserApi } from "../../../Store/api";
import axios from "axios";
import EventCard from "./EventCard";

interface Data {
  _id: string;
}
function UpcomingEvent() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    (async () => {
      await axios.get(`${UserApi}getAllUpEvents`).then((response) => {
        setData(response?.data.eventData);
      });
    })();
  }, []);
  return (
    <div className="ml-2">
      <div className="w-full h-8  flex items-center">
        <h1>Upcoming Events</h1>
      </div>
      <div className="w-full h-52 flex  cursor-pointer">
        <div className="w-[95%] h-full  flex">
          {data.map((item, i) => {
            return <EventCard key={i} value={item} />;
          })}
        </div>
        <div className="w-[5%] h-full flex  justify-center items-center">
          <div
            className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer mb-5 bg-white"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <img className="w-4" src="/icons/right_arrow.png" alt="right arrow" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingEvent;
