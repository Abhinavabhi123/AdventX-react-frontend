import { useEffect, useState } from "react";
import UserAxios from "../../../Store/Axios/UserConfig";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";

interface Data {
  _id: string;
  primaryImage: string;
  eventName: string;
  eventType: string;
  location: string;
  subName: string;
  fee: number;
  date: string;
}

function EventDetails() {
  const navigate =useNavigate()
  const userId: string = useSelector((state: any) => state?.user?._id);
  const [data, setData] = useState<Data[]>([
    {
      _id: "",
      primaryImage: "",
      eventName: "",
      eventType: "",
      location: "",
      subName: "",
      fee: 0,
      date: "",
    },
  ]);
  useEffect(() => {
    if (userId) {
      (async () => {
        await UserAxios.get(`userEvents/${userId}`)
          .then((response) => {
            if (response?.data?.status === 200) {
              setData(response?.data?.eventList);
            }
          })
          .catch((error)=>{
            console.error(error);
            navigate("/error500")
          })
      })();
    }
  }, [userId]);

  return (
    <div className="w-full h-[34.5em]  flex justify-center items-center">
      <div className="w-[90%] h-[90%] border rounded-md border-gray-400 overflow-y-scroll over">
        {data.map((event, i) => {
          return <EventCard key={i} event={event} />;
        })}
      </div>
    </div>
  );
}

export default EventDetails;
