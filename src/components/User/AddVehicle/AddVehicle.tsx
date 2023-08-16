import React, { useState, ChangeEvent } from "react";
import { json, useNavigate } from "react-router-dom";
import UserAxios from "../../../Store/Axios/UserConfig";
import { useSelector } from "react-redux";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";


function AddVehicle() {
  const navigate = useNavigate();
  const _id = useSelector((state:any)=>state.user._id)
  const [vNumber, setVNumber] = useState<string>("");
  const [vType, setVType] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [vName, setVName] = useState<string>("");
  const [vWheels, setVWheels] = useState<number>(0);
  const [vOwner, setVOwner] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const [imgUrl1, setImgUrl1] = useState<string>("");
  const [imgUrl2, setImgUrl2] = useState<string>("");
  const [imgUrl3, setImgUrl3] = useState<string>("");
  const [error, setError] = useState("");
  const [openError, setErrorOpen] = useState<boolean>(false);


  const uploadImage = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    if (e.target.files && e.target.files[0] && i >= 0) {
      const file = e.target.files[0];
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
      selectImage(file, i);
    }
  };
  const selectImage = (file: any, i: number) => {
    const images = [...image];
    images[i] = file;
    setImage(images);
    const imgUrl = URL.createObjectURL(file);
    for (i; i < 3; i++) {
      if (i === 0) {
        setImgUrl1(imgUrl);
        return;
      }
      if (i === 1) {
        setImgUrl2(imgUrl);
        return;
      }
      if (i === 2) {
        setImgUrl3(imgUrl);
        return;
      }
    }
  };



  const submitData =async () => {
    try {

      const symbols = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/;
      if(vNumber.length<=0){
        showErrorToast('Please enter the vehicle name')
        return
      }
      if(vNumber[0]===" "){
        showErrorToast('Please remove the space before vehicle number')
        return
      }
      if(vNumber.trim()===""){
        showErrorToast('Please remove the space before vehicle number')
        return
      }
      if(symbols.test(vNumber)){
        showErrorToast('Please remove the symbol in vehicle number')
        return
      }
      // 
      const allSymbols = /[-!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/;
      if(vType.length<=0){
        showErrorToast('Please enter the vehicle type')
        return
      }
      if(vType[0]===" "){
        showErrorToast('Please remove the space before vehicle type')
        return
      }
      if(vType.trim()===""){
        showErrorToast('Please remove the space before vehicle type')
        return
      }
      if(allSymbols.test(vType)){
        showErrorToast('Please remove the symbol in vehicle type')
        return
      }
      // 
      if(fuelType.length<=0){
        showErrorToast('Please enter the fuel type')
        return
      }
      if(fuelType[0]===" "){
        showErrorToast('Please remove the space before fuel type')
        return
      }
      if(fuelType.trim()===""){
      showErrorToast('Please remove the space before fuel type')
        return
      }
      if(symbols.test(fuelType)){
        showErrorToast('Please remove the symbol in fuel type')
        return
      }
      // 
      if(vName.length<=0){
        showErrorToast('Please enter the vehicle name')
        return
      }
      if(vName[0]===" "){
        showErrorToast('Please remove the space before vehicle name')
        return
      }
      if(vName.trim()===""){
        showErrorToast('Please remove the space before vehicle name')
        return
      }
      if(symbols.test(vName)){
        showErrorToast('Please remove the symbol in vehicle name')
        return
      }
      
      // 
      if(vWheels<=0){
        showErrorToast('Please enter the wheel count')
        return
      }
      // 
      
      if(vOwner.length<=1){
        showErrorToast('Please enter the vehicle owner name')
        return
      }
      if(vOwner[0]===" "){
        showErrorToast('Please remove the space before vehicle owner name')
        return
      }
      if(vOwner.trim()===""){
        showErrorToast('Please remove the space before vehicle owner name')
        return
      }
      if(symbols.test(vOwner)){
        showErrorToast('Please remove the symbol in vehicle owner name')
        return
      }
      if(image.length!==3){
        showErrorToast('Please select 3 images')
        return
      }
      const formData = new FormData()
      formData.append('id',_id);
      formData.append('vNumber', vNumber);
      formData.append('vType', vType);
      formData.append('fuelType', fuelType);
      formData.append('vName', vName);
      formData.append('vWheels', String(vWheels));
      formData.append('vOwner', vOwner);
      for (const img of image) {
        formData.append('image', img);
      }
   
      await UserAxios.post("/addVehicle",formData,{headers:{"Content-Type":"multipart/form-data"},withCredentials:true}).then((response)=>{
        if(response?.data?.status===200){
          navigate('/profile')
        }
      })

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[60%] h-[45rem] bg-transparent flex justify-center items-center">
      <div
        className="w-[95%] h-[90%] bg-white rounded-md"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <div className="w-full h-10 rounded-t-md bg-green-200 border-b border-gray-500 flex items-center ps-5 justify-between">
          <p className="">Add vehicle</p>
          <div className="w-32 h-10 flex justify-around items-center">
            <button
              className="w-12 rounded-md border hover:border-black h-6 text-xs bg-gray-200 hover:bg-gray-300 "
              onClick={() => {
                navigate("/profile");
              }}
            >
              Cancel
            </button>

            <button
              className="w-12 rounded-md border hover:border-black h-6 text-xs bg-blue-300 hover:bg-blue-400"
              onClick={submitData}
            >
              Save
            </button>
          </div>
        </div>
        <div className="w-full h-[40rem]  ">
          <div className="w-full h-[50%] flex">
            <div className="w-[50%] h-full  flex gap-3 flex-col items-center justify-center">
              {/* first div */}
              <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                <p className="text-xs ">
                  Vehicle Number
                  <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  type="text"
                  placeholder="Enter the vehicle number"
                  value={vNumber.toUpperCase()}
                  className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
                  onChange={(e) => {
                    const Value: string = e.target.value.toUpperCase();
                    setVNumber(Value);
                  }}
                  required
                />
              </div>
              {/* second Div */}
              <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                <p className="text-xs">
                  Vehicle Type
                  <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  type="text"
                  placeholder="Enter the vehicle type"
                  className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                  onChange={(e) => {
                    setVType(e.target.value);
                  }}
                  required
                />
              </div>
              {/* third Div*/}
              <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                <p className="text-xs">
                  Vehicle Fuel Type
                  <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  type="text"
                  placeholder="Enter vehicle fuel type"
                  className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                  onChange={(e) => {
                    setFuelType(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="w-[50%] h-full  flex flex-col justify-center items-center gap-3">
              <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                <p className="text-xs ">
                  Vehicle Name
                  <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  type="text"
                  placeholder="Enter the vehicle name"
                  className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                  onChange={(e) => {
                    setVName(e.target.value);
                  }}
                  required
                />
              </div>
              {/* second Div */}
              <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                <p className="text-xs">
                  Vehicle wheels
                  <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  type="number"
                  placeholder="Enter vehicle wheel count"
                  className="placeholder-gray-500 pl-2 spin-button-none text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                  onChange={(e) => {
                    setVWheels(parseInt(e.target.value));
                  }}
                  required
                />
              </div>
              {/* third Div*/}
              <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                <p className="text-xs">
                  Vehicle owner
                  <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  type="text"
                  placeholder="Enter vehicle owner name"
                  className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                  onChange={(e) => {
                    setVOwner(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[50%] bg-transparent">
            <div className="w-full h-[70%] flex items-center justify-around">
              <div className="w-[13rem] h-36 bbg-transparent rounded-md border border-black flex justify-center items-center">
                <img src="/icons/plus.png" alt="" className="absolute" />
                {imgUrl1 && (
                  <img
                    src={imgUrl1}
                    alt="img1"
                    className="absolute w-[13rem] h-36 rounded-md"
                  />
                )}
                <input
                  className="w-[13rem] h-36 opacity-0 relative"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e, 0);
                  }}
                  accept="image/*"
                  required
                />
              </div>
              <div className="w-[13rem] h-36 bg-transparent rounded-md border border-black flex justify-center items-center">
                <img src="/icons/plus.png" alt="plus" className="absolute" />
                {imgUrl2 && (
                  <img
                    src={imgUrl2}
                    alt="img1"
                    className="absolute w-[13rem] h-36 rounded-md"
                  />
                )}
                <input
                  className="w-[13rem] h-36 opacity-0 relative"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e, 1);
                  }}
                  accept="image/*"
                  required
                />
              </div>
              <div className="w-[13rem] h-36 bg-transparent rounded-md border border-black flex justify-center items-center">
                <input
                  className="w-[13rem] h-36 opacity-0 absolute"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e, 2);
                  }}
                  accept="image/*"
                  required
                />
                <img src="/icons/plus.png" alt="" />
                {imgUrl3 && (
                  <img
                    src={imgUrl3}
                    alt="img1"
                    className="absolute w-[13rem] h-36 rounded-md"
                  />
                )}
              </div>
            </div>
            <div className="w-full h-[30%] bg-transparent flex justify-center">
              {
                openError&&(
                  <p className="text-red-500 text-sm">{error}</p>
                )
              }
            </div>
          </div>
          <Toaster/>
        </div>
      </div>
    </div>
  );
}

export default AddVehicle;
