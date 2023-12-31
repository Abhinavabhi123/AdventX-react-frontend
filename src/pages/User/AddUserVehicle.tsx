import NavBar from "../../components/User/NavBar/Navbar";
import Vehicles from "../../components/User/AddVehicle/Vehicles";
import AddVehicle from "../../components/User/AddVehicle/AddVehicle";

function AddUserVehicle() {
  return (
    <div className=" w-[99vw] h-[100vh]">
      <div className=" w-full h-20">
        <NavBar />
      </div>
      <div className="w-full h-[50rem] bg-white flex items-center justify-evenly">
        <Vehicles/>
        <AddVehicle/>
      </div>
    </div>
  );
}

export default AddUserVehicle;
