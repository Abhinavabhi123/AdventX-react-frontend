import  { useEffect, useState, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import UserIdContext from "../../../Store/Context/UserContext";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import { userActions } from "../../../Store/redux/UserAuth";
import UserAxios from "../../../Store/Axios/UserConfig";
import { showErrorToast } from "../../ToastMessage/Toast";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  image: string;
}

function Profile() {
  const navigate = useNavigate();
  const value = useContext(UserIdContext);
  const isPrime = useSelector((state: any) => state.user.is_prime);
  const id = value?.id;
  const dispatch = useDispatch();
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
        await UserAxios.get(`getUserProfile/${id}`).then((response) => {
          if (response?.data?.status === 200) {
            setUserData(response?.data?.userData);
          }
        }).catch((error)=>{
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/error500")
          }
        })
      }
    })();
  }, [id, imgChange]);

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
      await UserAxios
        .post(
          `userImage`,
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
            setImgOpen(false);
          }
        }).catch((error)=>{
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("Something wrong")
          }else{
            navigate("/error500")
          }
        })
    } catch (error) {
      console.error(error);
    }
  };
  const logOut = () => {
    Cookies.remove("jwtToken");
    dispatch(
      userActions.userLogout({
        userName: "",
        email: "",
        _id: "",
        is_prime: false,
        status: false,
      })
    );

    navigate("/userLogin");
  };

  return (
    <div className="w-[95%] h-[95%]  flex justify-around">
      <div className="w-[27%] rounded-md h-[80%] bg-gray-200 bg-opacity-50">
        <div className="w-full h-[62%] bg-transparent">
          <div className="w-full h-[40%] flex justify-center items-center">
            <div className="w-36 h-36 rounded-full bg-transparent flex justify-center items-center">
              {userData?.image && !imgOpen ? (
                <img
                  className="w-[8rem] h-[8rem] rounded-full absolute"
                  src={`${import.meta.env.VITE_USERIMAGE_API}${userData?.image}`}
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
              <p className=" flex">
                Name: {`${userData?.firstName} ${userData?.lastName}`}
                {isPrime && (
                  <img
                    className="w-5 ml-3 h-5"
                    src="/icons/vip.png"
                    alt="prime"
                  />
                )}
              </p>
              <p>Email: {userData?.email}</p>
              <p>Mobile: {userData?.mobile}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[10%] flex justify-start items-center">
          <button
            className="w-16 ms-[2.5rem] h-7 bg-blue-200  hover:bg-gray-300 text-center  rounded-md text-sm flex items-center justify-evenly"
            onClick={logOut}
          >
            <img className="w-4 rotate-180" src="/icons/exit.png" alt="exit" />
            Exit
          </button>
        </div>
        <div className="w-full h-[28%] bg-transparent flex justify-center items-center">
          {!isPrime && (
            <div className="w-[80%] h-[80%] bg-red-200 flex bg-opacity-50 rounded-lg">
              <div className="w-[20%] h-full flex justify-center items-center">
                <img className="w-10" src="/icons/crown.png" alt="" />
              </div>
              <div className=" w-[80%] h-full flex flex-col justify-evenly items-center">
                <p className="text-sm">Plus Membership Now Available</p>
                <p className="text-xs text-gray-500">Only $24.38</p>
                <button
                  className="w-36 h-10 flex justify-evenly items-center text-xs  bg-green-400 rounded-2xl"
                  onClick={() => navigate("/subscribe")}
                >
                  Get Membership
                  <img
                    className="w-5"
                    src="/icons/right_arrow.png"
                    alt="arrow"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[68%] h-fit rounded-md bg-gray-200 bg-opacity-50">
        <ProfileDetails />
      </div>
    </div>
  );
}

export default Profile;
