import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { UserApi } from '../../../Store/api';
import AllEventCard from './AllEventCard';


interface Data {
    _id: string;
  }

function AllEvents() {
    const [data,setData]= useState<Data[]>([])
    useEffect(()=>{
        (async()=>{
            await axios.get(`${UserApi}getAllEvents`).then((response)=>{
                console.log(response);
                setData(response?.data?.data)
            })
        })()
    },[])
    console.log(data);
    
  return (
    <div className="ml-2 ">
    <div className="w-full h-8  flex items-center">
      <h1>All Events</h1>
    </div>
    <div className="w-full h-52 flex  cursor-pointer">
      <div className="w-[95%] h-full  flex">
        {data.map((item, i) => {
          
          return(
            <AllEventCard key={i} value={item} />
          )
        })}
      </div>
      <div className="w-[5%] h-full flex  justify-center items-center">
        <div
          className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <img className="w-4" src="/icons/right_arrow.png" alt="right arrow" />
        </div>
      </div>
    </div>
  </div>
  )
}

export default AllEvents
