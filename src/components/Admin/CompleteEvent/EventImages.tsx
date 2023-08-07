import { useState, ChangeEvent } from "react";
import { Toaster } from "react-hot-toast";
import { showErrorToast, showSuccessToast } from "../../ToastMessage/Toast";
import { useNavigate } from "react-router-dom";
import close from "/icons/close.png";
import "./Event.css";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import Loader from "../../Loader/Loader";

interface Props {
  id: string | undefined;
}

function EventImages({ id }: Props) {
  const navigate = useNavigate();
  const [images, setImage] = useState<any[] | string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const selectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = e.target.files;
      const filesArray = [...selectedFiles];
      setImage(filesArray);
      // setImage(selectedFile);
      if (selectedFiles.length > 9) {
        const fileInput = document.getElementById(
          "fileInput"
        ) as HTMLInputElement;
        setImage([]);
        fileInput.value = "";
        showErrorToast("you can only select 9 images");
      }
      return;
    }
  };
  const removeIMage = (index: number) => {
    console.log("clicked", index);
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    for (let i = 0; i < images.length; i++) {
      if (index === i) {
        // fileInput.parentNode.removeChild(images[i]);
        const updatedImages = images.filter((_, i) => i !== index);
        setImage(updatedImages);
      }
    }
  };

  const clearImage = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    setImage([]);
    fileInput.value = "";
  };

  const uploadImage = async () => {
    if (images.length > 0) {
      console.log(images, "imagesss");
      const formData = new FormData();
      for (const img of images) {
        formData.append("image", img);
      }
      setLoading(true);
      await AdminAxios.post(`eventImages/${id}`,formData,{headers:{"Content-Type":"multipart/form-data"}}).then((response)=>{
        if(response?.data?.status===200){
          console.log("success");
          setLoading(false)
          showSuccessToast("image saved")
        }
      })
    }
  };

  return (
    <>
      <div className="w-full h-[20%] bg-transparent flex flex-col items-center justify-center">
        <p>Maximum number of the image upload is 9</p>
        <Toaster />
        <div className="w-full h-20 bg-transparent flex justify-center items-center">
          <input
            type="file"
            className="border border-gray-900"
            multiple={true}
            max={9}
            id="fileInput"
            onChange={selectImages}
            required
          />
        </div>
      </div>
      <div className="w-full h-[80%] bg-transparent flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-[90%] h-[90%]">
          {images.map((item, i) => {
            return (
              <div
                key={i}
                className="w-[10.85rem] h-36 bg-white  rounded-md transform transition-transform duration-200 hover:scale-110"
              >
                <div className="w-full h-[20%]  flex justify-end">
                  <button>
                    <img
                      src={close}
                      alt="close btn"
                      className="w-6"
                      onClick={() => removeIMage(i)}
                    />
                  </button>
                </div>
                <div className="w-full h-[80%] rounded-md">
                  <img
                    src={URL.createObjectURL(item)}
                    className="w-full h-full rounded-b-md"
                    alt="images"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-10 flex mt-3 justify-center items-center ">
          <div className="w-56 h-fit flex justify-around items-center">
            {loading ? (
              <button className="w-20 h-8 bg-red-300 rounded-md">Clear </button>
            ) : (
              <button
                className="w-20 h-8 bg-red-500 rounded-md"
                onClick={clearImage}
              >
                Clear{" "}
              </button>
            )}
            {!loading && (
              <button
                className="w-20 h-8 bg-green-500 rounded-md"
                onClick={uploadImage}
              >
                Save
              </button>
            )}
            {loading && (
              <>
                <p className="text-xs">Image saving</p>
                <Loader />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventImages;
