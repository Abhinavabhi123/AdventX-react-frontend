import { useState, ChangeEvent } from "react";
import { showErrorToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";
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

  const uploadFirstImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("ethiiiii");
      setFirstImage("");
      setFirstPreview("");
      const file = e.target.files[0];
      const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
      if (!allowedType.includes(file.type)) {
        showErrorToast("Please select a JPG, JPEG, or PNG image file.");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        showErrorToast("Please select an image file smaller than 5MB.");
        return;
      }
      setFirstImage(file);
      setFirstPreview(URL.createObjectURL(file));
    }
  };

  const uploadSecondImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("ethiiiii");
      setSecondImage("");
      setSecondPreview("");
      const file = e.target.files[0];
      const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
      if (!allowedType.includes(file.type)) {
        showErrorToast("Please select a JPG, JPEG, or PNG image file.");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        showErrorToast("Please select an image file smaller than 5MB.");
        return;
      }
      setSecondImage(file);
      setSecondPreview(URL.createObjectURL(file));
    }
  };

  const uploadThirdImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("ethiiiii");
      setThirdImage("");
      setThirdPreview("");
      const file = e.target.files[0];
      const allowedType = ["image/jpeg", "image/jpeg", "image/png"];
      if (!allowedType.includes(file.type)) {
        showErrorToast("Please select a JPG, JPEG, or PNG image file.");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        showErrorToast("Please select an image file smaller than 5MB.");
        return;
      }
      setThirdImage(file);
      setThirdPreview(URL.createObjectURL(file));
    }
  };
  const saveWinner = async () => {
    try {
      console.log("submitting");
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
      console.log(array, "arrrrrraaayyy");

      await AdminAxios.post(`/addWinners/${id}`, array).then((response) => {
        if (response?.data?.status === 200) {
          console.log("success");
        }
      });
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
                {firstPreview && (
                  <img
                    src={firstPreview}
                    alt="img1"
                    className="absolute w-[9rem] h-24 rounded-md"
                  />
                )}
                <input
                  className="w-[9rem] h-24 opacity-0 relative"
                  type="file"
                  accept="image/*"
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
                  placeholder="Enter the first winner name"
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
                  {secondPreview && (
                    <img
                      src={secondPreview}
                      alt="img1"
                      className="absolute w-[9rem] h-24 rounded-md"
                    />
                  )}
                  <input
                    className="w-[9rem] h-24 opacity-0 relative"
                    type="file"
                    accept="image/*"
                    onChange={uploadSecondImage}
                    multiple={false}
                    required
                  />
                </div>
                <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                  <p className="text-xs ">
                    Second winner Name
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <input
                    type="text"
                    placeholder="Enter the second winner name"
                    className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                    onChange={(e) => setSecondName(e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* ......................... */}
              <div className="w-[50%] h-full bg-transparent flex flex-col justify-center items-center gap-3">
                <div className="w-[9rem] h-24 bbg-transparent rounded-md border border-black flex justify-center items-center">
                  <img src="/icons/plus.png" alt="" className="absolute" />
                  {thirdPreview && (
                    <img
                      src={thirdPreview}
                      alt="img1"
                      className="absolute w-[9rem] h-24 rounded-md"
                    />
                  )}
                  <input
                    className="w-[9rem] h-24 opacity-0 relative"
                    type="file"
                    accept="image/*"
                    onChange={uploadThirdImage}
                    multiple={false}
                    required
                  />
                </div>
                <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
                  <p className="text-xs ">
                    Third winner Name
                    <span className="text-red-500">*</span>{" "}
                  </p>
                  <input
                    type="text"
                    placeholder="Enter the third winner name"
                    className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
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
              <button
                className="w-24 rounded-md bg-green-500 b-5"
                onClick={saveWinner}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-full bg-yellow-400">
         <EventImages/>
        </div>
      </div>
    </div>
  );
}

export default AdminCompleteEvent;
