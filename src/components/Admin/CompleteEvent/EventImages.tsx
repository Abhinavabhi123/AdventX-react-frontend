import {useState,ChangeEvent} from "react";
import { Toaster } from "react-hot-toast";
import { showErrorToast } from "../../ToastMessage/Toast";

function EventImages() {
    const[images,setImage]=useState<FileList|string>("")

    console.log(images,"Imgasgsg");
    const selectImages=(e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            const selectedFile = e.target.files
            setImage(selectedFile)
            if(selectedFile.length>9){
                const fileInput = document.getElementById("fileInput")as HTMLInputElement;
                setImage("")
                 fileInput.value = "";  
                showErrorToast("you can only select 9 images")
            }
            return
        }
    }
    
  return (
    <>
      <div className="w-full h-[20%] bg-red-600 flex items-center justify-center">
      <Toaster/>
        <div className="w-full h-20 bg-orange-500 flex justify-center items-center">
          <input
            type="file"
            className="border border-gray-900"
            multiple={true}
            max={9}
            id="fileInput"
            onChange={selectImages}
          />
        </div>
      </div>
      <div className="w-full h-[80%] bg-violet-700"></div>
    </>
  );
}

export default EventImages;
