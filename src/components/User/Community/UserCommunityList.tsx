import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client';
import UserAxios from "../../../Store/Axios/UserConfig";

import ChatRoom from "./ChatRoom";
import EmptyChat from "./EmptyChat";

interface UserData {
  image: string;
}

function UserCommunityList() {
  const id: string = useSelector((state: any) => state?.user?._id);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [commId, setCommId] = useState<string>("");
  const [userData, setUserData] = useState<UserData>({
    image: "",
  });
  const [communities, setCommunities] = useState([
    { logo: "", communityName: "", _id: "" },
  ]);
  // const { userChanges, setUserChanges } = useContext(UserChangeContext)

  useEffect(() => {
    (async () => {
      if (id) {
        await UserAxios.get(`/userDetails/${id}`).then((response) => {
          if (response?.data?.status === 200) {
            setUserData(response?.data?.userData);
          }
        });
        await UserAxios.get(`/userCommunities/${id}`).then((response) => {
          if (response?.data?.status === 200) {
            console.log(response, "opopopo");

            setCommunities(response?.data?.array);
          }
        });
      }
    })();
  }, [id]);

  useEffect(()=>{
    const socket = io(import.meta.env.VITE_USER_DOMAIN);
    socket.on("connection",()=>{
      console.log("connected to the server");
    })
    
  },[])

  return (
    <div className="flex w-full h-full">
      <div className=" w-[20%] h-full bg-white flex items-center ">
        <div
          className="w-[95%] h-[98%]  rounded-r-lg"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
          }}
        >
          <div className="w-full h-14 bg-yellow-500 rounded-tr-lg flex " onClick={()=>setChatOpen(false)}>
            <div className="h-full bg-transparent w-[80%] flex items-center pl-5">
              <h1 className="text-lg ">Chats</h1>
            </div>
            <div className="h-full bg-transparent w-[21%] rounded-tr-lg flex justify-center items-center">
              {!userData?.image?
              (
                <div
                style={{
                  backgroundSize: "2rem 2rem",
                  backgroundImage: "url('/icons/person.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
                className=" w-10 h-10 rounded-full"
              ></div>
            ):(  <img
              className="w-10 h-10 rounded-full"
              src={`${import.meta.env.VITE_USERIMAGE_API}${userData?.image}`}
              alt=""
            />)}
              
            </div>
          </div>
          <div className="w-full h-[45rem] bg-transparent rounded-br-lg overflow-y-scroll">
            {communities.map((community, i) => {
              return (
                <div
                  key={i}
                  className="w-full h-14 flex items-center hover:bg-gray-300 pl-3 pr-3 cursor-pointer bg-white border-b border-gray-700"
                  onClick={() => {
                    setCommId(community?._id);
                    setChatOpen(true);
                  }}
                >
                  <img
                    className="w-10 rounded-full  h-10"
                    src={`${import.meta.env.VITE_IMAGE_API}${community?.logo}`}
                    alt=""
                  />
                  <p className="text-sm pl-4 truncate ">
                    {community?.communityName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[80%] h-[50rem] bg-white flex justify-center items-center">
        <div className="w-[98%] h-[98%] bg-transparent rounded-md flex justify-center items-center">
          {chatOpen ? <ChatRoom commId={commId}/> : <EmptyChat />}
        </div>
      </div>
    </div>
  );
}

export default UserCommunityList;
