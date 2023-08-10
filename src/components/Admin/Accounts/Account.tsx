import { useEffect } from "react";
import AmountCard from "./AmountCard";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { response } from "express";

function Account() {

  useEffect(()=>{
    (async()=>{
      await AdminAxios.get('accounts').then((response)=>{
        console.log(response);
        
      }).catch((error)=>{
        console.log(error);
        
      })
    })()
  },[])

  return (
    <div className="w-full h-full bg--400">
      <div className="w-full h-48 flex justify-center items-center">
        <div className="w-[80%] h-[90%] bg-green-500 flex  items-center justify-evenly">
          <AmountCard />
          <AmountCard />
          <AmountCard />
          <AmountCard />
        </div>
      </div>
    </div>
  );
}

export default Account;
