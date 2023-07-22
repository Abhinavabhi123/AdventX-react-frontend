import React, { useEffect, useState } from "react";
import { UserApi } from "../../../Store/api";
import axios from "axios";

interface Props {
  value: { _id: string };
}
interface Data {
  eventName: string;
  eventType: string;
  location: string;
  subName: string;
  date: string;
  primaryImage: string;
}

function EventCard({ value }: Props) {
  const [data, setData] = useState<Data>({
    eventName: "",
    eventType: "",
    location: "",
    subName: "",
    date: "",
    primaryImage: "",
  });
  const id = value._id;
  useEffect(() => {
    (async () => {
      await axios
        .get(`${UserApi}getEvent`, {
          params: {
            id,
          },
        })
        .then((response) => {
          console.log(response);
          setData(response?.data?.data);
        });
    })();
  }, []);

  return (
    <div
      className="rounded-md mr-2 bg-white bg-opacity-50"
      style={{
        boxShadow: " rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
      }}
    >
      <div className="w-[12rem] h-full  flex flex-col items-center ">
        <div className="w-[11.3rem] h-[60%] mt-1">
          <img
            className="w-[11.6rem] h-[full] rounded-md"
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
      </div>
    </div>
  );
}

export default EventCard;