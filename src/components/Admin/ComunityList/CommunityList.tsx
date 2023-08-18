import React, { useEffect, useState } from "react";
import CommunityRow from "./CommunityRow";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../ToastMessage/Toast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function CommunityList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      await AdminAxios.get(`communities`)
        .then((response) => {
          setData(response.data.community);
        })
        .catch((error) => {
          console.error(error);
          if (error?.response?.data?.status !== 500) {
            showErrorToast("something wrong");
          } else {
            navigate("/admin/error500");
          }
        });
    })();
  }, [deleted]);

  return (
    <div className="">
      <table className="w-full h-full">
        <thead className="h-10">
          <tr>
            <th className="w-[4rem]">Si.No</th>
            <th className="w-[10.51rem]">Image</th>
            <th className="w-[10.51rem]">Name</th>
            <th className="w-[10.51rem]">Members</th>
            <th className="w-[10.51rem]">Status</th>
            <th className="w-[10.51rem]">CreatedAt</th>
            <th className="w-[10.51rem]">Actions</th>
          </tr>
        </thead>

        <tbody className="">
          {data.length > 0 ? (
            data.map((item, i) => {
              return (
                <CommunityRow
                  key={i}
                  value={item}
                  i={++i}
                  setDeleted={setDeleted}
                  deleted={deleted}
                />
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <Toaster/>
    </div>
  );
}

export default CommunityList;
