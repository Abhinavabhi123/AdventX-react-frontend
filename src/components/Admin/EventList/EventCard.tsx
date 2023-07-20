import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../../../Store/api";
import AdminAxios from "../../../Store/Axios/AdminConfig";
interface Props {
  value: string;
}
interface Value {
  eventName: string;
  description: string;
  date: string;
  eventType: string;
  fee: string;
  participants: [string];
  primaryImage: string;
  location: string;
  status: string;
}

function EventCard({ value }: Props) {
    const navigate =useNavigate()

  const [data, setData] = useState<Value>({
    eventName: "",
    description: "",
    date: "",
    eventType: "",
    fee: "",
    participants: [""],
    primaryImage: "",
    location: "",
    status: "",
  });
  useEffect(() => {
    (async () => {
      await AdminAxios
        .get(`getEventDetails`, {
          params: {
            id: value,
          },
        })
        .then((response) => {
          console.log(response.data);
          setData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  const {
    eventName,
    date,
    eventType,
    fee,
    participants,
    primaryImage,
    location,
    status,
  } = data;
  console.log(data);

  const count = participants.length;


  return (
    <div className="w-[95%] h-36 mb-4 flex bg-slate-300 rounded-md mt-3">
      <div className="w-[20%] h-full flex justify-center items-center ">
        <div className="w-[90%] h-[90%]  rounded-md flex justify-center items-center">
          <img
            src={primaryImage}
            alt="event image"
            className="w-full h-full text-xs rounded-md"
          />
        </div>
      </div>
      <div className="w-[40%]  h-full bg-transparent flex justify-center items-center">
        <div className="w-[95%] h-[90%]  flex flex-col justify-evenly">
          <p className="text-sm ms-2">Event Name:- {eventName}</p>
          <p className="text-sm ms-2">Event Type:- {eventType}</p>
          <p className="text-sm ms-2">Location:- {location}</p>
          <p className="text-sm ms-2">Date:- {date}</p>
          <p className="text-sm ms-2">Total Participation:- {count}</p>
        </div>
      </div>
      <div className="w-[40%]  h-full bg-transparent flex justify-center items-center">
        <div className="w-[95%] h-[90%]  flex">
          <div className="w-[85%] h-full ">
            <p className="text-sm ms-2">Amount:- {fee}</p>
            <p className="text-sm ms-2">Status:- {status}</p>
          </div>
          <div className="w-[15%] h-full flex  flex-col justify-between items-end">
            <img 
            src="/icons/edit.1.png" 
            alt="editBtn" 
            className="w-6 mt-1 cursor-pointer" onClick={()=>navigate(`/admin/editEvent/${value}`)} />
            <img
              src="/icons/delete1.png"
              alt="deleteBtn"
              className="w-5 mb-1 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
