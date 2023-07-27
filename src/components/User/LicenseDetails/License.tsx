import React, { useState, useRef, ChangeEvent } from "react";

function License() {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string>("");
  const number = useRef(null);
  const expiry = useRef(null);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImgPreview(URL.createObjectURL(file));
    }
  }

  const saveData = async()=>{
    try {
        
        const lNumber: string | undefined = number?.current?.value;
        const lExpiry = expiry.current?.value;
    } catch (error) {
    console.error(error);
    }
  }

  return (
    <div className="w-full h-[34.5em]  rounded-md">
      <div className="w-full h-[50%] bg-transparent flex border-b border-gray-400">
        {/* details */}
        <div className="w-[50%] h-full  flex flex-col justify-center ps-[5rem]">
          <p>LicenseNo:- ___________</p>
          <p>Expiry:- ___________</p>
        </div>
        {/* image */}
        <div className="w-[50%] h-full  flex justify-between bg-yellow-400 bg-opacity-40 items-center flex-col">
          <img
            src="/bg/8140054.jpg"
            alt="img"
            className="w-60 rounded-xl mt-20"
          />
          <button
            onClick={() => (openEdit ? setOpenEdit(false) : setOpenEdit(true))}
          >
            <img src="/icons/license.png" alt="add license" className="w-6" />
          </button>
        </div>
      </div>
      {openEdit && (
        
        <div className="w-full h-[50%] flex rounded-b-md">
          <div className="w-[50%] h-full bg-transparent rounded-bl-md flex justify-center items-center flex-col gap-2">
            <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
              <p className="text-xs ">
                License Number
                <span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="text"
                ref={number}
                placeholder="Enter the license number"
                className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
                required
              />
            </div>
            <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
              <p className="text-xs ">
                Vehicle Number
                <span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="date"
                ref={expiry}
                placeholder="Enter the vehicle number"
                className="placeholder-gray-500 pl-2 pr-3 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
                required
              />
            </div>
          </div>
          <div className="w-[50%] h-full  rounded-br-md">
            <div className="w-full h-[50%]  flex justify-center items-center">
              <div className="w-[30%] h-[60%] rounded-md relative border border-dashed border-violet-500">
                <input
                  type="file"
                  className="absolute w-[100%] opacity-0 h-[100%]"
                  onChange={(e) => uploadImage(e)}
                />
                {imgPreview && <img className="w-[100%] h-[100%] rounded-md" src={imgPreview} alt="" />}
              </div>
            </div>
            <div className="w-full h-[30%] flex justify-center items-center">
              <button className="w-14 rounded-md h-6 bg-red-300 hover:bg-red-400" onClick={saveData}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default License;
