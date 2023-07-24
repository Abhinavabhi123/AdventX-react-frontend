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
    <div className="w-[95%] h-[95%] ">
      <table className="w-full h-full bg-pink-400 rounded-lg">
        <thead className="h-10">
          <tr className="">
            <th className="w-10">Si.No:</th>
            <th className="w-10">Image</th>
            <th className="w-10">Title</th>
            <th className="w-10">Sub title</th>
            <th className="w-10">Actions</th>
          </tr>
        </thead>
        {/* <div className="w-full h-5 bg"> */}
        <tbody className="">
          {bannerData.map((banner, i) => {
            return (
              <tr key={i} className="h-12">
                {/* <td className="">{i + 1}</td>
                <td className="">ngjkn</td>
                <td className="">{banner?.title}</td>
                <td className="">gdg</td>
                <td className="">gsda</td> */}
                ooo
              </tr>
            );
          })}
        </tbody>
        {/* </div> */}
      </table>
    </div>
  );
}

export default BannerDetails;
