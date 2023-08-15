import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props{
    event: {
        primaryImage:string;
        eventName:string;
        eventType:string;
        location:string;
        subName:string;
        fee:number;
        date:string;
        _id:string
    }
}

function EventCard({event}:Props) {
    const navigate=useNavigate()
  return (
    <div className='w-full h-32  mt-2 flex justify-center' onClick={()=>navigate(`/eventSinglePage/${event?._id}`)}>
        <div className='w-[95%] border shadow-lg h-[95%] flex'>

       
        <div className='w-[33.2%] h-full flex items-center justify-center'>
            <img className='h-[90%] rounded-md' src={event?.primaryImage} alt="" />
        </div>
        <div className='w-[33.2%] h-[100%]  overflow-hidden flex  flex-col items-center justify-center'>
            <p className='text-sm'>Name: {event?.eventName}</p>
            <p className='text-sm'>Type: {event?.subName}</p>
            <p className='text-sm'>Type: {event?.eventType}</p>
            <p className='text-sm'>Location: {event?.location}</p>
            <p className='text-sm'>Amount Paid: {event?.fee}</p>
            <p className='text-sm'>Date: {event?.date}</p>
        </div>
        {/* <div className='w-[33.2%] h-full bg-red-500'></div> */}
        </div>
    </div>
  )
}

export default EventCard
