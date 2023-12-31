import { useState, ChangeEvent, useEffect,useRef } from "react";
import { showErrorToast, showSuccessToast } from "../../ToastMessage/Toast";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import EventImages from "./EventImages";
interface Params {
  id: string | undefined;
}

function AdminCompleteEvent({ id }: Params) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [thirdName, setThirdName] = useState<string>("");
  const [firstImage, setFirstImage] = useState<File | string>("");
  const [firstPreview, setFirstPreview] = useState<string>("");
  const [secondImage, setSecondImage] = useState<File | string>("");
  const [secondPreview, setSecondPreview] = useState<string>("");
  const [thirdImage, setThirdImage] = useState<File | string>("");
  const [thirdPreview, setThirdPreview] = useState<string>("");
  const firstRef = useRef<HTMLInputElement>(null)
  const secondRef = useRef<HTMLInputElement>(null)
  const thirdRef = useRef<HTMLInputElement>(null)
  const [data, setData] = useState({
    images: [],
    winners: [
      {
        first: {
          name: "",
          image: "",
        },
        second: {
          name: "",
          image: "",
        },
        third: {
          name: "",
          image: "",
        },
      },
    ],
  });
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      (async () => {
        await AdminAxios.get(`/getEventDetails`, {
          params: {
            id: id,
          },
        })
          .then((response) => {
            setData(response?.data?.data);
          })
          .catch((error) => {
            console.error(error);
            if(error?.response?.data?.status!==500){
              showErrorToast("something wrong")
            }else{
              navigate("/admin/error500")
            }
          });
      })();
    }
  }, [id, change]);

  const uploadFirstImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFirstImage("");
      setFirstPreview("");
      const file = e.target.files[0];
      const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
      const fileInput = document.getElementById(
        "firstInput"
      ) as HTMLInputElement;
      if (!allowedType.includes(file.type)) {
        fileInput.value = "";
        showErrorToast("Please select a JPG, JPEG, or PNG image file.");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        fileInput.value = "";
        showErrorToast("Please select an image file smaller than 5MB.");
        return;
      }
      setFirstImage(file);
      setFirstPreview(URL.createObjectURL(file));
    }
  };

  const uploadSecondImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSecondImage("");
      setSecondPreview("");
      const file = e.target.files[0];
      const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
      const fileInput = document.getElementById(
        "secondInput"
      ) as HTMLInputElement;
      if (!allowedType.includes(file.type)) {
        fileInput.value = "";
        showErrorToast("Please select a JPG, JPEG, or PNG image file.");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        fileInput.value = "";
        showErrorToast("Please select an image file smaller than 5MB.");
        return;
      }
      setSecondImage(file);
      setSecondPreview(URL.createObjectURL(file));
    }
  };


  const uploadThirdImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThirdImage("");
      setThirdPreview("");
      const file = e.target.files[0];
      const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
      const fileInput = document.getElementById(
        "thirdInput"
      ) as HTMLInputElement;
      if (!allowedType.includes(file.type)) {
        fileInput.value = "";
        showErrorToast("Please select a JPG, JPEG, or PNG image file.");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        fileInput.value = "";
        showErrorToast("Please select an image file smaller than 5MB.");
        return;
      }
      setThirdImage(file);
      setThirdPreview(URL.createObjectURL(file));
    }
  };
  const saveWinner = async () => {
    try {
      if(!firstImage&&!secondImage&&!thirdImage){
        showErrorToast("Please select three image")
        return
      }
      if(firstName.length===0||firstName.trim()===""||firstName[0]===" "){
        showErrorToast("Please fill the first winner name correctly")
        return;
      }
      if(secondName.length===0||secondName.trim()===""||secondName[0]===" "){
        showErrorToast("Please fill the second winner name correctly")
        return;
      }
      if(thirdName.length===0||thirdName.trim()===""||thirdName[0]===" "){
        showErrorToast("Please fill the third winner name correctly")
        return;
      }
      const array: any[] = [];
      array.push(firstImage);
      array.push(secondImage);
      array.push(thirdImage);

      const formData = new FormData();
      for (const image of array) {
        formData.append("file", image);
      }
      
      formData.append("firstName", firstName);
      formData.append("secondName", secondName);
      formData.append("thirdName", thirdName);
      toast.loading("Saving details");
      await AdminAxios.post(`/addWinners/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          toast.dismiss();
          if (response?.data?.status === 200) {
            showSuccessToast(response?.data?.message);
            setChange(!change);
          }
        })
        .catch((error) => {
          console.error(error);
          if(error?.response?.data?.status!==500){
            showErrorToast("something wrong")
          }else{
            navigate("/admin/error500")
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const changeWinner = async() => {
    try {
      const formData = new FormData()
      if (firstImage !== "") {
        formData.append("first",firstImage)
      }else{
        formData.append('first', '')
      }
      if (secondImage !== "") {
        formData.append("second",secondImage)
      }
      if (thirdImage !== "") {
        formData.append("third",thirdImage)
      }
      if(firstRef===undefined||secondRef===undefined||thirdRef===undefined){
        return
      }
      const firstName:string =firstRef?.current?.value??""
      const secondName =secondRef?.current?.value??""
      const thirdName =thirdRef?.current?.value??""
      if(firstName.length===0||firstName.trim()===""||firstName[0]===" "){
        showErrorToast("Please fill the first winner name correctly")
        return;
      }
      if(secondName.length===0||secondName.trim()===""||secondName[0]===" "){
        showErrorToast("Please fill the second winner name correctly")
        return;
      }
      if(thirdName.length===0||thirdName.trim()===""||thirdName[0]===" "){
        showErrorToast("Please fill the third winner name correctly")
        return;
      }
      formData.append("firstName",firstName)
      formData.append("secondName",secondName)
      formData.append("thirdName",thirdName)
      toast.loading("Saving details");
      await AdminAxios.post(`editWinner/${id}`,formData,{headers:{
        "Content-Type":"multipart/formData"
      }}).then((response)=>{
        toast.dismiss();
        if(response?.data?.status===200){
          showSuccessToast(response?.data?.message)
          setChange(!change);
        }
      }).catch((error)=>{
        console.error(error);
        if(error?.response?.data?.status!==500){
          showErrorToast("something wrong")
        }else{
          navigate("/admin/error500")
        }
      })
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="w-full h-full ">
      <Toaster />
      <div className="w-full h-[100%] flex">
        <div className="w-[50%] h-full border-e border-gray-500">
          <div className="w-full h-10 flex items-center ms-[5%]">
            <p>Add winners</p>
          </div>

          <div className="w-full h-[27.5rem] ">
            <div className="w-full h-[50%]  flex flex-col items-center justify-evenly">
              {/* ............... */}
              <div className="w-[9rem] h-24 bbg-transparent rounded-md border border-black flex justify-center items-center">
                <img src="/icons/plus.png" alt="" className="absolute" />
                {firstPreview ? (
                  <img
                    src={firstPreview}
                    alt="img1"
                    className="absolute w-[9rem] h-24 rounded-md"
                  />
                ) : (
                  data?.winners[0]?.first?.image && (
                    <img
                      src={data?.winners[0]?.first?.image}
                      alt="img1"
                      className="absolute w-[9rem] h-24 rounded-md"
                    />
                  )
                )}

                <input
                  className="w-[9rem] h-24 opacity-0 relative"
                  type="file"
                  accept="image/*"
                  id="firstInput"
                  onChange={uploadFirstImage}
                  multiple={false}
                  required
                />
              </div>
              <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                <p className="text-xs ">
                  First winner Name
                  <span className="text-red-500">*</span>{" "}
                </p>
                <input
                  type="text"
                  ref={firstRef}
                  placeholder="Enter the first winner name"
                  defaultValue={data?.winners[0]?.first?.name}
                  className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* ............... */}
            <div className="w-full h-[50%] flex ">
              <div className="w-[50%] h-full bg-transparent flex flex-col justify-center items-center gap-3">
                <div className="w-[9rem] h-24 bbg-transparent rounded-md border border-black flex justify-center items-center">
                  <img src="/icons/plus.png" alt="" className="absolute" />
                  {secondPreview ? (
                    <img
                      src={secondPreview}
                      alt="img1"
                      className="absolute w-[9rem] h-24 rounded-md"
                    />
                  ) : (
                    data?.winners[0]?.second?.image && (
                      <img
                        src={data?.winners[0]?.second?.image}
                        alt="img1"
                        className="absolute w-[9rem] h-24 rounded-md"
                      />
                    )
                  )}
                  <input
                    className="w-[9rem] h-24 opacity-0 relative"
                    type="file"
                    accept="image/*"
                    id="secondInput"
                    onChange={uploadSecondImage}
                    multiple={false}
                    required
                  />
                </div>
                <div className="w-[100%] flex flex-col h-14 ps-6  m-0 justify-center">
                  <p className="text-xs ">
                    Second winner Name
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <input
                    type="text"
                    ref={secondRef}
                    placeholder="Enter the second winner name"
                    defaultValue={data?.winners[0]?.second?.name}
                    className="placeholder-gray-500 pl-2 text-xs w-[80%] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                    onChange={(e) => setSecondName(e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* ......................... */}
              <div className="w-[50%] h-full bg-transparent flex flex-col justify-center items-center gap-3">
                <div className="w-[9rem] h-24 bbg-transparent rounded-md border border-black flex justify-center items-center">
                  <img src="/icons/plus.png" alt="" className="absolute" />
                  {thirdPreview ? (
                    <img
                      src={thirdPreview}
                      alt="img1"
                      className="absolute w-[9rem] h-24 rounded-md"
                    />
                  ) : (
                    data?.winners[0]?.third?.image && (
                      <img
                        src={data?.winners[0]?.third?.image}
                        alt="img1"
                        className="absolute w-[9rem] h-24 rounded-md"
                      />
                    )
                  )}
                  <input
                    className="w-[9rem] h-24 opacity-0 relative"
                    type="file"
                    accept="image/*"
                    id="thirdInput"
                    onChange={uploadThirdImage}
                    multiple={false}
                    required
                  />
                </div>
                <div className="w-[100%] bg-transparent flex flex-col h-14 ps-6  m-0 justify-center">
                  <p className="text-xs ">
                    Third winner Name
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <input
                    type="text"
                    ref={thirdRef}
                    placeholder="Enter the third winner name"
                    defaultValue={data?.winners[0]?.third?.name}
                    className="placeholder-gray-500 pl-2 text-xs w-[80%] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                    onChange={(e) => setThirdName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[25%] bg-transparent flex items-center justify-center">
            <div className=" w-56 h-9 flex justify-around items-center">
              <button
                className="w-24 rounded-md bg-red-400 b-5"
                onClick={() => navigate("/admin/eventManagement")}
              >
                Cancel
              </button>
              {data?.winners.length>0 ? (
                <button
                  className="w-24 rounded-md bg-green-500 b-5"
                  onClick={changeWinner}
                >
                  {" "}
                  Change
                </button>
              ) : (
                <button
                  className="w-24 rounded-md bg-green-500 b-5"
                  onClick={saveWinner}
                >
                  {" "}
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full bg-transparent">
          <EventImages
            id={id}
            data={data}
            change={change}
            setChange={setChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminCompleteEvent;
