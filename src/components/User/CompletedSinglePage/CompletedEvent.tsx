import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import HomeBtn from "../Button/HomeBtn";
import EventMainTop from "./EventMainTop";
import EventDetails from "./EventDetails";
import EventForm from "./EventForm";
import Rules from "./Rules";
import axios from "axios";
import WinnerDetails from "./WinnerDetails";
import EventImages from "./EventImages";
import JoinClub from "../JoinClub/JoinClub";
import Footer from "../Footer/Footer";

function CompletedEvent() {
  const { id } = useParams();
  const [data, setData] = useState({
    is_completed:false,
    about:"",
    winners: [
      {
        first: {
          name: "",
          image: "",
        },
        second: {
          name: "",
          image: "",
        },
        third: {
          name: "",
          image: "",
        },
      },
    ],
    images:[]
  });

  useEffect(() => {
    if (id) {
      (async () => {
        await axios
          .get(`${import.meta.env.VITE_USER_API}getUserEvent`, {
            params: {
              id,
            },
            withCredentials: true,
          })
          .then((response) => {
            if (response?.data?.status === 200) {
              setData(response?.data?.eventData);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  }, [id]);
console.log(data);


  return (
    <div className="w-[100vw] h-[100vh] bg-white">
      <div className="w-full h-20 ">
        <NavBar />
      </div>
      <div className="w-full h-full bg-white">
        <div className="w-full h-[5rem] flex justify-end items-center pe-[2rem] bg-white">
          <HomeBtn />
        </div>
        <EventMainTop id={id} />
        {data?.is_completed ? (
          <>
          <WinnerDetails winners={data?.winners}/>
          <EventImages images={data?.images} about={data?.about}/>
          </>
          
        ) : (
          <>
            <EventDetails id={id} />
            <EventForm />
            <Rules />
          </>
        )}
        <JoinClub/>
        <Footer/>
      </div>
    </div>
  );
}

export default CompletedEvent;
