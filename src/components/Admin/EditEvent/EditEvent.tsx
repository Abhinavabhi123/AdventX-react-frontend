import axios from "axios";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminAxios from "../../../Store/Axios/AdminConfig";

interface DataState {
  eventName: string;
  subName: string;
  location: string;
  date: string;
  eventType: string;
  fee: number;
  firstPrice: number;
  secondPrice: number;
  thirdPrice: number;
  description: string;
  about: string;
  status: string;
  primaryImage: string;
}

function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [eventName, setEventName] = useState<string>("");
  // const [subTitle, setSubTitle] = useState<string>("");
  // const [location, setLocation] = useState<string>("");
  // const [date, setDate] = useState<string>("");
  // const [type, setType] = useState<string>("");
  // const [fee, setFee] = useState<number>(0);
  // const [firstPrice, setFirstPrice] = useState<number>(0);
  // const [secondPrice, setSecondPrice] = useState<number>(0);
  // const [thirdPrice, setThirdPrice] = useState<number>(0);
  // const [description, setDescription] = useState<string>("");
  // const [about, setAbout] = useState<string>("");
  // const [status, setStatus] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [imgOpen, setImgOpen] = useState<boolean>(false);
  const [data, setData] = useState<DataState | undefined>();
  const [error, setError] = useState<string>("");
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  const inputName = useRef<HTMLInputElement>(null);
  const inputSub = useRef<HTMLInputElement>(null);
  const inputLocation = useRef<HTMLInputElement>(null);
  const inputDate = useRef<HTMLInputElement>(null);
  const inputType = useRef<HTMLInputElement>(null);
  const inputFee = useRef<HTMLInputElement>(null);
  const inputFirst = useRef<HTMLInputElement>(null);
  const inputSecond = useRef<HTMLInputElement>(null);
  const inputThird = useRef<HTMLInputElement>(null);
  const inputDesc = useRef<HTMLTextAreaElement>(null);
  const inputAbout = useRef<HTMLTextAreaElement>(null);
  const inputStatus = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    (async () => {
      await AdminAxios.get(`getEventData`, {
        params: {
          id,
        },
      })
        .then((response) => {
          setData(response?.data?.eventData);
        })
        .catch((error) => {
          console.error(error);
        });
    })();
  }, []);

  const imageHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.[0]) {
      const file = event.target.files[0];
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
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setImgOpen(true);
    }
  };

  const submitDetails = () => {
    console.log("submitting");
    try {
      console.log(image, "images");
      
      
      console.log("hello");
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
        {/* input div 1 */}
        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">
            Event Name
            <span className="text-red-500">*</span>{" "}
          </p>
          <input
            type="text"
            placeholder="Event Name"
            ref={inputName}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            defaultValue={data?.eventName}
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
            ref={inputSub}
            defaultValue={data?.subName}
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
            ref={inputLocation}
            defaultValue={data?.location}
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
            defaultValue={data?.date}
            ref={inputDate}
            // placeholder="DD-MM-YYYY"
            className="placeholder-gray-500 ml-5 pl-2 pr-3 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
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
            ref={inputType}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            defaultValue={data?.eventType}
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
            ref={inputFee}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
            defaultValue={data?.fee}
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
            ref={inputFirst}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
            defaultValue={data?.firstPrice}
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
            ref={inputSecond}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
            defaultValue={data?.secondPrice}
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
            ref={inputThird}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            defaultValue={data?.thirdPrice}
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
            className="placeholder-gray-500 over ml-5 pt-3 pl-2 text-xs w-[18rem] flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            style={{
              maxHeight: "8rem",
              minHeight: "8rem",
            }}
            ref={inputDesc}
            defaultValue={data?.description}
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
            className="placeholder-gray-500 ml-5 pt-3 pl-2 text-xs w-[18rem] flex-shrink-0 border-2 border-solid border-gray-500 rounded-md over"
            style={{
              maxHeight: "8rem",
              minHeight: "8rem",
            }}
            ref={inputAbout}
            defaultValue={data?.about}
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
            ref={inputStatus}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
          >
            <option defaultValue={data?.status}>{data?.status}</option>
            <option value="Active">Active</option>
            <option value="Deactivate">Deactivate</option>
          </select>
        </div>

        <div className="w-[18rem] flex flex-col h-14  m-0 justify-center mb-2">
          <p className="text-xs ml-5">click to change primary image</p>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            className="placeholder-gray-500 ml-5 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            onChange={imageHandle}
          />
        </div>

        <div>
          {imgOpen ? (
            <img src={preview} alt="preview image" 
            className="w-56 rounded-md"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }} />
          ) : (
            <img
              className="w-56 rounded-md"
              src={data?.primaryImage}
              alt="image"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            />
          )}
        </div>
          {
            errorOpen&&(
              <p className="text-xs text-red-600">{error}</p>
            )
          }
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

export default EditEvent;
