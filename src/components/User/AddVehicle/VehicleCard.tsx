import React from 'react'

interface Vehicle{
    vehicle:{
        _id:string;
        images:string[];
        vehicleName:string;
        vehicleNumber:string;
        vehicleType:string;
        wheelCount:number;
        ownerName:string;
        fuelType:string;
    }
}

function VehicleCard({vehicle}:Vehicle) {
    console.log(vehicle,"ddddddd");
    
  return (
    <div className='w-[95%] h-36 rounded-md bg-white flex border mb-2'>
        <div className='w-[60%] h-full bg-transparent rounded-s-md flex items-center justify-center'>
            <img className='rounded-md w-48' src={`${import.meta.env.VITE_VEHICLE_API}${vehicle?.images[0]}`} alt="" />
        </div>
        <div className='w-[40%] h-full bg-transparent  rounded-e-md ps-1 flex flex-col justify-center'>
            <p className='text-xs'>Name: {vehicle?.vehicleName}</p>
            <p className='text-xs'>Number: {vehicle?.vehicleNumber}</p>
            <p className='text-xs'>Owner: {vehicle?.ownerName}</p>
            <p className='text-xs'>Type: {vehicle?.vehicleType}</p>
            <p className='text-xs'>Fuel: {vehicle?.fuelType}</p>
            <p className='text-xs'>Wheels: {vehicle?.wheelCount}</p>
        </div>
    </div>
  )
}

export default VehicleCard
