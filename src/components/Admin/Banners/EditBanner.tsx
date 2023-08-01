import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import "./Banner.css";
import { useNavigate, useParams } from "react-router-dom";
import AdminAxios from "../../../Store/Axios/AdminConfig";



function EditBanner() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [bannerData, setBannerData] = useState({
    status: "",
    title: "",
    subTitle: "",
    image: "",
  });
  const [image, setImage] = useState<File | string>();
  const [previewUrl, setPreviewUrl] = useState("");
  //   const [title, setTitle] = useState<string>("");
  //   const [subTitle, setSubTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openError, setErrorOpen] = useState<boolean>(false);
  const [succOpen, setSuccOpen] = useState<boolean>(false);
  const [imageSuccess, setImageSuccess] = useState<string>("");
  const [imgopen, setImgOpen] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const subTitleRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    (async () => {
      await AdminAxios.get("getBanner", { params: { id } })
        .then((response) => {
          console.log(response);
          if (response?.data?.status === 200) {
            setBannerData(response?.data?.bannerData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("add Image");
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
    try {
      const symbols = /[-!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/;
      console.log(
        titleRef?.current?.value,
        subTitleRef.current?.value,
        statusRef?.current?.value,
        image
      );
      const title = titleRef?.current?.value;
      const subTitle = subTitleRef?.current?.value;
      const status = statusRef?.current?.value;
      if (
        title === undefined ||
        subTitle === undefined ||
        status === undefined
      ) {
        return;
      }
      if (!title || !subTitle || !status) {
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
      if (
        title.trim() === "" ||
        title.length <= 0 ||
        typeof title !== "string"
      ) {
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
      if (status === "Select status") {
        setError("Please select status");
        setErrorOpen(true);
        setTimeout(() => {
          setErrorOpen(false);
          setError("");
        }, 1500);
        return;
      }
      
      await AdminAxios.post(
        "/postBannerEdit",
        { title, subTitle, status, image,id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((response) => {
          console.log(response);
          if(response?.data?.status===200){
            navigate("/admin/bannerManagement")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
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
              defaultValue={bannerData?.title}
              ref={titleRef}
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
              defaultValue={bannerData?.subTitle}
              placeholder="Enter sub title"
              ref={subTitleRef}
              className="placeholder-gray-500 ml-5 pl-2 text-xs w-[15rem] h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          {/* div  */}
          <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
            <p className="text-xs ml-5">
              Select Status
              <span className="text-red-500">*</span>{" "}
            </p>
            <select
              className="placeholder-gray-500 ml-5 pl-2 text-xs w-[15rem] h-7 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
              ref={statusRef}
            >
              <option>Select status</option>
              <option value="true">Active</option>
              <option value="false">Deactivate</option>
            </select>
          </div>
        </div>
        <div className="w-[50%] h-full bg-transparent flex flex-col justify-center items-center">
          {/* image div */}
          {/* <div
            id="form-file-upload"
            onDragOver={handleOndragOver}
            onDrop={handleOnDrop}
          >
            <input type="file" id="input-file-upload" multiple={false} />
            <label id="label-file-upload" htmlFor="input-file-upload">
              <div>
                <p>Drag and drop your file here or click here </p>
                
              </div>
            </label>
          </div> */}
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
            {!previewUrl && bannerData?.image && (
              <img
                src={`${import.meta.env.VITE_BANNER_API}${bannerData?.image}`}
                alt=""
                className="w-48 h-32 rounded"
              />
            )}
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
          <button
            className="w-16 text-sm rounded-md h-6 bg-red-400"
            onClick={() => navigate("/admin/bannerManagement")}
          >
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
    </div>
  );
}

export default EditBanner;
