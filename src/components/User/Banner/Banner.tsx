import axios from "axios";
import React, { useEffect, useState } from "react";
// import { UserApi } from "../../../Store/api";
interface Banner {
  _id: string;
  image: string;
  status: boolean;
  subTitle: string;
  title: string;
  updatedAt: string;
}

function Banner() {
  const [bannerData, setBannerData] = useState<Banner[]>([
    {
      _id: "",
      image: "",
      status: false,
      subTitle: "",
      title: "",
      updatedAt: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      await axios
        .get(`${import.meta.env.VITE_USER_API}getBanner`)
        .then((response) => {
          if (response?.data?.status === 200) {
            setBannerData(response?.data?.bannerData);
          }
        });
    })();
  }, [])
  
  const id = Math.floor(Math.random() * bannerData.length);

  return (
    <div className="w-[92rem] h-[43rem]">
      <div className=" w-full h-full ">
        <img
          className="w-[92rem] h-[43rem] object-cover absolute "
          src={`${import.meta.env.VITE_BANNER_API}${bannerData[id].image}`}
          alt="banner"
        />
        <div className=" w-[28rem] h-48 relative items-center flex flex-col justify-center">
          <p className="text-[2.5rem] ms-5 font-semibold text-white relative">
            {bannerData[id].title}
          </p>
          <p className="text-2xl font-serif text-white ">{bannerData[id].subTitle}</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
