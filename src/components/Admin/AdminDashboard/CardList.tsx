import React, { useState, useEffect } from "react";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../ToastMessage/Toast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import users from "/icons/users.png";
import prime from "/icons/crown.png";
import event from "/icons/events.png";
import globe from "/icons/globe.png";
import Cards from "./Cards";

interface Data {
  userData: number;
  primeMembers: number;
  events: number;
  communityCount: number;
  blockedUsers: number;
  completedEvents: number;
}

interface Obj {
  image: string;
  name: string;
  amount: number;
  subText?: string;
  count?: number;
  size: number;
}
interface Value {
  user: number;
  prime: number;
}


function CardList() {
  const navigate = useNavigate()
  const [data, setData] = useState<Data>({
    userData: 0,
    primeMembers: 0,
    events: 0,
    communityCount: 0,
    blockedUsers: 0,
    completedEvents: 0,
  });
  const object: Obj[] = [
    {
      image: users,
      name: "Users",
      amount: data?.userData,
      subText: "Blocked",
      count: data?.blockedUsers,
      size: 7,
    },
    {
      image: prime,
      name: "Prime Member",
      amount: data?.primeMembers,
      size: 10,
    },
    {
      image: event,
      name: "Events",
      amount: data?.events,
      subText: "Completed",
      count: data?.completedEvents,
      size: 7,
    },
    {
      image: globe,
      name: "Communities",
      amount: data?.communityCount,
      size: 8,
    },
  ];
  useEffect(() => {
    (async () => {
      await AdminAxios.get("dashboardCardValues")
        .then((response) => {
          if (response?.data?.status === 200) {
            setData(response?.data);
          }
        })
        .catch((error) => {
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/admin/error500")
          }
        });
    })();
  }, []);
  return (
    <div className="w-full h-56  flex justify-center items-center   ">
      <div className="w-[90%] h-[90%] flex justify-evenly items-center">
        {object.map((data, i) => {
          return <Cards key={i} data={data} />;
        })}
      </div>
      <Toaster />
    </div>
  );
}

export default CardList;
