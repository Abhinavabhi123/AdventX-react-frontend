import  { useEffect, useState } from "react";
import AdminAxios from "../../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";
import UserRow from "./UserRow";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardUsers() {
  const [userData,setUserData]=useState({
    userData:0,
    primeMembers:0,
    events:0,
    communityCount:0
  })
  const data = {
    labels: ["Users", "Prime", "Events", "Communities"],
    datasets: [
      {
        label: "Data", 
        data: [userData?.userData, userData?.primeMembers, userData?.events, userData?.communityCount], 
        backgroundColor: [
          "rgb(255, 0, 55,0.7)",
          "rgb(23, 148, 232,0.7)",
          "rgb(255, 183, 0,0.8)",
          "rgb(51, 204, 51)",
        ],
        borderColor: [
          "rgb(0, 0, 0, 0.5)",
          "rgb(0, 0, 0, 0.5)",
          "rgb(0, 0, 0, 0.5)",
          "rgb(0, 0, 0, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [datas, setData] = useState([]);

  useEffect(() => {
    (async () => {
      await AdminAxios.get("primeMembers")
        .then((response) => {
          if (response?.data?.status === 200) {
            setData(response?.data?.userData);
          }
        })
        .catch((error) => {
          showErrorToast(error?.response?.data?.error);
        });
        await AdminAxios.get("dashboardCardValues").then((response)=>{
          if(response?.data?.status===200){
            setUserData(response?.data)
          }
        }).catch((error)=>{
          showErrorToast(error?.response?.data?.message)
        })
    })();
  }, []);
  
  
  return (
    <div className="w-full h-[30rem] bg-transparent flex mb-10">
      <div className="w-[40%] h-full  flex justify-center items-center">
      <Pie data={data} />
      </div>
      <div className="w-[60%] h-full bg-transparent  flex flex-col justify-center items-center">
        <div className="w-[80%] h-10 bg-blue-400 flex items-center ps-4">
          <p>Prime Members</p>
        </div>
        <div className="w-[80%] h-[95%] overflow-y-scroll over">
          <div className="w-full h-full border border-gray-400 overflow-y-scroll over">
            <table className="w-full ">
              <thead className="h-10 bg-orange-500">
                <tr>
                  <th className="w-[33.3%] h-full ">Name</th>
                  <th className="w-[33.3%] h-full ">Contributions</th>
                  <th className="w-[33.3%] h-full ">Communities</th>
                </tr>
              </thead>
              <tbody className="">
                {datas.map((item, i) => {
                  return <UserRow key={i} i={i} data={item} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardUsers;
