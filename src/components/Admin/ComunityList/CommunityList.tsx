import React, { useEffect, useState } from "react";
import CommunityRow from "./CommunityRow";
import axios from "axios";
import { AdminApi } from "../../../Store/api";

function CommunityList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      await axios.get(`${AdminApi}communities`).then((response) => {
        console.log(response.data);
        setData(response.data.community);
      });
    })();
  }, []);

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
        {/* <div className="w-full h-full bg-red-400"> */}
          <tbody className="">
        {data.length > 0 ? 
            data.map((item, i) => {
              console.log(item, "items");

              return <CommunityRow key={i} value={item} i={++i} />;
            })
        :(
            <>
            {/* <tr>
              <td>No records Found</td>
            </tr> */}
            </>
        )}
          </tbody>
       
      
        {/* </div> */}
      </table>
    </div>
  );
}

export default CommunityList;
