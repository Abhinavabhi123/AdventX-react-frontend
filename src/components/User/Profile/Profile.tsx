import React, { useEffect, useState, useContext, ChangeEvent } from "react";
import axios from "axios";
import UserIdContext from "../../../Store/Context/UserContext";

import { useSelector } from "react-redux";
import { ImgApi, UserApi, userImgApi } from "../../../Store/api";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  image: string;
}

function Profile() {
  const value = useContext(UserIdContext);
  // const id: string = useSelector((state: any) => state.user._id);
  console.log(useContext(UserIdContext), "helloo");
  const id = value?.id;
  console.log(id, "idd");

  const [userData, setUserData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: 0,
    image: "",
  });
  const [images, setImage] = useState<File | string>();
  const [preview, setPreview] = useState<string>("");
  const [imgOpen, setImgOpen] = useState<boolean>(false);
  const [imgChange, setImgChange] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (id) {
        await axios.get(`${UserApi}getUserProfile/${id}`).then((response) => {
          console.log(response);
          if (response?.data?.status === 200) {
            setUserData(response?.data?.userData);
          }
        });
      }
    })();
  }, [id, imgChange]);

  console.log(userData, "gaogjoj");

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage("");
      setImgOpen(false);
      const file = event.target.files?.[0];
      if (file) {
        const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
        if (!allowedType.includes(file.type)) {
          alert("Only jpeg and png files are supported");
          setImage("");
          setImgOpen(false);
          return;
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          alert("file size is too large");
          setImage("");
          setImgOpen(false);
          return;
        }
        console.log("success");
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setImgOpen(true);
      }
    }
  };
  const removeImg = () => {
    setImage("");
    setPreview("");
    setImgOpen(false);
  };

  const saveImage = async () => {
    try {
      await axios
        .post(
          `${UserApi}userImage`,
          { images, id },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response?.data?.status === 200) {
            imgChange ? setImgChange(false) : setImgChange(true);
            setImgOpen(false)
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[95%] h-[95%]  flex justify-around">
      <div className="w-[27%] rounded-md h-[80%] bg-gray-200">
        <div className="w-full h-[72%] bg-transparent">
          <div className="w-full h-[40%] flex justify-center items-center">
            <div className="w-36 h-36 rounded-full bg-transparent flex justify-center items-center">
              {userData?.image && !imgOpen ? (
                <img
                  className="w-[8rem] h-[8rem] rounded-full absolute"
                  src={`${userImgApi}${userData?.image}`}
                  alt="profile"
                />
              ) : !imgOpen ? (
                <div
                  className="w-36 h-36 absolute"
                  style={{
                    backgroundImage: `url('/icons/person.png')`,
                    backgroundSize: "8rem 8rem",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                  }}
                ></div>
              ) : (
                <img
                  className="w-[8rem] h-[8rem] rounded-full absolute"
                  src={preview}
                  alt="profile"
                />
              )}

              <input
                className="relative w-36 h-36 rounded-full opacity-0 cursor-pointer"
                type="file"
                accept="image/*"
                onChange={uploadImage}
              />
            </div>
          </div>
          {imgOpen && (
            <div className="w-full h-12 bg-transparent flex justify-center items-center">
              <div className="w-[35%] h-[50%] bg-transparent flex justify-between">
                <button
                  className="text-xs w-14 h-6 bg-gray-300 rounded-md"
                  onClick={removeImg}
                >
                  Remove
                </button>
                <button
                  className="text-xs w-14 h-6 bg-sky-400 rounded-md"
                  onClick={saveImage}
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <div className="w-full h-[40%] bg-transparent flex justify-center items-center">
            <div className="flex  flex-col items-center">
              <p>Name: {`${userData?.firstName} ${userData?.lastName}`}</p>
              <p>Email: {userData?.email}</p>
              <p>Mobile: {userData?.mobile}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[28%] bg-sky-300"></div>
      </div>
      <div className="w-[68%] rounded-md h-[80%] bg-amber-300"></div>
    </div>
  );
}

export default Profile;
