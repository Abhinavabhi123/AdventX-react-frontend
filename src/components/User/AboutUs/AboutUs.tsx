import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Data{
    communityCount: number,
    eventCount:number,
    userCount:number
}

function AboutUs() {
  const navigate =useNavigate()
  const [data, setData] = useState<Data>({
    communityCount:0,
    eventCount:0,
    userCount:0
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await axios
        .get(`${import.meta.env.VITE_USER_API}about`)
        .then((response) => {
          if (response?.data?.status === 200) {
            setData(response?.data?.data);
          }
        }).catch((error)=>{
          console.error(error);
          navigate("/error500")
        })

    })();
  }, []);

  return (
    <div className="w-full h-[40rem] flex flex-col items-center">
      <div className="w-full h-20 bg-transparent flex items-end ps-[15rem]">
        <p className="text-2xl font-bold">About AdventX</p>
      </div>
      <div className="w-full h-full bg-transparent flex justify-center items-center">
        <div className="w-[80%] h-[90%] bg-transparent rounded-md border border-gray-300 flex">
          <div className="w-[50%] h-full bg-transparent rounded-s-md flex justify-center items-center">
            <div className="w-[80%] h-[50%] bg-transparent rounded-md">
              <img
                className="w-full h-full rounded-md object-cover"
                src="https://images.unsplash.com/photo-1618564340323-28f633e4c748?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9mZnJvYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                alt="image"
              />
            </div>
          </div>
          <div className="w-[50%] h-full bg-transparent rounded-e-md flex flex-col justify-center">
            <div className="w-full h-28 ps-10 mt-4">
              <h1 className="text-[2.3rem]">Explore Your Dream </h1>
              <h1 className="text-[2.3rem]">With Us</h1>
            </div>
            <div className="p-4 pe-8">
              <p>
                This is the community for driver and riders who are interested
                in the adventure traveling, those who love off-road driving and
                vehicle maniac. Join the community and explore the world with
                us.
              </p>
            </div>
            <div className="w-full h-28 bg-transparent border-t border-gray-300 flex items-center gap-4 ps-3 ">
              <div className="w-28 h-20 bg-gray-200 rounded-md flex flex-col justify-center items-center">
                <p className="text-md">{data?.userCount}+</p>
                <p className="text-md">Users </p>
              </div>
              <div className="w-28 h-20 bg-gray-200 rounded-md flex flex-col justify-center items-center">
                <p className="text-md">{data?.eventCount}+</p>
                <p className="text-md">Events </p>
              </div>
              <div className="w-28 h-20 bg-gray-200 rounded-md flex flex-col justify-center items-center">
                <p className="text-md">{data?.communityCount}+</p>
                <p className="text-md ">Communities </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
