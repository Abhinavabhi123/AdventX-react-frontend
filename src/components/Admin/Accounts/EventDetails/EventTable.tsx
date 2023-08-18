import { useEffect, useState } from "react";
import AdminAxios from "../../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../../ToastMessage/Toast";
import { useNavigate } from "react-router-dom";

interface Data {
  eventName: string;
  fee: number;
  participants: string[];
}

function EventTable() {
  const navigate = useNavigate()
  const [data, setData] = useState<Data[]>([
    {
      eventName: "",
      fee: 0,
      participants: [],
    },
  ]);
  useEffect(() => {
    (async () => {
      await AdminAxios.get("eventEarnings")
        .then((response) => {
          if (response?.data?.status === 200) {
            setData(response?.data?.eventData);
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
    <div className="w-4/5 h-[90%] rounded-md ">
      <div className=" border border-gray-400 rounded-md w-full h-full over overflow-y-scroll">
        <table className="w-full h-full">
          <thead className="w-full text-center h-10 bg-slate-300">
            <tr className="">
              <td>Event Name</td>
              <td>Earnings</td>
              <td>Cost</td>
            </tr>
          </thead>
          <tbody className="">
            {data.map((item, i) => {
              return (
                <tr
                  key={i}
                  className={`max-h-5 text-center ${
                    i % 2 === 0 ? "" : "bg-slate-200"
                  }`}
                >
                  <td className="">{item?.eventName}</td>
                  <td className="">{item?.fee * item.participants.length}</td>
                  <td className="">No cost</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventTable;
