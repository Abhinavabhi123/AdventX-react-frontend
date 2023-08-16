import React, { useState, ChangeEvent } from "react";
import close from "/icons/close.png";
import { showErrorToast, showSuccessToast } from "../../ToastMessage/Toast";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import AdminAxios from "../../../Store/Axios/AdminConfig";
interface Props {
  data: {
    images: string[];
  };
  showImages: boolean;
  setShowImages: (value: React.SetStateAction<boolean>) => void;
  id: string | undefined;
  change: boolean;
  setChange: (value: React.SetStateAction<boolean>) => void;
}

function EventAllImages({
  data,
  setShowImages,
  showImages,
  id,
  change,
  setChange,
}: Props) {
  const [selectedValues, setSelectedValues] = useState<{ value: string }[]>([]);
  const [images, setImage] = useState<any[] | string[]>([]);
  const checkedButton = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValues = event.target.value;
    if (event.target.checked) {
      const newItem = {
        value: selectedValues,
      };
      setSelectedValues((prevMembers) => [...prevMembers, newItem]);
    } else {
      setSelectedValues((prevMembers) =>
        prevMembers.filter((member) => member.value !== selectedValues)
      );
    }
  };

  function saveImages() {
    console.log("ethi");
  }

  function clearImages() {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      "input[type='checkbox"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setImage([]);
    setSelectedValues([]);
    fileInput.value = "";
  }

  function deleteImage() {
    if (images.length > 0) {
      showErrorToast("Please remove the input images");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this community",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AdminAxios.delete(`deleteEventImages`, {
          params: {
            id,
          },
          data: {
            selectedValues,
          },
        })
          .then((response) => {
            if (response?.data?.status === 200) {
              setChange(!change);
              showSuccessToast(response?.data?.message)
              setSelectedValues([])
              setImage([])
            }
          })
          .catch((error) => {
            showErrorToast(error?.response?.data?.error);
          });
      }
    });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[90%] h-[90%]  rounded-md">
        <div className=" w-full h-20 flex justify-between ps-5 items-center rounded-md bg-white">
          <p>All images</p>
          <img
            className="w-10 me-3 cursor-pointer transform transition-transform duration-200 hover:scale-110"
            src={close}
            alt="close"
            onClick={() => setShowImages(!showImages)}
          />
        </div>
        <div className="w-full h-[28rem] grid grid-cols-3 gap-4 rounded-b-md p-4">
          {data?.images.map((item, i) => {
            return (
              <div className="relative" key={i}>
                <img
                  key={i}
                  className="w-96 h-32  absolute"
                  //   transform transition-transform duration-200 hover:scale-110
                  src={item}
                  alt=""
                />
                <input
                  className="absolute form-checkbox h-5 w-5 bg-indigo-600 transition duration-150 ease-in-out  checked:bg-indigo-600 checked:border-transparent focus:ring-indigo-500"
                  type="checkbox"
                  id="imageChecked"
                  value={item}
                  onChange={checkedButton}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full h-10 flex justify-center items-center">
          {selectedValues.length > 0 && (
            <button
              className="w-20 h-8 rounded-md border border-black bg-red-500 text-xs"
              onClick={deleteImage}
            >
              Delete image
            </button>
          )}
        </div>

      </div>
      <Toaster />
    </div>
  );
}

export default EventAllImages;
