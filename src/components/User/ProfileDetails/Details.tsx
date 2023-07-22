import React, { useContext, useEffect } from "react";

function Details({ data }: any) {
  const {
    email,
    firstName,
    lastName,
    mobile,
    address,
  }: {
    email: string;
    firstName: string;
    lastName: string;
    mobile: number;
    address: { [key: string]: any } | undefined;
  } = data;
  console.log(data,"data");
  
  

  return (
    <div className="w-[95%] h-[85%]">
      {/* top section */}
      <div className="w-full h-36  border-b border-gray-400">
        <div className="w-full h-10 flex items-center ps-5">
          <p>Personal Details:- </p>
        </div>
        <div className="flex justify-between h-[6.5rem]">
          <div className="w-[50%] h-full bg-transparent flex flex-col ps-5 pt-5">
            <p>Name:- {`${firstName} ${lastName}`}</p>
            <p className="mt-2">Mobile No:- {mobile}</p>
          </div>
          <div className="w-[50%]  h-full bg-transparent">
            <p className="pt-5 ps-5">Email:- {email}</p>
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className="w-full h-[23.5rem] flex ">
        <div className="w-full">
          <div className="w-full h-[10%] flex items-center ps-5">
            <p>Address:-</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-[52rem] h-[13rem] ps-5 bg-white rounded-md border-2 border-dotted border-gray-500">
              <p className="text-sm pt-2">House Name: {address?.houseName===undefined ? "______":address?.houseName}</p>
              <p className="text-sm pt-2">Locality: {address?.locality===undefined ? "______":address?.locality}</p>
              <p className="text-sm pt-2">Area:  {address?.area===undefined ? "______":address?.area}</p>
              <p className="text-sm pt-2">District:  {address?.district===undefined ? "______":address?.district}</p>
              <p className="text-sm pt-2">State:  {address?.state===undefined ? "______":address?.state}</p>
              <p className="text-sm pt-2">ZIP code:  {address?.zipCode===undefined ? "______":address?.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
