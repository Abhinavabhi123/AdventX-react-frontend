import {Dispatch,SetStateAction} from "react";
import UserAxios from "../../../Store/Axios/UserConfig";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

interface Vehicle {
  vehicle: any;
  setChanged:Dispatch<SetStateAction<boolean>>;
  changed:boolean
}

function VehicleCard({ vehicle,setChanged,changed }: Vehicle) {
const navigate = useNavigate()
  const deleteVehicle=async()=>{
    
    await UserAxios.delete(`/deleteVehicle/${vehicle._id}`).then((response)=>{
      if(response?.data?.status===200){
        changed?setChanged(false):setChanged(true)
      }
    }).catch((error)=>{
      console.error(error);
      if(error?.response?.data.status!==500){
        showErrorToast("Something error in the delete vehicle")
      }else{
        navigate("/error500")
      }
    })
    
  }
  return (
    <div className="w-full h-32 bg-[#d1d7f1] flex mb-2">
      <div className="w-[33.3%] h-full flex justify-center items-center ">
        <div className="w-[60%] h-[90%]  rounded-md">
          <img
            src={`${import.meta.env.VITE_VEHICLE_API}${vehicle?.images[0]}`}
            alt="image"
            className="w-full h-full rounded-md"
          />
        </div>
      </div>
      <div className="w-[33.3%] h-full  flex flex-col gap-1">
        {/* <div className="w-[90%] h-[95%] bg-sky-500"> */}
        <p className="text-xs ms-2 mt-2">Name : {vehicle?.vehicleName}</p>
        <p className="text-xs ms-2">Number : {vehicle?.vehicleNumber}</p>
        <p className="text-xs ms-2">Type : {vehicle?.vehicleType}</p>
        <p className="text-xs ms-2">Fuel Type: {vehicle?.fuelType}</p>
        <p className="text-xs ms-2">wheels :{vehicle?.wheelCount}</p>
        <p className="text-xs ms-2">Owner : {vehicle?.ownerName}</p>
        {/* </div> */}
      </div>
      <div className="w-[33.3%] h-full  flex flex-col justify-between items-end">
        {vehicle?.approved === true ? (
          <button className="w-20 h-5 rounded-lg bg-green-400 mt-2 me-2 text-xs">Approved</button>
        ) : (
          <button className="w-24 h-5 rounded-lg bg-red-400  mt-2 me-2 text-xs">Not approved</button>
        )}

        <button className="mb-2 me-2">
            <img src='/icons/delete1.png' className="w-5" alt="vehicle image" onClick={deleteVehicle}/>
        </button>
      </div>
      <Toaster/>
    </div>
  );
}

export default VehicleCard;
