import React from "react";

interface Value {
  value: {
    image: string;
    text: string;
    amount: number;
  };
}

function AmountCard({ value }: Value) {
  return (
    <div className="w-[25%] border border-gray-400 h-[80%] rounded-md bg-white">
      <div className="w-full h-[30%] flex items-center justify-around rounded-t-md  ">
        <p className="font-serif font-semibold">{value?.text}</p>
        <div className="w-8 h-8 bg-gray-200 rounded-md flex justify-center items-center">
          <img className="w-6" src={value?.image} alt="image" />
        </div>
      </div>
      <div className="w-full h-[70%] rounded-b-md flex justify-center items-center">
        <p className="text-2xl font-semibold ">{value?.amount} {value?.text!=="Members"?"/-":""}</p>
      </div>
    </div>
  );
}

export default AmountCard;
