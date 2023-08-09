import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserAxios from "../../../Store/Axios/UserConfig";
import VehicleCard from "./VehicleCard";

interface Vehicle {
  _id: string;
  images: string[];
  vehicleName: string;
  vehicleNumber: string;
  vehicleType: string;
  wheelCount: number;
  ownerName: string;
  fuelType: string;
}

function Vehicles() {
  const id = useSelector((state: any) => state.user._id);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      _id: "",
      images: [""],
      vehicleName: "",
      vehicleNumber: "",
      vehicleType: "",
      wheelCount: 0,
      ownerName: "",
      fuelType: "",
    },
  ]);
  useEffect(() => {
    if (id) {
      (async () => {
        await UserAxios.get(`/getAllVehicles/${id}`).then((response) => {
          if (response?.data?.status === 200) {
            setVehicles(response?.data?.vehicleData);
          }
        });
      })();
    }
  }, [id]);

  return (
    <div className="w-[30%] h-[50rem] bg-transparent flex justify-center pt-5">
      <div
        className="w-[80%] h-[90%] bg-white rounded-md"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <div className="w-full h-10 bg-red-300 rounded-t-md flex justify-center items-center border-b  border-gray-500">
          <p>Your Vehicles</p>
        </div>
        <div className="w-full h-full bg-white flex flex-col items-center pt-2 overflow-y-scroll over">
          {vehicles.map((vehicle, i) => {
            return <VehicleCard key={i} vehicle={vehicle} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Vehicles;
