import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllEventCard from "./AllEventCard";
import "../UpcomingEvents/Event.css";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

interface Data {
  _id: string;
}

function AllEvents() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${import.meta.env.VITE_USER_API}getAllEvents`)
        .then((response) => {
          setData(response?.data?.data);
        })
        .catch((error) => {
          if (error?.response?.data?.status !== 500) {
            showErrorToast(error?.response?.data?.error);
          } else {
            console.error(error);
            navigate("/error500");
          }
        });
    })();
  }, []);

  return (
    <div className="ml-2 ">
      <Toaster/>
      <div className="w-full h-8  flex items-center">
        <h1>Completed Events</h1>
      T</div>
      <div className="w-full h-52 flex  cursor-pointer">
        <div className="w-[95%] h-full overflow-x-scroll scroll-smooth over flex">
          {data.map((item, i) => {
            return <AllEventCard key={i} value={item} />;
          })}
        </div>
        <div className="w-[5%] h-full flex  justify-center items-center">
          <div
            className="tooltip w-8 h-8 rounded-full flex justify-center items-center cursor-pointer mb-5 bg-white"
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
    </div>
  );
}

export default AllEvents;
