import React, { useEffect, useState } from "react";
import axios from "axios";

import ActiveEventCard from "./ActiveEventCard";

function AllActivities() {
  const [eventData, setEventData] = useState([
    {
      _id: "",
      primaryImage: "",
      eventName: "",
      eventType: "",
      location: "",
    },
  ]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${import.meta.env.VITE_USER_API}getUserAllEvents`)
        .then((response) => {
          if (response?.data.status === 200) {
            setEventData(response?.data?.eventData);
          }
        });
    })();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-14  flex justify-center items-center ">
        <div className="w-[25rem] h-9  border border-gray-400 rounded-full flex items-center ps-1 pe-1">
          <button className="w-7 h-7 bg-white rounded-full flex justify-center items-center">
            <img src="/icons/search.png" alt="search" className="w-5" />
          </button>
          <input
            className="w-[21rem] h-8  me-1 text-xs ps-3 focus:outline-none  focus:border-transparent"
            type="search"
            placeholder="Search Event"
          ></input>
          <button className="w-7 h-7 bg-green-500 rounded-full flex justify-center items-center">
            <img
              src="/icons/right_white_arrow.png"
              alt="arrow"
              className="w-5"
            />
          </button>
        </div>
      </div>
      <div className="w-full min-h-full max-h-fit bg-transparent flex justify-center mb-28">
        <div className="w-[80%] h-full bg-transparent grid grid-cols-4 gap-6 md:grid-cols-4  sm:grid-cols-2 ">
          {eventData.map((event, i) => {
            return <ActiveEventCard key={i} event={event} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AllActivities;
