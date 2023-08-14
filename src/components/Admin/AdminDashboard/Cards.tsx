import React from "react";
interface Props {
  data: {
    image: string;
    name: string;
    amount: number;
    subText?: string;
    count?: number;
    size:number
  };
}

function Cards({ data }: Props) {
  const { image, name, amount, subText, count=0,size} = data;
  return (
    <div className="w-[20%] h-[80%] rounded-lg bg-white border-2 shadow-2xl">
      <div className="w-full h-[25%] bg-slate-200 rounded-t-lg flex items-center justify-around">
        <p>{name}</p>
        <img className={`w-${size}`} src={image} alt="image" />
      </div>
      <div className="w-full h-[50%]  flex justify-center items-center">
        <p className="text-2xl">{amount}</p>
      </div>
      <div className="w-full h-[25%] bg-slate-200 rounded-b-lg flex items-center justify-center">
        {subText && count>=0 && (
          <div className="w-[90%] h-[90%] flex items-center">
            <p className="w-fit text-gray-600 ">{subText}</p>
            <p className="ms-4 text-gray-600">{count}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;
