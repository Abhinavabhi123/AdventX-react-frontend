import "./CreateCommunity.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent } from "react";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";
// import UsersRow from "./UsersRow";

type User = {
  firstName: string;
  _id: string;
};

function CreateCommunity() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User[]>([]);
  const [cName, setCname] = useState("");
  const [status, setStatus] = useState("");
  const [cMembers, setCMembers] = useState<{ _id: string }[]>([]);
  const [image, setImage] = useState<File | string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [openError, setErrorOpen] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [imageSuccess, setImageSuccess] = useState<string>("");
  const [succOpen, setSuccOpen] = useState<boolean>(false);
  const [listError, setListError] = useState<string>("");
  const [openListErr, setOpenList] = useState<boolean>(false);

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

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage("");
      setImageUrl("");
      const file = event.target.files?.[0];
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
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setImageSuccess("Image added successfully");
      setSuccOpen(true);
      setTimeout(() => {
        setSuccOpen(false);
        setImageSuccess("");
      }, 1500);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        await AdminAxios.get(`getCommunityUsers`).then((response) => {
          setUser(response.data);
        }).catch((error)=>{
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/admin/error500")
          }
        })
      };
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  const submitCommunity = async () => {
    try {
      if (!image) {
        setError("Please select an image");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }
      const firstChar = cName[0];
      if (firstChar === " ") {
        setError("Please Remove the space before the text");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }
      if (
        cName.trim() === "" ||
        cName.length <= 0 ||
        typeof cName !== "string"
      ) {
        setError("Please enter the Community name");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }

      if (status === "") {
        setError("Please Select the status of the community");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }

      if (cMembers.length === 0) {
        setListError("Select at least one member for the community");
        setOpenList(true);
        setTimeout(() => {
          setOpenList(false);
          setListError("");
        }, 1500);
        return;
      }
      await AdminAxios.post(
        `createCommunity`,
        {
          image,
          cName,
          cMembers,
          status,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      ).then(() => {
        navigate("/admin/community");
      });
    } catch (error) {
      console.error(error);
    }
  };

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
                  {succOpen && (
                    <p className="text-xs text-green-600">{imageSuccess}</p>
                  )}
                  <div className="w-full h-full flex items-center pl-5 ">
                    {imageUrl === "" ? (
                      <div className="community_img w-28 h-28 bg-blue-500  rounded-full"></div>
                    ) : (
                      <div className="community_img w-28 h-28  rounded-full">
                        <img
                          className="community_img w-28 h-28  rounded-full"
                          src={imageUrl}
                          alt="image"
                        />
                      </div>
                    )}

                    <input
                      type="file"
                      className="custom-file-input"
                      onChange={onImageChange}
                      accept="image/*"
                    />
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
                      placeholder="Community Name"
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
                      placeholder="Select Status"
                      className="w-[15rem] ml-5  text-xs h-6 pl-3 rounded-md"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option> select</option>
                      <option value="Active" className="">
                        Active
                      </option>
                      <option value="Deactivate" className="">
                        Deactivate
                      </option>
                    </select>
                  </div>
                  {openError && (
                    <p className="text-xs my-3 text-red-600">{error} </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
              <div className="w-[90%] h-[90%] border-2 border-black rounded-md">
                <table className="w-full overflow-y-scroll">
                  <thead className="h-8">
                    <tr className="">
                      <th>Select</th>
                      <th>Name</th>
                      <th>No.comm </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-300 ">
                    {user.map((item, i) => {
                      return (
                        <tr key={i} className="border-y-2 border-black h-10">
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
          <div className="w-full h-5 flex justify-center">
            {openListErr && <p className="text-xs text-red-500">{listError}</p>}
          </div>
          <div className="w-full h-36 flex justify-center">
            <div className="mt-5 w-44 flex justify-between">
              <button
                className="w-20 rounded-md text-sm h-8 bg-red-400"
                onClick={() => {
                  navigate("/admin/community");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={submitCommunity}
                className="w-20 rounded-md text-sm h-8  bg-green-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default CreateCommunity;
