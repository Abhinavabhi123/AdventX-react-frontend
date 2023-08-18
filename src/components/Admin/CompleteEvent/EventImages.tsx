import { useState, ChangeEvent } from "react";
import { Toaster } from "react-hot-toast";
import { showErrorToast, showSuccessToast } from "../../ToastMessage/Toast";
import { useNavigate } from "react-router-dom";
import close from "/icons/close.png";
import "./Event.css";
import AdminAxios from "../../../Store/Axios/AdminConfig";
import Loader from "../../Loader/Loader";
import imagess from "/icons/images.png";
import EventAllImages from "./EventAllImages";

interface Props {
  id: string | undefined;
  data: {
    images: string[];
  };
  change:boolean;
  setChange:(value: React.SetStateAction<boolean>)=>void
}

function EventImages({ id, data,change,setChange }: Props) {
  const limit = 9 - data?.images.length;

  const navigate = useNavigate();
  const [images, setImage] = useState<any[] | string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<boolean>(false);
  const selectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = e.target.files;
      const filesArray = [...selectedFiles];
      setImage(filesArray);
      // setImage(selectedFile);
      if (selectedFiles.length > limit) {
        const fileInput = document.getElementById(
          "fileInput"
        ) as HTMLInputElement;
        setImage([]);
        if (limit === 0) {
          fileInput.value = "";
          showErrorToast(`you can't select any image`);
        } else {
          fileInput.value = "";
          showErrorToast(`you can only select ${limit} images`);
        }
      }
      return;
    }
  };
  const removeIMage = (index: number) => {
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
      const formData = new FormData();
      for (const img of images) {
        formData.append("image", img);
      }
      setLoading(true);
      await AdminAxios.post(`eventImages/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        if (response?.data?.status === 200) {
          setLoading(false);
          showSuccessToast(response?.data?.message);
          setChange(!change)
          setImage([])
        }
      }).catch((error)=>{
        console.error(error);
        if(error?.response?.data?.status!==500){
          showErrorToast("something wrong")
        }else{
          navigate("/admin/error500")
        }
      })
    }
  };
  if (showImages) {
    return (
      <EventAllImages
        data={data}
        showImages={showImages}
        setShowImages={setShowImages}
        id={id}
        change={change}
        setChange={setChange}
      />
    );
  }

  return (
    <>
      <div className="w-full h-[15%] bg-transparent flex flex-col items-center justify-center">
        <div className="w-full h-full flex items-center justify-evenly">
          <p>Maximum number of the image upload is {limit}</p>
          {data.images.length > 0 && (
            <button
              className=" w-8 h-8"
              onClick={() => setShowImages(!showImages)}
            >
              <img src={imagess} alt="images" className="w-7" />
            </button>
          )}
        </div>
        <Toaster />
        <div className="w-full h-20 bg-transparent flex justify-center items-center">
          {limit > 0 && (
            <input
              type="file"
              className="border border-gray-900"
              multiple={true}
              max={9}
              id="fileInput"
              onChange={selectImages}
              required
            />
          )}
        </div>
      </div>
      <div className="w-full h-[80%] mt-4 bg-transparent flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-[90%] h-[90%] ">
          {limit > 0 ? (
            images.map((item, i) => {
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
            })
          ) : (
            <div className="w-[30rem] h-full flex flex-col justify-center items-center">
              <img
                className="w-[60%] h-[60%] "
                src="/bg/Data extraction-bro.png"
                alt="empty"
              />
              <p className="text-gray-500">Image are ed </p>
            </div>
          )}
        </div>
        <div className="w-full h-10 flex mt-3 justify-center items-center ">
          {limit > 0 && (
            <div className="w-56 h-fit flex justify-around items-center">
              {loading ? (
                <button className="w-20 h-8 bg-red-300 rounded-md">
                  Clear{" "}
                </button>
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
          )}
        </div>
      </div>
    </>
  );
}

export default EventImages;
