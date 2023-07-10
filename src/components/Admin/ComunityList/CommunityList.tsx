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
            <th>Si.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Members</th>
            <th>Status</th>
            <th>CreatedAt</th>
            <th>Actions</th>
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
