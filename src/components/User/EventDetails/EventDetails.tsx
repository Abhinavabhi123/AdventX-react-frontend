import { useEffect } from "react";
import UserAxios from "../../../Store/Axios/UserConfig";
import { useSelector } from "react-redux";

function EventDetails() {
  const userId:string = useSelector((state: any) => state?.user?._id);
  useEffect(() => {
    if (userId) {
      (async () => {
        await UserAxios.get(`userEvents/${userId}`)
          .then((response) => {
            if (response?.data?.status === 200) {
              console.log();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    }
  }, [userId]);

  
  return (
    <div className="w-full h-[34.5em] bg-red-400 flex justify-center items-center">
      <div className="w-[90%] h-[90%] bg-green-400"></div>
    </div>
  );
}

export default EventDetails;
