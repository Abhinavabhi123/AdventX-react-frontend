import axios from "axios";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster, toast } from "react-hot-toast";
import { deleteImage, uploadImage } from "../../../Store/Firebase/Firebase";

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
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/admin/error500")
          }
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

  const submitDetails = async () => {
    try {
      const eventName = inputName.current?.value;
      const subName = inputSub.current?.value;
      const location = inputLocation.current?.value;
      const date = inputDate.current?.value;
      const type = inputType.current?.value;
      const fee = inputFee.current?.value;
      const first = inputFirst.current?.value;
      const second = inputSecond.current?.value;
      const third = inputThird.current?.value;
      const desc = inputDesc.current?.value;
      const about = inputAbout.current?.value;
      const status = inputStatus.current?.value;
      if (
        eventName === undefined ||
        subName === undefined ||
        location === undefined ||
        date === undefined ||
        type === undefined ||
        fee === undefined ||
        second === undefined ||
        third === undefined ||
        desc === undefined ||
        about === undefined ||
        status === undefined ||
        first === undefined
      ) {
        showErrorToast("Something went wrong");
        return;
      }
      const symbols = /[!#$%&()*+/:;<=>?@[\\\]^_`{|}~]/;
      const symbol = /[!"#$%&'()*+.:;<=>?@[\\\]^_`{|}~]/;
      if (eventName?.length <= 0) {
        showErrorToast("Please enter the event name");
        return;
      }
      if (eventName.trim() === "") {
        showErrorToast("Please enter the event name");
        return;
      }
      if (eventName[0] === " ") {
        showErrorToast("Remove the space before the text");
        return;
      }
      if (symbols.test(eventName)) {
        showErrorToast("Remove the special symbols in the event name");
        return;
      }
      // .......................
      if (subName?.length <= 0) {
        showErrorToast("Please enter the sub title");
        return;
      }
      if (subName.trim() === "") {
        showErrorToast("Please enter the sub title");
        return;
      }
      if (subName[0] === " ") {
        showErrorToast("Remove the space before the text");
        return;
      }
      if (symbols.test(subName)) {
        showErrorToast("Remove the special symbols in the event name");
        return;
      }
      // ......................
      if (location?.length <= 0) {
        showErrorToast("Please enter the sub title");
        return;
      }
      if (location.trim() === "") {
        showErrorToast("Please enter the sub title");
        return;
      }
      if (location[0] === " ") {
        showErrorToast("Remove the space before the text");
        return;
      }
      if (symbol.test(subName)) {
        showErrorToast("Remove the special symbols in the event name");
        return;
      }
      // ......................
      if (!date) {
        showErrorToast("Please select the date");
        return;
      }
      const today = new Date().getTime();
      const result = new Date(date).getTime();
      if (result < today) {
        showErrorToast("Not a valid date");
        return;
      }
      // ......................
      if (type?.length <= 0) {
        showErrorToast("Please enter the event type");
        return;
      }
      if (type.trim() === "") {
        showErrorToast("Please enter the event type");
        return;
      }
      if (type[0] === " ") {
        showErrorToast("Remove the space before the text");
        return;
      }
      if (symbols.test(type)) {
        showErrorToast("Remove the special symbols in the event name");
        return;
      }
      // ......................
      if (Number(fee) <= 0) {
        showErrorToast("Amount is not  valid");
        return;
      }
      if (Number(first) <= 0) {
        showErrorToast("Amount is not  valid");
        return;
      }
      if (Number(second) <= 0) {
        showErrorToast("Second price is not  valid");
        return;
      }
      if (Number(third) <= 0) {
        showErrorToast("Third price is not  valid");
        return;
      }
      // .....................
      if (desc.length <= 0) {
        showErrorToast("Please enter the event type");
        return;
      }
      if (desc.trim() === "") {
        showErrorToast("Please enter the event type");
        return;
      }
      if (desc[0] === " ") {
        showErrorToast("Remove the space before the text");
        return;
      }
      if (symbols.test(desc)) {
        showErrorToast("Remove the special symbols in the event name 5");
        return;
      }
      // .....................
      if (about.length <= 0) {
        showErrorToast("Please enter the event type");
        return;
      }
      if (about.trim() === "") {
        showErrorToast("Please enter the event type");
        return;
      }
      if (about[0] === " ") {
        showErrorToast("Remove the space before the text");
        return;
      }
      if (symbols.test(about)) {
        showErrorToast("Remove the special symbols in the event name");
        return;
      }
      // ................
      if (status === "select status") {
        showErrorToast("Please select the status");
        return;
      }
      if (image) {

        toast.loading("Please Wait image is uploading");
        await uploadImage(image).then(async (data) => {
          if (data) {

            setTimeout(async () => {
              await AdminAxios.post(`/editEventImage/${id}`, {
                eventName,
                subTitle: subName,
                location,
                date,
                type,
                fee,
                firstPrice: first,
                secondPrice: second,
                thirdPrice: third,
                description: desc,
                about,
                status,
                imageUrl: data,
              }).then(async (response) => {
                if (response?.data?.status === 200) {
                  await deleteImage(
                    response?.data?.eventData?.primaryImage
                  ).then(() => {
                    toast.dismiss();
                    navigate("/admin/eventManagement");
                  }).catch((error)=>{
                    console.error(error);
                    if(error?.response?.data?.status!==500){
                      showErrorToast("something wrong")
                    }else{
                      navigate("/admin/error500")
                    }
                  })
                }
              });
            }, 1500);
          }
        });
      }
       if(!image) {
        setTimeout(async () => {
          await AdminAxios.post(`editEvent/${id}`, {
            eventName,
            subTitle: subName,
            location,
            date,
            type,
            fee,
            firstPrice: first,
            secondPrice: second,
            thirdPrice: third,
            description: desc,
            about,
            status,
          })
            .then((response) => {
              if (response?.data?.status === 200) {
                navigate("/admin/eventManagement");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }, 1500);
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
            <img
              src={preview}
              alt="preview image"
              className="w-56 rounded-md"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            />
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
        {errorOpen && <p className="text-xs text-red-600">{error}</p>}
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
