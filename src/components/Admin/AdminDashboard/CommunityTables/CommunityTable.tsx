import { useState, useEffect } from "react";
import AdminAxios from "../../../../Store/Axios/AdminConfig";
import TableRow from "./TableRow";
import { showErrorToast } from "../../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CommunityTable() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      await AdminAxios.get(`communities`).then((response) => {
        setData(response.data.community);
      }).catch((error)=>{
        console.error(error);
        if(error?.response?.data?.status!==500){
          showErrorToast("something wrong")
        }else{
          navigate("/admin/error500")
        }
      })
    })();
  }, []);

  return (
    <div className="w-full h-[30rem] mt-8 mb-20 rounded-md flex justify-center">
      <div className="w-[90%] h-full  rounded-md flex justify-center overflow-y-scroll over">
        <table className=" w-full h-full rounded-t-md">
          <thead className="h-10">
            <tr className="bg-blue-500 rounded-t-md">
              <th className="w-[15%]">#</th>
              <th className="w-[30%]">Community Name</th>
              <th className="w-[5%]">Hours</th>
              <th className="w-[20%]">Created At</th>
              <th className="w-[10%]">Members</th>
              <th className="w-[20%]">Status</th>
            </tr>
          </thead>
          <tbody className="rounded-b-md">
            {data.map((item, i) => {
              return <TableRow key={i} data={item} />;
            })}
          </tbody>
        </table>
      </div>
      <Toaster/>
    </div>
  );
}

export default CommunityTable;
