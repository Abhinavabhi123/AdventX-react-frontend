import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

interface Props {
  value: { _id: string };
}
interface Data {
  _id:string;
  eventName: string;
  eventType: string;
  location: string;
  subName: string;
  date: string;
  primaryImage: string;
}

function EventCard({ value }: Props) {
  const [data, setData] = useState<Data>({
    _id:"",
    eventName: "",
    eventType: "",
    location: "",
    subName: "",
    date: "",
    primaryImage: "",
  });
  const navigate = useNavigate()
  const id = value._id;
  useEffect(() => {
    (async () => {
      await axios
        .get(`${import.meta.env.VITE_USER_API}getEvent`, {
          params: {
            id,
          },
        })
        .then((response) => {
          setData(response?.data?.data);
        }).catch((error)=>{
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/error500")
          }
        })
    })();
  }, []);

  return (
    <div
      className="rounded-md mr-2 bg-opacity-50"
      style={{
        boxShadow: " rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
      }}
      onClick={()=>navigate(`/eventSinglePage/${data?._id}`)}
    >
      <div className="w-[12rem] h-full  flex flex-col items-center ">
        <div className="w-[11.3rem] h-[60%] mt-1">
          <img
            className="w-[11.6rem] h-[7rem] rounded-md bg-center bg-no-repeat"
            src={data?.primaryImage}
            alt=""
          />
        </div>
        <div className="w-[11.6rem] h-16  flex justify-center items-center">
          <div className="w-[98%] h-full overflow-hidden">
            <p className=" text-xs overflow-hidden ml-1">Type:- {data?.eventType}</p>
            <p className=" text-xs text-black font-semibold">
              <span className="text-xs  text-black ml-1 font-normal">
                Name:-
              </span>{" "}
              {data?.eventName}
            </p>
            <p className=" text-xs overflow-hidden ml-1">Location:- {data?.location}</p>
            <p className=" text-xs overflow-hidden ml-1">Date:- {data?.date}</p>
          </div>
        </div>
        <Toaster/>
      </div>
    </div>
  );
}

export default EventCard;
