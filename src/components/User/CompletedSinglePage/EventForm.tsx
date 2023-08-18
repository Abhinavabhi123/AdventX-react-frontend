import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserAxios from "../../../Store/Axios/UserConfig";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

interface User {
  firstName: string;
  lastName: string;
  mobile: number;
  license: {
    licenseNumber: string;
  };
  vehicles: {
    vehicleId: string;
  };
  eventParticipation: [
    {
      eventId: string;
      confirmed: string;
    }
  ];
}

interface Props {
  amount: number;
  eventName: string;
  eventId: string;
}

function EventForm({ amount, eventName, eventId }: Props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>({
    firstName: "",
    lastName: "",
    mobile: 0,
    license: {
      licenseNumber: "",
    },
    vehicles: {
      vehicleId: "",
    },
    eventParticipation: [
      {
        eventId: "",
        confirmed: "",
      },
    ],
  });
  const [vehicleData, setVehicleData] = useState([
    {
      vehicleName: "",
      vehicleNumber: "",
      _id: "",
    },
  ]);
  const vehicleRef = useRef<HTMLSelectElement>(null);
  const licenseRef = useRef<HTMLSelectElement>(null);
  const [showBtn, setShowBtn] = useState<boolean>(true);
  const userId: string = useSelector((state: any) => state?.user?._id);
  const isPrime = useSelector((state: any) => state.user.is_prime);
  useEffect(() => {
    (async () => {
      if (userId) {
        await UserAxios.get(`/getUserProfile/${userId}`)
          .then((response) => {
            if (response?.data?.status === 200) {
              setUserData(response?.data?.userData);
            }
          })
          .catch((error) => {
            console.error(error);
            navigate("/error500");
          });
        await UserAxios.get(`/getAllVehicles/${userId}`)
          .then((response) => {
            if (response?.data?.status === 200) {
              setVehicleData(response?.data?.vehicleData);
            }
          })
          .catch((error) => {
            console.error(error);
            if (error?.response?.data?.status !== 500) {
              showErrorToast(error?.response?.data?.message);
            } else {
              navigate("/error500");
            }
          });
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (userData && eventId) {
      for (const event of userData.eventParticipation) {
        if (event.eventId === eventId && event.confirmed === "confirmed") {
          setShowBtn(false);
          break;
        }
      }
    }
  }, [userData, eventId]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const license = licenseRef?.current?.value;
      const vehicle = vehicleRef?.current?.value;

      if (license == undefined || vehicle == undefined) {
        return;
      }
      await UserAxios.post("/eventPayment", {
        userId,
        amount,
        eventName,
        eventId,
        license,
        vehicle,
      })
        .then((response) => {
          if (response?.data?.url) {
            const url = response?.data?.url;
            window.location = url;
          }
        })
        .catch((error) => {
          console.error(error);
          if (error?.response?.data?.status !== 500) {
            showErrorToast(error?.response?.data?.error);
          } else {
            navigate("/error500");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[23rem]  flex justify-center items-center bg-gray-100">
      <div className="w-[90%] h-[90%]   ">
        <div className="w-full h-[13%] flex items-center ps-5">
          Participation form
        </div>
        <div className="w-full h-[87%] ">
          <form className=" w-full h-full " onSubmit={submitForm}>
            <div className="w-full h-[80%]  flex">
              {/* main div 1 */}
              <div className="w-[33.3%] h-full  flex flex-col justify-center items-center gap-4">
                {/* first div  */}
                <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                  <p className="text-xs ml-5">
                    First Name
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <input
                    type="text"
                    value={userData?.firstName}
                    placeholder="Community Name"
                    className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                    readOnly
                  />
                </div>
                {/* second div */}
                <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                  <p className="text-xs ml-5">
                    Choose Vehicle
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <select
                    ref={vehicleRef}
                    className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                  >
                    {vehicleData.map((vehicle, i) => {
                      return (
                        <option
                          key={i}
                          value={vehicle?._id}
                        >{`${vehicle?.vehicleName}-${vehicle?.vehicleNumber}`}</option>
                      );
                    })}
                  </select>
                  {vehicleData.length === 0 && (
                    <p className="text-xs ml-5 text-red-500">
                      Add your Vehicle
                    </p>
                  )}
                </div>
              </div>
              {/* main div 2 */}
              <div className="w-[33.3%] h-full flex flex-col justify-center items-center gap-4">
                <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                  <p className="text-xs ml-5">
                    Last Name
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <input
                    type="text"
                    value={userData?.lastName}
                    className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                    readOnly
                  />
                </div>
                {/* second div */}
                <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                  <p className="text-xs ml-5">
                    license
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <select
                    ref={licenseRef}
                    className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                  >
                    <option
                      className="text-base"
                      value={userData?.license?.licenseNumber}
                    >
                      {userData?.license?.licenseNumber}
                    </option>
                  </select>
                  {!userData?.license && (
                    <p className="text-xs ml-5 text-red-500">
                      Add your license
                    </p>
                  )}
                </div>
              </div>
              {/* main div 3 */}
              <div className="w-[33.3%] h-full  flex flex-col justify-center items-center gap-4">
                <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                  <p className="text-xs ml-5">
                    Mobile
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <input
                    type="text"
                    placeholder="Community Name"
                    value={userData?.mobile}
                    className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                    readOnly
                  />
                </div>
                {/* second div */}
                <div className="w-[18rem] flex flex-col h-14  m-0 justify-center invisible"></div>
              </div>
            </div>
            <div className="w-full h-[20%] flex flex-col items-end pe-5">
              {showBtn ? (
                <div className="w-52 h-6  flex justify-between">
                  <button
                    type="reset"
                    className="w-20 h-6 bg-red-400 rounded-md"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  {isPrime ? (
                    <button
                      type="submit"
                      className="w-28 h-6 bg-green-500 rounded-md"
                    >
                      Pay & Submit
                    </button>
                  ) : (
                    <button
                      className="w-28 h-6 bg-green-500 rounded-md"
                      onClick={() => navigate("/subscribe")}
                    >
                      Subscribe
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-52 h-8 rounded-md flex justify-center items-center bg-opacity-50 bg-green-400">
                  <p className="text-green-900">successfully participated</p>
                </div>
              )}
              {isPrime !== true && (
                <p className="text-xs text-yellow-500 hover:text-red-500 cursor-default mt-2">
                  Get the membership and you can add license and vehicle details{" "}
                </p>
              )}
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default EventForm;
