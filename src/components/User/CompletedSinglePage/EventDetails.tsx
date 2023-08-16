import axios from "axios";
import React, { useEffect, useState } from "react";
// import { UserApi } from "../../../Store/api";

interface Props {
  id: string | undefined;
}
interface Event {
  firstPrice: number;
  secondPrice: number;
  thirdPrice: number;
  fee: number;
}

function EventDetails({ id }: Props) {
  const [eventData, setEventData] = useState<Event>({
    firstPrice: 0,
    secondPrice: 0,
    thirdPrice: 0,
    fee: 0,
  });
  useEffect(() => {
    (async () => {
      if (id) {
        await axios
          .get(`${import.meta.env.VITE_USER_API}getUserEvent`, {
            params: {
              id,
            },
            withCredentials: true,
          })
          .then((response) => {

            if (response?.data?.status === 200) {
              setEventData(response?.data?.eventData);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })();
  }, [id]);

  return (
    <div className="w-full h-[15rem]  flex justify-center items-center border-b border-gray bg-white  ">
      <div className="w-[88%] h-[95%] ">
        <div className="w-full h-[75%] ">
          <div className=" w-full h-[20%]  flex items-center ps-5">
            <h1>Details:</h1>
          </div>
          <div className=" w-full h-[80%]  ps-4 border-b border-gray-500">
            <p className="pt-2">First Price:- {eventData?.firstPrice} </p>
            <p className="pt-2">Second price:- {eventData?.secondPrice}</p>
            <p className="pt-2"> Third Price:- {eventData?.thirdPrice}</p>
          </div>
        </div>
        <div className="w-full h-[25%] flex items-center ps-4">
          Participation Fee:- {eventData?.fee}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
