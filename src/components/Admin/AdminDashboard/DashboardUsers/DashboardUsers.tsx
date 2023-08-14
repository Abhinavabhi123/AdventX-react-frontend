import React, { useEffect, useState } from "react";
import AdminAxios from "../../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";
import UserRow from "./UserRow";

function DashboardUsers() {
  const [data, setData] = useState([]);
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
    })();
  }, []);
  return (
    <div className="w-full h-[30rem] bg-transparent flex mb-10">
      <div className="w-[40%] h-full bg-green-500 flex justify-center items-center">
        data chart
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
                {data.map((item, i) => {
                  return <UserRow key={i} i={i} data={item} />
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
