import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import Swal from "sweetalert2";
import { deleteImage } from "../../../Store/Firebase/Firebase";
import changeLogo from "/icons/changeLogo.png"
interface Props {
  value: string;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  deleted: boolean;
}
interface Value {
  eventName: string;
  description: string;
  date: string;
  eventType: string;
  fee: string;
  participants: [string];
  primaryImage: string;
  location: string;
  status: string;
  is_completed: boolean;
}

function EventCard({ value, deleted, setDeleted }: Props) {
  const navigate = useNavigate();

  const [data, setData] = useState<Value>({
    eventName: "",
    description: "",
    date: "",
    eventType: "",
    fee: "",
    participants: [""],
    primaryImage: "",
    location: "",
    status: "",
    is_completed: false,
  });
  useEffect(() => {
    (async () => {
      await AdminAxios.get(`getEventDetails`, {
        params: {
          id: value,
        },
      })
        .then((response) => {
          setData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  const {
    eventName,
    date,
    eventType,
    fee,
    participants,
    primaryImage,
    location,
    status,
    is_completed,
  } = data;
  
  const count = participants.length;

  const deleteEvent = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't to delete this community",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await AdminAxios.delete(`deleteEvent`, {
            params: {
              id: value,
            },
          })
            .then(async (response) => {
              console.log(response);

              if (response.data.status === 200) {
                await deleteImage(response?.data?.image);
                Swal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                ).then(() => {
                  deleted ? setDeleted(false) : setDeleted(true);
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (
          result.isDismissed &&
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire("Cancelled", "Your file is safe :)", "error");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[95%] h-36 flex bg-slate-300 rounded-md mt-3">
      <div className="w-[20%] h-full flex justify-center items-center ">
        <div className="w-[90%] h-[90%]  rounded-md flex justify-center items-center">
          <img
            src={primaryImage}
            alt="event image"
            className="w-full h-full text-xs rounded-md"
          />
        </div>
      </div>
      <div className="w-[40%]  h-full bg-transparent flex justify-center items-center">
        <div className="w-[95%] h-[90%]  flex flex-col justify-evenly">
          <p className="text-sm ms-2">Event Name:- {eventName}</p>
          <p className="text-sm ms-2">Event Type:- {eventType}</p>
          <p className="text-sm ms-2">Location:- {location}</p>
          <p className="text-sm ms-2">Date:- {date}</p>
          <p className="text-sm ms-2">Total Participation:- {count}</p>
        </div>
      </div>
      <div className="w-[40%]  h-full bg-transparent flex justify-center items-center">
        <div className="w-[95%] h-[90%]  flex">
          <div className="w-[85%] h-full ">
            <p className="text-sm ms-2">Amount:- {fee}</p>
            <p className="text-sm ms-2">Completed:- {is_completed ?"Yes":"No"}</p>
            <p className="text-sm ms-2">Status:- {status}</p>
            <button className="w-32 mt-2 rounded-md text-xs bg-green-300 outline outline-red-200 hover:bg-green-500 flex items-center justify-center gap-2" onClick={()=>navigate(`/admin/completeEvent/${value}`)}>
              Complete Event
              <img className="w-3" src={changeLogo} alt="change" />
            </button>
          </div>
          <div className="w-[15%] h-full flex  flex-col justify-between items-end">
            <img
              src="/icons/edit.1.png"
              alt="editBtn"
              className="w-5 mt-1 cursor-pointer"
              onClick={() => navigate(`/admin/editEvent/${value}`)}
            />
            <img
              src="/icons/delete1.png"
              alt="deleteBtn"
              className="w-4 mb-1 cursor-pointer"
              onClick={deleteEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
