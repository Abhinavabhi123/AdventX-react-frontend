import React,{useState} from "react";
import EditPersonal from "./EditPersonal";
import EditAddress from "./EditAddress";


function EditProfile() {
  const [modified,setModified]=useState<boolean>(false)
  return (
    <div className="w-full ">
      <div className="w-full h-10  flex items-center ps-5 ">
        <p>Edit Profile</p>
      </div>
      <div className="w-full mb-5 mt-5 flex ">
        <EditPersonal/>
        <EditAddress />
      </div>
    </div>
  );
}

export default EditProfile;
