import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserApi } from "../../../Store/api";
interface Banner{
  _id:string;
  image:string;
  status:boolean;
  subTitle:string;
  title:string;
  updatedAt:string;

}

function Banner() {
  const [bannerData, setBannerData] = useState<Banner>({
    _id:"",
    image:'',
    status:false,
    subTitle:"",
    title:"",
    updatedAt:""
  });
  
  useEffect(() => {
    (async () => {
      await axios.get(`${UserApi}getBanner`).then((response) => {
        if (response?.data?.status === 200) {
          setBannerData(response?.data?.bannerData);
        }
      });
    })();
  }, []);
  console.log(bannerData,"lololo");
  
//   const array:any[]=[]
//   for(const key:number in bannerData){
// console.log(bannerData[key]);
//   }
  
  // const banner = bannerData[Math.random(bannerData.length)]
  
  return (
    <>
      <div className=" w-full h-full relative">
        <img
          className="w-full h-full object-cover "
          src="https://images.unsplash.com/photo-1579271723430-d600366f032f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2Zmcm9hZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="banner"
        />
      </div>
    </>
  );
}

export default Banner;
