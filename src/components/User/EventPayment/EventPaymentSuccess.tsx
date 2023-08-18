import { useEffect } from "react";
import NavBar from "../NavBar/Navbar";
import UserAxios from "../../../Store/Axios/UserConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";


function EventPaymentSuccess() {
    const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const _id = urlParams.get("_id");
  const license = urlParams.get("li")
  const vehicle = urlParams.get("veh")
  const eventId = urlParams.get("eveId");
  const userId = useSelector((state: any) => state.user._id);
  
  useEffect(() => {
    if (_id&&eventId&&userId&&license&&vehicle) {
      (async () => {
        await UserAxios.post("addParticipation",{_id,eventId,userId,vehicle,license}).then((response)=>{
            if(response?.data?.status===200){
                setTimeout(()=>{
                    navigate("/")
                },2000)
            }
        }).catch((error)=>{
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/error500")
          }
        })
      })();
    }
  }, [_id,eventId,userId,license,vehicle]);

  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="w-full h-20 bg-red-400">
        <NavBar />
      </div>
      <div className="w-full h-[89%]  flex justify-center items-center">
        <div className="flex h-full relative flex-col items-center">
          <p className="absolute text-2xl mt-20">Payment success</p>
          <img
            className="bg-transparent border shadow-2xl rounded-md"
            src="/gifs/done gifs.gif"
            alt=""
          />
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default EventPaymentSuccess;
