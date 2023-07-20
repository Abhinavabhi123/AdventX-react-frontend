import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdminApi } from "../../../Store/api";
import EventCard from "./EventCard";
import AdminAxios from "../../../Store/Axios/AdminConfig";

function EventList() {
  const [events, setEvents] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      await AdminAxios.get(`getAllEvent`).then((response) => {
        setEvents(response.data.eventData);
      });
    })();
  }, []);
  return (
    <div className=" w-[72rem] h-[46rem] bg-green-400 flex flex-col items-center overflow-y-scroll over">
      {events.map((event, i) => {
        return <EventCard value={event} key={i}/>;
      })}
    </div>
  );
}

export default EventList;
