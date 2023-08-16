import React, { useRef, useEffect, useContext, useState } from "react";
import UserIdContext from "../../../Store/Context/UserContext";
import UserAxios from "../../../Store/Axios/UserConfig";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

interface Data{
    area:string;
    houseName:string;
    district:string;
    locality:string;
    state:string;
    zipCode:string
}

function EditAddress() {
    const userId = useContext(UserIdContext);
    const navigate =useNavigate()
    const [changed,setChanged]=useState<boolean>(false)
    const [data,setData]=useState<Data>({
        area:"",
        houseName:"",
        district:"",
        locality:"",
        state:"",
        zipCode:""
    })
  useEffect(()=>{
    (async()=>{
        if(userId){

            await UserAxios.get(`getUserProfile/${userId?.id}`).then((response)=>{
                if(response?.data?.status===200){
                    setData(response?.data?.userData?.address)
                }
            }) .catch((error)=>{
              console.error(error);
              navigate("/error500")
            })
        }
        })()
  },[changed,userId])
  const nameInputRef = useRef<HTMLInputElement>(null);
  const localityRef = useRef<HTMLInputElement>(null);
  const areasRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLSelectElement>(null);
  const stateRef = useRef<HTMLSelectElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const houseName: string | undefined = nameInputRef?.current?.value;
      const locality = localityRef?.current?.value;
      const area = areasRef?.current?.value;
      const district = districtRef?.current?.value;
      const state = stateRef?.current?.value;
      const zip = zipRef?.current?.value;

      if (
        houseName === undefined ||
        locality == undefined ||
        area === undefined ||
        district === undefined ||
        state === undefined ||
        zip === undefined
      ) {
        return;
      } else {

        if (
          houseName.length > 0 &&
          locality.length > 0 &&
          area?.length > 0 &&
          district?.length > 0 &&
          state?.length > 0 &&
          zip.length > 0
          ) {
          if (houseName.trim() === "") {
            showErrorToast("Please enter the house name")
            return;
          }
          if (houseName[0] === " ") {
          showErrorToast("Please remove the space before house name")
          return;
        }
        
        const symbols = /[-!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/;
        if (symbols.test(houseName)) {
          showErrorToast("Please remove the symbol in the house name")
            return;
          }
          if (locality.trim() === "") {
            showErrorToast("Please enter the location")
            return;
          }
          if (locality[0] === " ") {
            showErrorToast("Please remove the space before location")
            return;
          }
          if (symbols.test(locality)) {
          showErrorToast("Please remove the symbol in the location")
          return;
          }
          if (area.trim() === "") {
            showErrorToast("Please enter the area")
            return;
          }
          if (area[0] === " ") {
            showErrorToast("Please remove the space before area")
            return;
          }
          if (symbols.test(area)) {
            showErrorToast("Please remove the symbol in the area")
            return;
          }
          if (district === "Select state") {
            showErrorToast("Please select your district")
            return;
          }
          if (state === "Select state") {
            showErrorToast("Please select your state")
            return;
          }
          if (zip.length !== 6) {
            showErrorToast("Zip code must have 6 characters")
            return;
          }
          const e = "e";
          if (e.includes(zip)) {
          showErrorToast("Please check Zip code")
            return;
          }
          const formData = {
            houseName,
            locality,
            area,
            district,
            state,
            zip,
            userId,
          };
          
          await UserAxios
            .post(`postAddress`, formData)
            .then((response) => {

              if (response.data.status === 200) {
                changed?setChanged(false):setChanged(true)
                showSuccessToast(response?.data?.message)
              }
            }).catch((error)=>{
              if(error?.response?.data?.status===500){
                navigate("/error500")
              }else{
                showErrorToast(error?.response?.data?.error)
              }
            })
        } else {
          showErrorToast("Please fill all the field")
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[50%] h-full ">
      <div className="w-full h-10 flex items-center ps-5 ">
        <p>Address Details:</p>
      </div>
      <form
        className=" border-s border-black w-full h-[36rem] flex justify-center"
        onSubmit={submitForm}
      >
        <div className="flex flex-col h-[36rem]  gap-4 items-center">
          {/* first input field */}
          <div className="w-[18rem] flex flex-col h-14 mt-5 m-0 justify-center">
            <p className="text-sm">
              House Name
              <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              ref={nameInputRef}
              defaultValue={data?.houseName}
              name="houseName"
              placeholder="Enter house name"
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          {/* second input field */}
          <div>
            <p className="text-sm">
              Locality
              <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              ref={localityRef}
              defaultValue={data?.locality}
              name="locality"
              placeholder="Enter Locality"
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          {/* third input field */}
          <div>
            <p className="text-sm">
              Area
              <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              ref={areasRef}
              defaultValue={data?.area}
              name="area"
              placeholder="Enter area"
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          {/* forth input field */}

          {/* fifth input field */}
          <div>
            <p className="text-sm">
              District
              <span className="text-red-500">*</span>
            </p>
            <select
              name="district"
              ref={districtRef}
              defaultValue={data?.district}
              placeholder="Select district"
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            >
              <option>{data?.district?data?.district:"Select District"}</option>
              <option value="Kasaragod">Kasaragod</option>
              <option value="Kannur">Kannur</option>
              <option value="Kozhikode"> Kozhikode</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Palakkad"> Palakkad</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Eranakulam">Eranakulam</option>
              <option value="Idikki">Idikki</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Alappuzha"> Alappuzha</option>
              <option value="Pathanamthitta">Pathanamthitta</option>
              <option value="Kollam">Kollam</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
            </select>
          </div>
          {/* sixth input field */}
          <div>
            <p className="text-sm">
              State
              <span className="text-red-500">*</span>
            </p>
            <select
              name="state"
              ref={stateRef}
              defaultValue={data?.state}
              placeholder="Select state"
              className="placeholder-gray-500 pl-2  text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            >
              <option>{data?.state?data?.state :"Select state"}</option>
              <option value="Kerala">Kerala</option>
            </select>
          </div>
          {/* seventh input field */}
          <div>
            <p className="text-sm">
              Zip code
              <span className="text-red-500">*</span>
            </p>
            <input
              type="Number"
              ref={zipRef}
              defaultValue={data?.zipCode}
              name="zip code"
              placeholder="Enter zip code"
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
            />
          </div>
          <div className="w-full h-[10rem] flex justify-center items-end ">
            <div className="w-40 h-6 mb-5  flex justify-between">
              <button
                type="reset"
                className="bg-red-400 bg-opacity-60 w-16 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-400 w-16 rounded-md text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      <Toaster/>
    </div>
  );
}

export default EditAddress;
