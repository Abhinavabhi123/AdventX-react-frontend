import React,{useState} from "react";
import { ImgApi } from "../../../Store/api";
interface Values {
  value: any;
  i: number;
}
const CommunityRow = (props: Values) => {
  const [open,setOpen]=useState(false)
  const {
    communityName,
    members,
    status,
    createdAt,
    logo,
  }: {
    communityName: string;
    members: any;
    status: any;
    createdAt: string;
    logo: string;
  } = props.value;
  const i = props.i;
  const memberCount = members.length;
  // if(logo){
  //   setOpen(true)
  // }

  return (
    <tr className="h-12 border-y-2 border-gray-600">
      <td className="text-center p-0 m-0">{i}</td>
      <td className="text-center p-0 m-0 w-full h-full flex justify-center items-center">
        {open ? (
          <div className="w-10 h-10 rounded-full bg-red-400"></div>
        ) : (
          <div className="w-10 h-10 rounded-full">
            <img className="w-10 h-10 rounded-full" src={`${ImgApi}${logo}`} alt="logo" />
          </div>
        )}
      </td>
      <td className="text-center p-0 m-0">{communityName}</td>
      <td className="text-center p-0 m-0">{memberCount}</td>
      <td className="text-center p-0 m-0">{status}</td>
      <td className="text-center p-0 m-0 text-sm">{createdAt}</td>
      <td className="text-center">
        <button className=" w-5 h-5 mr-3 ">
          <img src="/icons/edit.png" alt="edit" />
        </button>
        <button className=" w-5 h-5 opacity-75">
          <img src="/icons/delete.png" alt="delete" />
        </button>
      </td>
    </tr>
  );
};

export default CommunityRow;
