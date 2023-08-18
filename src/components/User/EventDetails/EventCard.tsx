import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
  event: {
    primaryImage: string;
    eventName: string;
    eventType: string;
    location: string;
    subName: string;
    fee: number;
    date: string;
    _id: string;
    is_completed: boolean;
    participants?: [{userId:string,confirmed:string}]
  };
}

function EventCard({ event }: Props) {
const userId = useSelector((state:any)=>state?.user?._id)
const navigate = useNavigate();
const [conf,setConf]=useState<string>("")

  useEffect(() => {
    if (event?.participants) {
      event?.participants.map((eve) => {
        if(eve?.userId===userId){
            setConf(eve?.confirmed)
        }
      });
    }
  }, [userId,event?.participants]);
  
  return (
    <div
      className="w-full h-32  mt-2 flex justify-center"
     
    >
      <div className="w-[95%] border shadow-lg h-[95%] flex">
        <div className="w-[33.2%] h-full flex items-center justify-center">
          <img
            className="h-[90%] rounded-md cursor-pointer"
            src={event?.primaryImage}
            alt=""
            onClick={() => navigate(`/eventSinglePage/${event?._id}`)}
          />
        </div>
        <div className="w-[33.2%] h-[100%]  overflow-hidden flex  flex-col items-center justify-center">
          <p className="text-sm">Name: {event?.eventName}</p>
          <p className="text-sm">Type: {event?.subName}</p>
          <p className="text-sm">Type: {event?.eventType}</p>
          <p className="text-sm">Location: {event?.location}</p>
          <p className="text-sm">Amount Paid: {event?.fee}</p>
          <p className="text-sm">Date: {event?.date}</p>
        </div>
        <div className="w-[33.2%] h-[100%]  overflow-hidden flex  flex-col items-center justify-center">
          <p
            className={`text-sm ${
              event?.is_completed ? "text-green-400" : "text-red-400"
            }`}
          >
            {event?.is_completed ? "completed" : "Not completed"}
          </p>
          <p>{conf}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
