import React from "react";

import { useParams } from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import HomeBtn from "../Button/HomeBtn";
import EventMainTop from "./EventMainTop";
import EventDetails from "./EventDetails";
import EventForm from "./EventForm";
import Rules from "./Rules";


function CompletedEvent() {



  const { id } = useParams();

  

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
        <EventDetails id={id} />
        <EventForm />
        <Rules />
      </div>
    </div>
  );
}

export default CompletedEvent;
