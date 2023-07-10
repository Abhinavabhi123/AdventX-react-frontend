import axios from "axios";
import "./CreateCommunity.css";
import {useNavigate} from "react-router-dom"
import { useEffect, useState,ChangeEvent } from "react";
import { AdminApi } from "../../../Store/api";
// import UsersRow from "./UsersRow";

type User = {
  firstName: string;
  _id: string;
};

function CreateCommunity() {
  const navigate =useNavigate()
  const [user, setUser] = useState<User[]>([]);
  const [cName, setCname] = useState("");
  const [status, setStatus] = useState("");
  const [cMembers, setCMembers] = useState<{ _id: string }[]>([]);
  const [image, setImage] = useState<File | string>("")

  const handleCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;

    // Check if the checkbox is checked
    if (event.target.checked) {
      // Create a new object with the selected value and assign a unique ID to it
      const newItem = {
        _id: selectedValue,
      };

      // Update the state variable by adding the new object to the existing array
      setCMembers((prevMembers) => [...prevMembers, newItem]);
    } else {
      // Update the state variable by filtering out the unchecked item
      setCMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== selectedValue)
      );
    }
  };

  const onImageChange = (event:ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files?.[0]; 
      setImage(file);
    }
   }

  

  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios.get(`${AdminApi}getCommunityUsers`).then((response) => {
          setUser(response.data);
        });
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(cName, status,cMembers,image);

  const submitCommunity=async()=>{
    try {
      console.log("submitting");
      const formData = new FormData();
       formData.append("image", image);
        await axios.post(`${AdminApi}createCommunity`,{cName, status,cMembers},{
          withCredentials: true,
        }).then((response)=>{
          console.log(response,"response Here");
          navigate("/admin/community")
        })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="w-[98%] h-[98%] flex flex-col justify-center items-center">
        <div>
          <p>Create Community</p>
        </div>
        <div className="w-[95%] h-[90%] mt-4 border-2 border-dotted  border-red-500 flex flex-col">
          <div className="w-full h-5">
            <p className="text-red-600 text-xs ml-5">*Mandatory</p>
          </div>
          <div className="w-full h-[27rem]  flex">
            <div className="w-1/2 h-full flex justify-center items-center">
              <div className="w-72 h-96  flex flex-col ">
                <div className="h-1/2 w-full">
                  <div className="flex w-full">
                    <p className="text-xs">Community Icon</p>
                    <p className="text-xs text-red-800">*</p>
                  </div>
                  <div className="w-full h-full flex items-center pl-5 ">
                    <div className="community_img w-28 h-28 bg-blue-500  rounded-full"></div>
                    <input type="file" className="custom-file-input"   onChange={onImageChange} />
                  </div>
                </div>
                <div className="h-1/2 w-full flex flex-col items-center">
                  <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                    <p className="text-xs ml-5">
                      Community Name
                      <span className="text-red-500">*</span>{" "}
                    </p>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="placeholder-gray-500 ml-5 pl-2 text-xs w-[15rem] h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                      onChange={(e) => setCname(e.target.value)}
                    />
                  </div>
                  <div className="w-[18rem] flex flex-col pt-2">
                    <p className="text-xs ml-5">
                      Select Status
                      <span className="text-red-500">*</span>{" "}
                    </p>
                    <select
                      className="w-[15rem] ml-5  text-xs h-6 pl-3 rounded-md"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option className="">Select Status</option>
                      <option value="Active" className="">
                        Active
                      </option>
                      <option value="Deactivate" className="">
                        Deactivate
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
              <div className="w-[90%] h-[90%] border-2 border-black rounded-md rounded-md">
                <table className="w-full overflow-y-scroll">
                  <thead className="h-8">
                    <tr className="">
                      <th>Select</th>
                      <th>Name</th>
                      <th>No.comm </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-300 h-20">
                    {user.map((item, i) => {
                      return (
                        <tr key={i} className="border-y-2 border-black">
                          <td className="flex justify-center mt-2">
                            <input
                              type="checkbox"
                              className="cyberpunk-checkbox"
                              onChange={handleCheckboxChange}
                              value={item?._id}
                            />
                          </td>
                          <td className="text-center">{item?.firstName}</td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full h-36 flex justify-center">
            <div className="mt-5 w-44 flex justify-between">
              <button className="w-20 rounded-md text-sm h-8 bg-red-400" onClick={()=>{
                navigate("/admin/community")
              }}>
                Cancel
              </button>
              <button type="submit" onClick={submitCommunity} className="w-20 rounded-md text-sm h-8  bg-green-400"  >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CreateCommunity;
