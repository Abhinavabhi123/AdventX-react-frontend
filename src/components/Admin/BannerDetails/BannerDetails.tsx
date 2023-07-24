import React, { useEffect, useState } from "react";
import AdminAxios from "../../../Store/Axios/AdminConfig";

function BannerDetails() {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    (async () => {
      await AdminAxios.get("banners").then((response) => {
        console.log(response);
        if (response?.data?.status === 200) {
          setBannerData(response?.data?.bannerData);
        }
      });
    })();
  }, []);

  return (
    <div className="w-[70rem] h-[47rem] bg-blue-400 ">
      <table className=" w-full">
        <thead className="w-full ">
          <tr>
            <th className="w-10 bg-green-400">Si.No</th>
            <th>Image</th>
            <th>Title</th>
            <th>Sub title</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default BannerDetails;
