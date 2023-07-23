import React from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";
import NavBar from "../../components/User/NavBar/Navbar";

function Subscription() {
  const data = [
    { value: "View all events", free: "yes" },
    { value: "Watch video and images", free: "yes" },
    { value: "Access to community", free: "No" },
    { value: "Event participation", free: "No" },
    { value: "Plus member tag", free: "No" },
    { value: "Became part of the event", free: "No" },
    { value: "Community Chat", free: "No" },
    { value: "Add Vehicle", free: "No" },
    { value: "Add License", free: "No" },
    { value: "Create blog", free: "No", feature: "yes" },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="subImage w-screen h-[50rem]">
        <div className="w-[50%] h-full  flex justify-center items-center">
          <div className="w-[80%] h-96 bg-white rounded-md bg-opacity-30 mt-[5rem]">
            <div className="w-full h-24 flex justify-center items-center">
              <img
                className="w-20 h-20"
                src="/An Off-road logo bw4 .png"
                alt="logo"
              />
            </div>
            <div className="w-full h-40  flex flex-col justify-evenly items-center">
              <h1 className="text-xl">Then only $24.38 for Membership</h1>
              <button
                className="w-36 h-8 bg-green-500 rounded-lg text-xs"
                onClick={() => navigate("/subscribe/payment")}
              >
                Get Membership
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full  flex justify-center items-center ">
          <div className="h-[60%] w-80 bg-white rounded-md flex justify-center items-center">
            <div className="w-[90%] h-[90%]">
              <table className=" w-full h-[20rem]">
                <thead>
                  <th className="text-xs font-semibold">Features</th>
                  <th className="text-xs font-semibold">Free</th>
                  <th className="text-xs font-semibold">Plus</th>
                </thead>
                <tbody>
                  {data.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className="text-xs pl-5">{item?.value}</td>
                        <td className="pl-2">
                          {item?.free === "yes" && (
                            <img src="/icons/done.png" alt="done" />
                          )}
                        </td>
                        <td className="pl-2">
                          {item?.feature !== "yes" ? (
                            <img src="/icons/done.png" alt="done" />
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
