import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./EventDetails.css";

import { uploadImage } from "../../../Store/Firebase/Firebase";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster, toast } from "react-hot-toast";

function EventDetails() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date | string>("");
  const [type, setType] = useState<string>("");
  const [fee, setFee] = useState<number>(0);
  const [firstPrice, setFirstPrice] = useState<number>(0);
  const [secondPrice, setSecondPrice] = useState<number>(0);
  const [thirdPrice, setThirdPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [imgOpen, setImgOpen] = useState<boolean>(false);

  const imageHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.[0]) {
      const file = event.target.files[0];
      const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
      if (!allowedType.includes(file.type)) {
        showErrorToast("Please select a JPG, JPEG, or PNG image file.");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        showErrorToast("Please select an image file smaller than 5MB");
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
      setImgOpen(true);
    }
  };

  const submitDetails = async () => {
    try {
      
      if (
        eventName.length > 0 &&
        subTitle.length > 0 &&
        location.length > 0 &&
        date &&
        type.length > 0 &&
        fee > 0 &&
        firstPrice > 0 &&
        secondPrice > 0 &&
        thirdPrice > 0 &&
        description.length > 0 &&
        about.length > 0 &&
        status.length > 0 &&
        image
      ) {
        //  check event name
        if (eventName[0] === " ") {
          showErrorToast("Please remove the space before the event name");
          return;
        }
        const symbols = /[-!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/;
        if (symbols.test(eventName)) {
          showErrorToast("Please remove symbols in the event name");
          return;
        }
        // Checking sub title
        if (subTitle[0] === " ") {
          showErrorToast("Please remove the space before the sub name");
          return;
        }
        if (symbols.test(subTitle)) {
          showErrorToast("Please remove symbols in the sub name");
          return;
        }
        // Checking location
        if (location[0] === " ") {
          showErrorToast("Please remove the space before the location");
          return;
        }
        if (/[!"#$%&'()*+./:;<=>?[\\\]^_`{|}~]/.test(location)) {
          showErrorToast("Please remove the symbols in location ");
          return;
        }
        // Checking Date field
        const now = new Date()
        const today = new Date().getTime();
        const result = new Date(date).getTime();

        if (result < today) {
          showErrorToast(`Please select a valid date greater then ${now}`);
          return;
        }
        if (fee <= 0) {
          showErrorToast("please Enter the fee more than 0");
          return;
        }
        if (firstPrice <= 0) {
          showErrorToast("please Enter the first price more than 0");
          return;
        }
        if (secondPrice <= 0) {
          showErrorToast("please Enter the second price more than 0");
          return;
        }
        if (thirdPrice <= 0) {
          showErrorToast("please Enter the third price more than 0");
          return;
        }
        if (status === "Select Status") {
          showErrorToast("Please select status");
          return;
        }
        toast.loading("Saving details");
        await uploadImage(image).then(async (data) => {
          if (data) {
            setTimeout(async () => {
              await AdminAxios.post(
                `addEvent`,
                {
                  eventName,
                  subTitle,
                  location,
                  date,
                  type,
                  fee,
                  firstPrice,
                  secondPrice,
                  thirdPrice,
                  description,
                  about,
                  status,
                  imageUrl: data,
                },
                {
                  withCredentials: true,
                }
              ).then((response) => {
                const result = response.data;
                if (
                  result.status === 200 &&
                  result.message === "Data stored successfully"
                ) {
                  toast.dismiss();
                  navigate("/admin/eventManagement");
                }
              }).catch((error)=>{
                console.error(error);
                if(error?.response?.data?.status!==500){
                  showErrorToast("something wrong")
                }else{
                  navigate("/admin/error500")
                }
              })
            }, 1500);
          }
        }).catch((error)=>{
          console.error(error);
          navigate("/admin/error500")
        })

      } else {
        showErrorToast("Please fill all the fields")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[96%] h-[40rem]  rounded-md bg-transparent flex border border-black border-dotted">
      <div className="w-[33%] h-full bg-transparent flex flex-col items-center">
        <div className="w-full h-10  flex items-center">
          <p className="text-red-600 text-xs ml-5"> Mandatory *</p>
        </div>
        <Toaster />
        {/* input div 1 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Event Name
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Event Name"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={(e) => setEventName(e.target.value.toUpperCase())}
            value={eventName.toUpperCase()}
          />
        </div>
        {/* input div 2 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Sub Title
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Enter sub title"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
        {/* input div 3 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Location
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Enter Location"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* input div 4 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Date
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="date"
            pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
            formAction="dd-mm-yyyy"
            min={Date.now()}
            value={date.toString()}
            // placeholder="DD-MM-YYYY"
            className="placeholder-gray-500 ml-5 pl-2 pr-3 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {/* input div 5 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Type
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Enter event type"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        {/* input div 6 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Event Fee
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="number"
            placeholder="Enter event fees"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
            onChange={(e) => setFee(parseInt(e.target.value, 10))}
          />
        </div>
        {/* input div 7 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            First Price
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="number"
            placeholder="First price amount"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
            onChange={(e) => setFirstPrice(parseInt(e.target.value, 10))}
          />
        </div>
        {/* input div 8 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Second Price
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="number"
            placeholder="Second price amount"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
            onChange={(e) => setSecondPrice(parseInt(e.target.value, 10))}
          />
        </div>
        {/* input div 9*/}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Third Price
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Third price amount"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={(e) => setThirdPrice(parseInt(e.target.value, 10))}
          />
        </div>
      </div>
      {/* SEcond main div */}
      <div className="w-[33.3%] h-full bg-transparent flex flex-col items-center">
        {/* text area 1 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-5 mt-[5rem]">
          <p className="text-xs ml-5">
            Event Description
            <span className="text-red-500">*</span>{" "}
          </p>
          <textarea
            placeholder="Enter event description"
            className="placeholder-gray-500 ml-5 pt-3 pl-2 text-xs w-[18rem] flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            style={{
              maxHeight: "8rem",
              minHeight: "8rem",
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* text area 2 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2 mt-[5rem]">
          <p className="text-xs ml-5">
            About Event
            <span className="text-red-500">*</span>{" "}
          </p>
          <textarea
            placeholder="Enter something about event"
            className="placeholder-gray-500 ml-5 pt-3 pl-2 text-xs w-[18rem] flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            style={{
              maxHeight: "8rem",
              minHeight: "8rem",
            }}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        {/* select Status */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2 mt-[3rem]">
          <p className="text-xs ml-5">
            Select Status
            <span className="text-red-500">*</span>{" "}
          </p>
          <select
            placeholder="Third price amount"
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Select Status</option>
            <option value="Active">Active</option>
            <option value="Deactivate">Deactivate</option>
          </select>
        </div>
        <div className="w-[18rem] ps-5 flex flex-col items-center h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Select primary image
            <span className="text-red-500">*</span>
          </p>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={imageHandle}
          />
        </div>
        {imgOpen && (
          <div>
            <img
              className="w-56 rounded-md"
              src={preview}
              alt="image"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            />
          </div>
        )}
      </div>

      <div className=" w-[33.6%] h-full flex bg-transparent justify-center items-end">
        <div className=" w-[50%] h-18  flex justify-evenly mb-[10rem]">
          <button
            className="w-20 h-8 rounded bg-gray-400 hover:bg-gray-600"
            onClick={() => navigate("/admin/eventManagement")}
          >
            cancel
          </button>
          <button
            className="w-20 h-8 rounded bg-violet-500 hover:bg-violet-700"
            onClick={submitDetails}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
