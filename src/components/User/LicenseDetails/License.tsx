import  { useState, useRef, ChangeEvent, useEffect } from "react";
import UserAxios from "../../../Store/Axios/UserConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";


function License() {
  const navigate =useNavigate()
  const userId: string = useSelector((state: any) => state?.user?._id);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string>("");
  const number = useRef<HTMLInputElement>(null);
  const expiry = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState({
    licenseNumber: "",
    ExpiryDate: "",
    image: "",
  });
  const [changed, setChange] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (userId) {
        await UserAxios.get("/userLicense", { params: { id: userId } }).then(
          (response) => {
            if (response?.data?.status === 200) {
              setUserData(response?.data?.userData?.license);
            }
          }
        ) .catch((error)=>{
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/error500")
          }
        })
      }
    })();
  }, [changed, userId]);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const saveData = async () => {
    try {
      const lNumber: string | undefined = number?.current?.value;
      const lExpiry = expiry?.current?.value;
      
      if (lNumber === undefined || expiry === undefined) {
        showErrorToast("something wrong here")
        return;
      }

      if (lNumber.length < 10 && lNumber?.length > 18) {
        showErrorToast("Please enter the license number correctly")
        return;
      }
      if (!image) {
        showErrorToast("Please select the image")
        return;
      }
      const Number: string = lNumber.toUpperCase();
      if(userData?.licenseNumber.length===0){
         await UserAxios.post(
          "/addLicense",
          { image, Number, lExpiry, userId },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        ).then((response) => {
          if (response?.data?.status === 200) {
            setOpenEdit(false)
            changed ? setChange(false) : setChange(true);
          }
        }).catch((error)=>{
          showErrorToast(error?.response?.data?.error)
        })
      
      }else{  

        
        await UserAxios.post(
          "/editLicense",
          { image, Number, lExpiry, userId },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        ).then((response) => {
          if (response?.data?.status === 200) {
            setOpenEdit(false)
            changed ? setChange(false) : setChange(true);
          }
        }).catch((error)=>{
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/error500")
          }
        })
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[34.5em]  rounded-md">
      <div className="w-full h-[50%] bg-transparent flex border-b border-gray-400">
        {/* details */}
        <div className="w-[50%] h-full  flex flex-col justify-center ps-[5rem]">
          <p>
            LicenseNo:-
            {userData?.licenseNumber ? userData?.licenseNumber : " ___________"}
          </p>
          <p>
            Expiry:-{" "}
            {userData?.ExpiryDate ? userData?.ExpiryDate : " ___________"}
          </p>
        </div>
        {/* image */}
        <div className="w-[50%] h-full  flex justify-between bg-yellow-400 bg-opacity-40 items-center flex-col">
          {userData?.image ? (
            <img
              src={`${import.meta.env.VITE_LICENSE_API}${userData?.image}`}
              alt="img"
              className="w-60 rounded-xl mt-12 h-40 object-cover"
            />
          ) : (
            <img
              src="/bg/license.png"
              alt="img"
              className="w-60 rounded-xl mt-20"
            />
          )}
          <button
            onClick={() => (openEdit ? setOpenEdit(false) : setOpenEdit(true))}
          >
            <img src="/icons/license.png" alt="add license" className="w-6 " />
          </button>
        </div>
      </div>
      {openEdit && (
        <div className="w-full h-[50%] flex rounded-b-md">
          <div className="w-[50%] h-full bg-transparent rounded-bl-md flex justify-center items-center flex-col gap-2">
            <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
              <p className="text-xs ">
                License Number
                <span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="text"
                defaultValue={
                  userData?.licenseNumber ? userData?.licenseNumber : ""
                }
                ref={number}
                placeholder="Enter the license number"
                className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
                required
              />
            </div>
            <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
              <p className="text-xs ">
                Vehicle Number
                <span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="date"
                ref={expiry}
                defaultValue={userData?.ExpiryDate ? userData?.ExpiryDate : ""}
                placeholder="Enter the vehicle number"
                className="placeholder-gray-500 pl-2 pr-3 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
                required
              />
            </div>
          </div>
          <div className="w-[50%] h-full  rounded-br-md">
            <div className="w-full h-[50%]  flex flex-col justify-center items-center">
                <p className="text-sm">Please Select image</p>
              <div className="w-[30%] h-[60%] rounded-md relative border border-dashed border-violet-500">
                <input
                  type="file"
                  className="absolute w-[100%] opacity-0 h-[100%]"
                  onChange={(e) => uploadImage(e)}
                />
                {imgPreview && (
                  <img
                    className="w-[100%] h-[100%] rounded-md"
                    src={imgPreview}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="w-full h-[30%] flex justify-center items-center">
              {userData ? (
                <button
                  className="w-16 rounded-md h-6 bg-red-300 hover:bg-red-400"
                  onClick={saveData}
                >
                  change
                </button>
              ) : (
                <button
                  className="w-14 rounded-md h-6 bg-red-300 hover:bg-red-400"
                  onClick={saveData}
                >
                  Save
                </button>
              )}
            </div>
          </div>
          <Toaster/>
        </div>
      )}
    </div>
  );
}

export default License;
