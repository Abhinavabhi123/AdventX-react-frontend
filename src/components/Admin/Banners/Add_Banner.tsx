import React, { useState, ChangeEvent } from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

function Add_Banner() {
    const navigate = useNavigate()
  const [image, setImage] = useState<File | string>();
  const [previewUrl, setPreviewUrl] = useState("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openError, setErrorOpen] = useState<boolean>(false);
  const [succOpen, setSuccOpen] = useState<boolean>(false);
  const [imageSuccess, setImageSuccess] = useState<string>("");

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    setImage("");
    setPreviewUrl("");
    if (event.target.files && event.target.files[0]) {
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
        setPreviewUrl("");
        setError("Please select an image file smaller than 5MB.");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageSuccess("Image added successfully");
      setSuccOpen(true);
      setTimeout(() => {
        setSuccOpen(false);
        setImageSuccess("");
      }, 1500);
    }
  };
  const saveData = async () => {
    const symbols = /[-!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/;
    if (!image) {
      setError("Please select an image");
      setErrorOpen(true);
      setTimeout(() => {
        setErrorOpen(false);
        setError("");
      }, 1500);
      return;
    }
    if (title[0] === "") {
      setError("Please Remove the space before the text");
      setErrorOpen(true);
      setTimeout(() => {
        setErrorOpen(false);
        setError("");
      }, 1500);
      return;
    }
    if (title.trim() === "" || title.length <= 0 || typeof title !== "string") {
      setError("Please enter the title for banner");
      setErrorOpen(true);
      setTimeout(() => {
        setErrorOpen(false);
        setError("");
      }, 1500);
      return;
    }
    if (symbols.test(title) || symbols.test(subTitle)) {
      setError("Please remove the special case symbols");
      setErrorOpen(true);
      setTimeout(() => {
        setErrorOpen(false);
        setError("");
      }, 1500);
      return;
    }
    //   second field checking
    if (subTitle[0] === "") {
      setError("Please Remove the space before the text");
      setErrorOpen(true);
      setTimeout(() => {
        setErrorOpen(false);
        setError("");
      }, 1500);
      return;
    }
    if (
      subTitle.trim() === "" ||
      subTitle.length <= 0 ||
      typeof subTitle !== "string"
    ) {
      setError("Please enter the subtitle for banner");
      setErrorOpen(true);
      setTimeout(() => {
        setErrorOpen(false);
        setError("");
      }, 1500);
      return;
    }

    await AdminAxios.post(
      `addBanner`,
      { image, title, subTitle },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((response) => {
      if (response?.data.status === 200) {
        navigate("/admin/bannerManagement")
      } 
      
    }).catch((error)=>{
      console.error(error);
      if(error?.response?.data?.status!==500){
        showErrorToast("something wrong")
      }else{
        navigate("/admin/error500")
      }
    })
  };

  return (
    <div className="w-[95%] h-[95%] bg-transparent">
      <div className="w-full h-14 bg-transparent flex items-center pl-5">
        <p>Add Home Banner</p>
      </div>
      <div className="w-full h-56 bg-transparent flex">
        <div className="w-[50%] h-full bg-transparent border-e flex flex-col justify-center items-center border-black border-opacity-40">
          {/* div 1 */}
          <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
            <p className="text-xs ml-5">
              Title
              <span className="text-red-500">*</span>{" "}
            </p>
            <input
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              className="placeholder-gray-500 ml-5 pl-2 text-xs w-[15rem] h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          {/* div 2 */}
          <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
            <p className="text-xs ml-5">
              Sub title
              <span className="text-red-500">*</span>{" "}
            </p>
            <input
              type="text"
              placeholder="Enter sub title"
              onChange={(e) => setSubTitle(e.target.value)}
              className="placeholder-gray-500 ml-5 pl-2 text-xs w-[15rem] h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
        </div>
        <div className="w-[50%] h-full bg-transparent flex flex-col justify-center items-center">
          <div className="w-[18rem] flex flex-col h-14  m-0 justify-center ">
            <p className="text-xs ml-5">
              Banner Image
              <span className="text-red-500">*</span>{" "}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={addImage}
              className="placeholder-gray-500 ml-5 pl-2 text-xs w-[15rem] h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          <div className="w-full h-40 flex justify-center items-center flex-col">
            {previewUrl && (
              <img src={previewUrl} alt="" className="w-48 h-32 rounded" />
            )}
            <div className="w-full h-8 flex items-center justify-center">
              {openError && <p className="text-sm text-red-500">{error}</p>}
              {succOpen && (
                <p className="text-sm text-green-500">{imageSuccess}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-20 bg-transparent flex items-center justify-center">
        <div className="w-40 h-8 flex justify-evenly">
          <button className="w-16 text-sm rounded-md h-6 bg-red-400" onClick={()=>navigate("/admin/bannerManagement")}>
            Cancel
          </button>
          <button
            className="w-16 text-sm rounded-md h-6 bg-green-400"
            onClick={saveData}
          >
            Save
          </button>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default Add_Banner;
