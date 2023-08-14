import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';

import AdminAxios from "../../../Store/Axios/AdminConfig";
interface Values {
  value: any;
  i: number;
  setDeleted:React.Dispatch<React.SetStateAction<boolean>>;
  deleted:boolean
}
const CommunityRow = (props: Values) => {
  console.log(props, "values");

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const {
    _id,
    communityName,
    members,
    status,
    createdAt,
    logo,
  }: {
    _id: string;
    communityName: string;
    members: any;
    status: any;
    createdAt: string;
    logo: string;
  } = props.value;
  const setDeleted= props.setDeleted
  const deleted = props.deleted
  const i = props.i;
  const memberCount = members.length;

  if (logo == undefined) {
    setOpen(false);
  }
  const deleteCommunity = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this community",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result)=>{
      if(result.isConfirmed){

        await AdminAxios.delete(`deleteCommunity/${_id}`).then((response)=>{
          if(response.data.status ===200){
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
              ).then((result)=>{
                console.log(result,"result");
                deleted ?setDeleted(false):setDeleted(true)
              })
            }
          })
        } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your file is safe :)', 'error');
        }
    })
    console.log("deleting");
  };

  return (
    <>
     
        <tr className="h-12 border-y-2 border-gray-600">
          <td className="text-center p-0 m-0">{i}</td>
          <td className="text-center p-0 m-0 w-full h-full flex justify-center items-center">
            {!open ? (
              <div className="w-10 h-10 rounded-full bg-red-400"></div>
            ) : (
              <div className="w-10 h-10 rounded-full">
                <img
                  className="w-10 h-10 rounded-full"
                  src={`${import.meta.env.VITE_IMAGE_API}${logo}`}
                  alt="logo"
                />
              </div>
            )}
          </td>
          <td className="text-center p-0 m-0">{communityName}</td>
          <td className="text-center p-0 m-0">{memberCount}</td>
          <td className="text-center p-0 m-0">{status}</td>
          <td className="text-center p-0 m-0 text-sm">{createdAt}</td>
          <td className="text-center">
            <button className=" w-5 h-5 mr-3 ">
              {/* <Link to={`/community/edit-community/${_id}`}> */}
              <img
                src="/icons/edit.png"
                alt="edit"
                onClick={() =>
                  navigate(`/admin/community/edit-community/${_id}`)
                }
              />

              {/* </Link> */}
            </button>
            <button className=" w-5 h-5 opacity-75">
              <img
                src="/icons/delete.png"
                alt="delete"
                onClick={deleteCommunity}
              />
            </button>
          </td>
        </tr>
      
    </>
  );
};

export default CommunityRow;
