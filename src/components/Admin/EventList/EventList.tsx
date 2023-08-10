import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import AdminAxios from "../../../Store/Axios/AdminConfig";

function EventList() {
  const [events, setEvents] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      await AdminAxios.get(`getAllEvent`).then((response) => {
        setEvents(response.data.eventData);
      });
    })();
  }, [deleted]);

  return (
    <div>
      <div className="w-full h-5  flex items-center ps-[2rem]">
        <p className="text-xs">Total Events:- {events.length}</p>
      </div>
      <div className=" w-full h-[46rem] flex flex-col  items-center overflow-y-scroll over">
        <div className=" w-full h-[44rem] flex flex-col items-center overflow-y-scroll over">
          {events.map((event, i) => {
            return (
              <EventCard
                value={event}
                key={i}
                deleted={deleted}
                setDeleted={setDeleted}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EventList;
