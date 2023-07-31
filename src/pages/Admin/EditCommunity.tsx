import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Community.css";
import { useNavigate } from "react-router-dom";

import SideBar from "../../components/Admin/AdminSideBar/SideBar";
import TopBar from "../../components/Admin/AdminTopBar/TopBar";
import { ImgApi } from "../../Store/api";
import AdminAxios from "../../Store/Axios/AdminConfig";
import { response } from "express";

interface Community {
  communityName: string;
  createdAt: string;
  logo: string;
  status: string;
}
interface ActMembers {
  [key: string]: any;
}
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  community: string[];
}

function EditCommunity() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const { id } = useParams();
  const [change, setChange] = useState(false);
  const [imgOpen, setImgOpen] = useState(false);
  const [actMembers, setActMember] = useState({}) as ActMembers | any;
  const [allMember, setAllMember] = useState<UserData[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [commName, setCommName] = useState("");
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cMembers, setCMembers] = useState<{ _id: string }[]>([]);
  const [newImage, setNewImage] = useState<File | string>("");
  const [newPreview, setNewPreview] = useState<string>("");
  const [imagePreviewOpen, setImagePreOpen] = useState<boolean>(false);
  const [imageChanged, setImageChange] = useState<boolean>(false);
  useEffect(() => {
    try {
      (async () => {
        await AdminAxios.get(`getCommunityDetails/${id}`, {
          withCredentials: true,
        }).then((response) => {
          setCommunity(response?.data?.commData);
          setActMember(response?.data?.commData?.members);
        });
      })();

      (async () => {
        await AdminAxios.get(`addUserECommunity`, {
          params: { id: id || "" },
          withCredentials: true,
        }).then((response) => {
          setAllMember(response.data.userData);
        });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [change, id, imageChanged]);

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
  }: {
    communityName: string;
    createdAt: string;
    logo: string;
    status: string;
  } = community;

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
      await AdminAxios.post(
        `changeComStatus`,
        { id, userId },
        { withCredentials: true }
      ).then((response) => {
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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;

    if (event.target.checked) {
      const newItem = {
        _id: selectedValue,
      };

      setCMembers((prevMembers) => [...prevMembers, newItem]);
    } else {
      setCMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== selectedValue)
      );
    }
  };
  const imageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage("");
      setNewPreview("");
      const file = event?.target?.files?.[0];
      const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
      if (!allowedType.includes(file.type)) {
        setError("Please select a JPG, JPEG, or PNG image file.");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("Please select an image file smaller than 5MB.");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }
      setNewImage(file);
      setNewPreview(URL.createObjectURL(file));
      setImagePreOpen(true);
    }
  };

  const submitChanges = async () => {
    try {
      // let selectedValue  ="";
      let inputValue = "";
      if (inputRef.current) {
        inputValue = inputRef.current.value;
        console.log("Current Value:", inputValue);
        console.log(inputValue);
      }
      if (inputValue.length <= 0) {
        setErrorOpen(true);
        setError("Please Enter the Community Name");
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }
      if (selectedOption === "") {
        setErrorOpen(true);
        setError("Please Select the status of Community");
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }
      console.log(inputValue, selectedOption, "ppp");
      console.log(cMembers);

      await AdminAxios.post(`changeCommunity/${id}`, {
        inputValue,
        cMembers,
        selectedOption,
      })
        .then((response) => {
          if (response.data.status === 200) {
            navigate("/admin/community");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const cancelImage = () => {
    setNewPreview("");
    setNewImage("");
    setImagePreOpen(false);
  };

  const saveImage = async () => {
    try {
      console.log(newImage);

      await AdminAxios.post(
        `changeCommunityImage/${id}`,
        { image: newImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      ).then((response) => {
        console.log(response);
        if (response?.data?.status === 200) {
          imageChanged ? setImageChange(false) : setImageChange(true);
          setNewPreview("");
          setNewImage("");
          setImagePreOpen(false);
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
                <div className="h-full w-[50%]  flex flex-col justify-center items-center">
                  {!imgOpen ? (
                    <div className="w-28 h-28 relative  rounded-full">
                      {imagePreviewOpen ? (
                        <img
                          src={newPreview}
                          alt="logo"
                          className="community_img w-28 h-28 absolute  rounded-full"
                        />
                      ) : (
                        <img
                          className="community_img w-28 h-28 absolute  rounded-full"
                          alt="logo"
                          src={`${ImgApi}${logo}`}
                        />
                      )}

                      <input
                        type="file"
                        className="w-28 h-28  opacity-0 rounded-full"
                        onChange={imageUpload}
                      />
                    </div>
                  ) : (
                    <div className="community_img w-28 h-28 bg-blue-500  rounded-full"></div>
                  )}
                  <div className="w-32 h-10 mt-4 flex justify-around">
                    {imagePreviewOpen && (
                      <>
                        <button
                          className="w-14 rounded-md h-6 bg-red-300 hover:bg-red-400"
                          onClick={cancelImage}
                        >
                          cancel
                        </button>
                        <button
                          className="w-14 rounded-md h-6 bg-sky-300 hover:bg-sky-400"
                          onClick={saveImage}
                        >
                          save
                        </button>
                      </>
                    )}
                  </div>
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
                        ref={inputRef}
                        className="placeholder-gray-500 ml-5 pl-2 text-xs w-[15rem] h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                        onChange={(e) => setCommName(e.target.value)}
                      />
                    </div>
                    <div className="w-[18rem] flex flex-col pt-2">
                      <p className="text-xs ml-5">
                        Select Status
                        <span className="text-red-500">*</span>{" "}
                      </p>
                      <select
                        placeholder="Select Status"
                        // value={status}
                        // ref={selectRef}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-[15rem] ml-5  text-xs h-6 pl-3 rounded-md "
                      >
                        <option>select</option>
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
                                  <img src="/icons/checked.png" alt="checked" />
                                </td>
                                <td className="text-center text-sm h-2">
                                  {`${item?.userId?.firstName} ${item?.userId?.lastName}`}
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
                    {/* Second Table  */}
                    <div className="w-full h-full bg-gray-400 bg-opacity-30 rounded-md overflow-y-scroll over border border-black">
                      <table className="w-full">
                        <thead className=" h-8 rounded-md">
                          <tr className=" h-2 w-full bg-blue-400 rounded-md">
                            <th className="cursor-default">Selected</th>
                            <th className="cursor-default">Name</th>
                            <th className="cursor-default"> Comm.No</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allMember.map((member, i) => {
                            const count = member?.community?.length;
                            return (
                              <tr
                                key={i}
                                className="border-y-2 border-black h-10"
                              >
                                <td className="flex justify-center mt-2  h-6">
                                  <input
                                    type="checkbox"
                                    className="cyberpunk-checkbox"
                                    onChange={handleCheckboxChange}
                                    value={member?._id}
                                  />
                                  {/* <img src="/icons/checked.png" alt="checked" /> */}
                                </td>
                                <td className="text-center text-sm h-2">
                                  {`${member?.firstName} ${member?.lastName}`}
                                </td>
                                <td className="text-center text-sm h-2">
                                  {count}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-8 flex justify-center items-center">
                {errorOpen && <p className="text-xs text-red-600">{error}</p>}
              </div>
              <div className="w-full h-[5rem] flex justify-center items-center">
                <div className="w-36 h-9 flex justify-between items-center">
                  <button
                    className="w-16 h-8 bg-red-500 hover:bg-red-600 rounded-md"
                    onClick={() => navigate("/admin/community")}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-16 h-8 bg-green-500 hover:bg-green-600 rounded-md"
                    onClick={submitChanges}
                  >
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
