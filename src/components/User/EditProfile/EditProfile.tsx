import React from "react";
import EditPersonal from "./EditPersonal";


function EditProfile() {
  return (
    <div className="w-full ">
      <div className="w-full h-10  flex items-center ps-5">
        <p>Edit Profile</p>
      </div>
      <div className="w-full h-[50rem] mb-5 flex border border-black">
        <EditPersonal/>
        <div className="w-[50%] h-full bg-violet-400">
          <div className="w-full h-10 flex items-center ps-5">
            Address Details:
          </div>
        Ed</div>
      </div>
    </div>
  );
}

export default EditProfile;