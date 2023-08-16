import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

function CompletedEvent() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  const { id } = useParams();
  const [data, setData] = useState({
    _id: "",
    is_completed: false,
    about: "",
    fee: 0,
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
    images: [],
    eventName: "",
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
          .catch((error) => {
            if (error?.response?.data?.status !== 500) {
              showErrorToast(error?.response?.data?.error);
            } else {
              console.error(error);
              navigate("/error500");
            }
          });
      })();
    }
  }, [id]);

  return (
    <div className="w-[99vw] h-[100vh] bg-white">
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
            <WinnerDetails winners={data?.winners} />
            <EventImages images={data?.images} about={data?.about} />
          </>
        ) : (
          <>
            <EventDetails id={id} />
            <EventForm
              amount={data?.fee}
              eventName={data?.eventName}
              eventId={data?._id}
            />
            <Rules />
          </>
        )}
        <JoinClub />
        <Footer />
      </div>
      <Toaster/>
    </div>
  );
}

export default CompletedEvent;
