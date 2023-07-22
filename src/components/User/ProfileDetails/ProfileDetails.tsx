import React, { useState, useContext, useEffect } from "react";
import "./ProfileDetails.css";
import Details from "./Details";
import UserIdContext from "../../../Store/Context/UserContext";
import axios from "axios";
import { UserApi } from "../../../Store/api";
import EditProfile from "../EditProfile/EditProfile";
import { useSelector } from "react-redux";

function ProfileDetails() {
  const userId = useContext(UserIdContext);
  const prime = useSelector((state:any)=>state.user.is_prime)
  console.log(prime,"prime");
  
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      if (userId) {
        await axios
          .get(`${UserApi}getUserProfile/${userId?.id}`)
          .then((response) => {
            if (response?.data?.status === 200) {
              setData(response?.data?.userData);
            }
        });
      }
    })();
  }, [userId]);
  

  const [active, setActive] = useState<string>("details");
  const handleActive = (tab: string) => {
    setActive(tab);
  };
  return (
    <>
      <div className="w-full h-11  border-b border-black ">
        <div className="profile_top_bar w-[35rem] h-full flex ps-2 pe-2 justify-between items-center">
          <button
            className={active === "details" ? "btnActive" : ""}
            onClick={handleActive.bind(null, "details")}
          >
            Personal details
          </button>
          <button
            className={active === "edit" ? "btnActive" : ""}
            onClick={handleActive.bind(null, "edit")}
          >
            Edit Profile
          </button>
          <button
            className={active === "vehicles" ? "btnActive" : ""}
            onClick={handleActive.bind(null, "vehicles")}
          >
            About Vehicles
          </button>
          <button
            className={active === "event" ? "btnActive" : ""}
            onClick={handleActive.bind(null, "event")}
          >
            Event Participation
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        {active == "details" && <Details data={data} />}
        {active == "edit" && <EditProfile />}
      </div>
    </>
  );
}

export default ProfileDetails;