import React, { useEffect, useState } from "react";
import axios from "axios";
import ActiveEventCard from "./ActiveEventCard";
import searchGif from "/gifs/search-not-found.gif";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

function AllActivities() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([
    {
      _id: "",
      primaryImage: "",
      eventName: "",
      eventType: "",
      location: "",
    },
  ]);
  const [searchedData, setSearchedData] = useState([
    {
      _id: "",
      primaryImage: "",
      eventName: "",
      eventType: "",
      location: "",
    },
  ]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${import.meta.env.VITE_USER_API}getUserAllEvents`)
        .then((response) => {
          if (response?.data.status === 200) {
            setEventData(response?.data?.eventData);
            setSearchedData(response?.data?.eventData);
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
  }, []);
  const submitSearch = () => {
    const input = document.getElementById("searchInput") as HTMLInputElement;
    input.value = "";
    setEventData(searchedData);
  };

  function searchData(e: React.ChangeEvent<HTMLInputElement>) {
    const result = searchedData.filter((data) => {
      return data?.eventName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setEventData(result);
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-14  flex justify-center items-center ">
        {/* <div className="w-[25rem] h-9  border border-gray-400 rounded-full flex items-center ps-1 pe-1"> */}
        <div
          className="w-[25rem] h-9  border border-gray-400 rounded-full flex items-center ps-1 pe-1"
          // onSubmit={submitSearch}
        >
          <button className="w-7 h-7 bg-white rounded-full flex justify-center items-center">
            <img src="/icons/search.png" alt="search" className="w-5" />
          </button>
          <input
            className="w-[21rem] h-8  me-1 text-xs ps-3 focus:outline-none  focus:border-transparent"
            type="search"
            id="searchInput"
            placeholder="Search Event"
            onChange={(e) => {
              searchData(e);
            }}
          />
          <button
            type="reset"
            className="w-7 h-7 bg-slate-300 rounded-full flex justify-center items-center hover:rotate-90 transition-transform duration-300"
            onClick={submitSearch}
          >
            <img src="/icons/closeBtn.png" alt="arrow" className="w-4" />
          </button>
        </div>
        {/* </div> */}
      </div>
      <div className="w-full min-h-full max-h-fit bg-transparent flex justify-center mb-28">
        {eventData.length !== 0 ? (
          <div className="w-[80%] h-full bg-transparent grid grid-cols-4 gap-6 md:grid-cols-4  sm:grid-cols-2 ">
            {eventData.map((event, i) => {
              return <ActiveEventCard key={i} event={event} />;
            })}
          </div>
        ) : (
          <div className="w-[100vw] h-[100vh]  flex justify-center items-center">
            <img className="w-96 h-80" src={searchGif} alt="empty data" />
          </div>
        )}
      </div>
      <Toaster/>
    </div>
  );
}

export default AllActivities;
