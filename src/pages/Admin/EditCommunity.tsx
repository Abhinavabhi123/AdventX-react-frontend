import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Community.css";

import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import axios from "axios";
import { AdminApi } from "../../Store/api";
import { ImgApi } from "../../Store/api";

interface Community {
  communityName: string;
  createdAt: string;
  logo: string;
  status: string;
}
interface ActMembers {
  [key: string]: any;
}

function EditCommunity() {
  const { id } = useParams();
  const [change, setChange] = useState(false);
  useEffect(() => {
    try {
      (async () => {
        await axios
          .get(`${AdminApi}getCommunityDetails/${id}`, {
            withCredentials: true,
          })
          .then((response) => {
            setCommunity(response?.data?.commData);
            setActMember(response?.data?.commData?.members);
          });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [change, id]);
  const [community, setCommunity] = useState<Community>({
    communityName: "",
    createdAt: "",
    logo: "",
    status: "",
  });
  const {
    communityName,
    createdAt,
    logo,
    status,
  }: {
    communityName: string;
    createdAt: string;
    logo: string;
    status: string;
  } = community;
  const [imgOpen, setImgOpen] = useState(false);
  const [actMembers, setActMember] = useState({}) as any;
  const [selectedOption, setSelectedOption] = useState("");

  if (logo === "" && logo.length > 0) {
    setImgOpen(true);
  }
  // console.log( actMembers);
  const array: any[] = [];

  for (const data in actMembers) {
    array.push(actMembers[data] as string);
  }
  // actMembers.map((item)=>{
  //   console.log(item);

  // })
  // console.log(typeof array);
  // array.map((item)=>{
  //   console.log(item.userId);

  // })

  const changeStatus = async (userId: string): Promise<void> => {
    try {
      console.log(id);
      console.log(status);

      await axios
        .post(
          `${AdminApi}changeComStatus`,
          { id, userId },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);

          if (change === false) {
            setChange(true);
          } else {
            setChange(false);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="communityBody">
      <div className="communitySide">
        <SideBar />
      </div>
      <div className="community_topBar">
        <div className="">
          <TopBar value={"Edit Community"} />
        </div>
        <div className="communityMain flex justify-center items-center">
          <div className="communityMain_inner w-[98%] h-[45rem] rounded-md bg-opacity-20 border-dashed border-[2px] border-blue-800 flex justify-center items-center">
            <div className="w-[98%] h-[98%]">
              <div className="w-full h-10 flex justify-center items-center">
                <p className="text-lg font-semibold italic">Edit Community</p>
              </div>
              <div className="w-full h-36  flex">
                <div className="h-full w-[50%]  flex justify-center items-center">
                  {!imgOpen ? (
                    <img
                      className="community_img w-28 h-28 bg-blue-500  rounded-full"
                      alt="logo"
                      src={`${ImgApi}${logo}`}
                    />
                  ) : (
                    <div className="community_img w-28 h-28 bg-blue-500  rounded-full"></div>
                  )}
                </div>
                <div className="h-full w-[50%] flex justify-center items-center">
                  <div className="w-full flex flex-col items-center">
                    <div className="w-[18rem] flex flex-col  m-0 justify-center">
                      <p className="text-xs ml-5">
                        Community Name
                        <span className="text-red-500">*</span>{" "}
                      </p>
                      <input
                        type="text"
                        placeholder="Community Name"
                        defaultValue={communityName}
                        className="placeholder-gray-500 ml-5 pl-2 text-xs w-[15rem] h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                      />
                    </div>
                    <div className="w-[18rem] flex flex-col pt-2">
                      <p className="text-xs ml-5">
                        Select Status
                        <span className="text-red-500">*</span>{" "}
                      </p>
                      <select
                        value={status}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-[15rem] ml-5  text-xs h-6 pl-3 rounded-md "
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
              <div className="w-full flex b h-[25rem] ">
                <div className="h-full w-[50%]  border-r border-black flex justify-center items-center">
                  <div className="w-[98%] h-[98%]  flex flex-col">
                    <div className=" w-full h-8 flex justify-center items-center">
                      <p>Community Members</p>
                    </div>
                    {/* First table */}
                    <div className="w-full h-full bg-gray-400 bg-opacity-30 rounded-md overflow-y-scroll over border border-black">
                      <table className="w-full">
                        <thead className=" h-8 rounded-md">
                          <tr className=" h-2 bg-blue-400 rounded-md">
                            <th className="cursor-default w-20">Selected</th>
                            <th className="cursor-default">Name</th>
                            <th className="cursor-default w-28">Block</th>
                          </tr>
                        </thead>

                        <tbody className="">
                          {array.map((item, i) => {
                            return (
                              <tr
                                key={i}
                                className="border-y-2 border-black h-10"
                              >
                                <td className="flex justify-center mt-2  h-6">
                                  {/* <input
                                    type="checkbox"
                                    className="cyberpunk-checkbox"
                                    // onChange={handleCheckboxChange}
                                    value={item?.userId._id}
                                  /> */}
                                  <img src="/icons/checked.png" alt="checked" />
                                </td>
                                <td className="text-center text-sm h-2">
                                  {item?.userId?.firstName}
                                </td>
                                <td className="text-center  h-2">
                                  {item?.access === true ? (
                                    <button
                                      type="button"
                                      className="w-20 h-6 bg-green-500 rounded-md text-center text-xs"
                                      onClick={async () =>
                                        await changeStatus(item?.userId._id)
                                      }
                                    >
                                      unblock
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="w-20 h-6 bg-red-500 rounded-md text-center text-xs"
                                      onClick={async () =>
                                        await changeStatus(item?.userId._id)
                                      }

                                    >
                                      blocked
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="h-full w-[50%] flex justify-center items-center">
                  <div className="w-[98%] h-[98%]  flex flex-col">
                    <div className=" w-full h-8 flex justify-center items-center">
                      <p>Add Members</p>
                    </div>
                    <table className="w-full h-full bg-gray-400 bg-opacity-30 rounded-md">
                      <thead className=" h-8 rounded-md">
                        <tr className=" h-2 w-full bg-blue-400 rounded-md">
                          <th className="cursor-default">Selected</th>
                          <th className="cursor-default">Name</th>
                          <th className="cursor-default">Comm.No</th>
                        </tr>
                      </thead>
                      <tbody>{/* .......................... */}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="w-full h-[8.1rem] flex justify-center items-center">
                <div className="w-36 h-9 flex justify-between items-center">
                  <button className="w-16 h-8 bg-red-500 hover:bg-red-600 rounded-md">
                    Cancel
                  </button>
                  <button className="w-16 h-8 bg-green-500 hover:bg-green-600 rounded-md">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCommunity;
