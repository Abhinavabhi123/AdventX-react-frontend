import React, { useEffect, useState, useRef } from "react";
import UserAxios from "../../../Store/Axios/UserConfig";
import io from "socket.io-client";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./roomChat.css";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";

interface Props {
  commId: string | number;
  change: boolean;
}
interface Community {
  communityName: string;
  logo: string;
}
interface ChatMessage {
  userId: string;
  message: string;
}

function ChatRoom({ commId, change }: Props) {
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.user._id);
  const [communityData, setCommunityData] = useState<Community>({
    communityName: "",
    logo: "",
  });
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const lastMessageRef = useRef(null);
  const [changed, setChanged] = useState<boolean>(false);
  const [commUsers, setCommUsers] = useState([
    {
      image: "",
      firstName: "",
      lastName: "",
    },
  ]);
  const [messages, setMessages] = useState([
    {
      message: "",
      userId: "",
      userName: "",
    },
  ]);
  const [msg, setMsg] = useState<string>("");
  const socket = io(import.meta.env.VITE_USER_DOMAIN);
  useEffect(() => {
    socket.emit("joinRoom", { commId, userId });
    socket.on("message", ({ message: msg }) => {
      const newMessage: ChatMessage = { userId, message: msg };
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [changed]);

  useEffect(() => {
    (async () => {
      await UserAxios.get("/getUserCommunity", { params: { commId } })
        .then((response) => {
          if (response?.data?.status === 200) {
            setCommunityData(response?.data?.communityData);
          }
        })
        .catch((error) => {
          console.error(error);
          if (error?.response?.data?.status !== 500) {
            showErrorToast(error?.response?.data?.error);
          } else {
            navigate("/error500");
          }
        });

      await UserAxios.get("/communityUsers", { params: { commId } })
        .then((response) => {
          if (response?.data?.status === 200) {
            setCommUsers(response?.data?.commUsers);
          }
        })
        .catch((err) => {
          console.error(err);
          if(err?.response?.data?.status!==500){
            showErrorToast(err?.response?.data?.error)
          }else{
            navigate("/error500")
          }
        });
    })();
  }, [commId]);

  useEffect(() => {
    (async () => {
      await UserAxios.post("/getMessages", { commId }).then((response) => {
        if (response?.data?.status === 200) {
          setMessages(response?.data?.messages);
          scrollToLastMessage();
        }
      });
    })();
  }, [changed, change, commId, userId]);
  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      // lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openPicker = () => {
    setEmojiOpen(!emojiOpen);
  };

  const handleEmojiClick = (emoji: EmojiClickData) => {
    let message = msg;
    message += emoji.emoji;

    setMsg(message);
  };

  const submitChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (msg.length > 0) {
      await UserAxios.post("/postMessage", { commId, userId, message: msg })
        .then((response) => {
          if (response?.data?.status === 200) {
            const message = msg;
            socket.emit("chatMessage", { commId, userId, message });
            setChanged(!changed);
            setMsg("");
            setEmojiOpen(false);
            scrollToLastMessage();
          }
        })
        .catch((error) => {
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/error500")
          }
        });
    }
  };

  return (
    <div className="h-[97%] w-[97%] bg-gray-200 border bg-opacity-50 border-violet-500 rounded-md border-dashed flex ">
      <div className=" w-[60%] h-full bg-white rounded-t-md flex flex-col items-center">
        <div className="w-full h-[4rem]  border-b border-gray-400 bg-[#c4b5fd] rounded-t-md flex justify-between items-center pe-5 ps-5">
          <div>
            <p className=" text-xl">{communityData?.communityName}</p>
          </div>
          <div className="flex justify-between items-center w-28">
            <img
              src={`${import.meta.env.VITE_IMAGE_API}${communityData?.logo}`}
              alt="community logo"
              className="w-12 h-12 rounded-full"
            />

            <div
              className=" flex flex-col cursor-pointer"
              onClick={() => {
                detailsOpen ? setDetailsOpen(false) : setDetailsOpen(true);
              }}
            >
              <span className="font-bold select-none">. . .</span>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[43.4rem] rounded-b-md  bg-lime-100">
          <div className="w-[99%] h-[93%] pt-3  overflow-y-scroll over ">
            {/* chat messages */}
            {messages.map((message, i) => {
              const isLastMessage = i === messages.length - 1;

              return (
                <div
                  key={i}
                  className={`w-full h-12 ${
                    message?.userId === userId ? "You" : "other"
                  }`}
                >
                  <div
                    className={`charMessage`}
                    ref={isLastMessage ? lastMessageRef : null}
                  >
                    <p className="text-[10px] italic">
                      {message?.userId === userId ? "You" : message?.userName}
                    </p>
                    <p
                      className={`${
                        message?.userId === userId ? "chatRight" : "chatLeft"
                      }`}
                    >
                      {message?.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full h-[7%] bg-white flex justify-center items-center">
            <div className="w-full h-[95%] border border-dashed border-black">
              <form
                onSubmit={submitChat}
                className=" w-full h-full flex  items-center ps-4 pe-4 justify-between cursor-pointer"
              >
                <div>
                  <img
                    src="/icons/smile.png"
                    className="w-8 relative"
                    onClick={openPicker}
                  />
                  {emojiOpen && (
                    <div className="emojiPicker">
                      <Picker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    className="w-[100%] h-10 ps-3 text-sm"
                    value={msg}
                    placeholder="Text here"
                    onChange={(e) => {
                      setMsg(e.target.value);
                      setEmojiOpen(false);
                    }}
                  />
                </div>
                <button type="submit">
                  <img src="/icons/send.png" alt="send btn" className="w-8" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {detailsOpen && (
        <div className=" w-[40%] h-full bg-[#fef3c7 ]">
          <div className="w-full h-16 rounded-t-md bg-gray-300 flex items-center ps-3">
            <p className="text-md select-none">Participants</p>
          </div>
          <div className="w-full h-[43.4rem]  flex flex-col items-center overflow-y-scroll over">
            {commUsers.map((users, i) => {
              return (
                <div
                  key={i}
                  className="w-[98%] h-14 bg-white border border-gray-400 flex justify-start gap-5 items-center ps-3 pe-3 hover:bg-red-100"
                >
                  <div>
                    {users?.image ? (
                      <img
                        src={`${import.meta.env.VITE_USERIMAGE_API}${
                          users?.image
                        }`}
                        alt="user logo"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <img
                        src="/icons/person.png "
                        alt="user logo"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <p>{`${users?.firstName} ${users?.lastName}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Toaster/>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
