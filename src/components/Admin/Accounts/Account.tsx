import { useEffect, useState } from "react";
import AmountCard from "./AmountCard";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import Money from "/icons/money.png";
import Event from "/icons/events.png";
import Prime from "/icons/crown.png";
import Members from "/icons/users.png";
import EventTable from "./EventDetails/EventTable";

function Account() {
  const [data, setData] = useState({
    subAmount: 0,
    eventAmount: 0,
  });

  const values = [
    {
      image: Money,
      text: "Total Profit",
      amount: data?.subAmount + data?.eventAmount,
    },
    { image: Event, text: "From Event", amount: data?.eventAmount },
    { image: Prime, text: "Subscription", amount: data?.subAmount },
    { image: Members, text: "Members", amount: data?.subAmount/2000 },
  ];

  useEffect(() => {
    (async () => {
      await AdminAxios.get("accounts")
        .then((response) => {
          if (response?.data?.status === 200) {
            setData(response?.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  console.log(values, "values");

  return (
    <div className="w-full h-full bg--400">
      <div className="w-full h-48 flex justify-center shrink-0 bg-[#cbd5e1] items-center">
        <div className="w-[80%] h-[90%] flex  items-center justify-evenly">
          {values.map((value, i) => {
            return <AmountCard key={i} value={value} />;
          })}
        </div>
      </div>
      <div className="w-full h-full ">
        <div className="w-full flex justify-end h-10  items-center pe-5">
          <p>Subscription Amount : 2000/-</p>
        </div>
        <div className="w-full h-full  flex ">
          <div className="w-1/2 h-full flex justify-center items-center bg-blue-300">
            <p>For chart</p>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center ">
            <EventTable/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
