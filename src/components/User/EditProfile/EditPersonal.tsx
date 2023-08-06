import React, { useEffect, useContext, useState, useRef } from "react";
import UserIdContext from "../../../Store/Context/UserContext";
import UserAxios from "../../../Store/Axios/UserConfig";


function EditPersonal() {
  const userId = useContext(UserIdContext);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [changed,setChanged]= useState<boolean>(false)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    about:"",
    height:"",
    weight:"",
    date_of_birth:""
  });
  useEffect(() => {
    if (userId) {
      (async () => {
        await UserAxios
          .get(`getUserProfile/${userId?.id}`)
          .then((response) => {
            setData(response?.data?.userData);
          });
      })();
    }
  }, [userId,changed]);

  const submitUserEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const firstName: string | undefined = firstNameRef.current?.value;
      const lastName = lastNameRef.current?.value;
      const number = numberRef.current?.value;
      const about = aboutRef.current?.value;
      const height = heightRef.current?.value;
      const weight = weightRef.current?.value;
      const date = dateRef.current?.value;
      if (
        firstName === undefined ||
        lastName === undefined ||
        number == undefined ||
        about === undefined ||
        height === undefined ||
        weight === undefined ||
        date === undefined
      ) {
        return;
      } else {
        if (firstName.length <= 0) {
          return;
        }
        if (firstName.trim() === "") {
          return;
        }
        if (firstName[0] === " ") {
          return;
        }
        const symbols = /[-!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/;
        if (symbols.test(firstName)) {
          return;
        }
        if (lastName.length <= 0) {
          return;
        }
        if (lastName.trim() === "") {
          return;
        }
        if (lastName[0] === " ") {
          return;
        }
        if (symbols.test(lastName)) {
          return;
        }
        if (number.length !== 10) {
          return;
        }
        if (about.length <= 0 ) {
          return;
        }
        if (height.length <= 0 && height.length>3) {
          return;
        }
        if (weight.length <=0 &&weight.length>3) {
          return;
        }
        if (!date) {
          return;
        }
        const today = new Date().getTime();
        const result = new Date(date).getTime();
        if (result > today) {
          return;
        }
        console.log("starting");
        console.log(firstName,lastName,number,about,height,weight,date);
        
        const formData ={
          userId,firstName,lastName,number,about,height,weight,date
        }
        
        await UserAxios
          .post(`postUserDetails`, formData)
          .then((response) => {
            console.log(response);
            if(response?.data?.status===200){
              changed ?setChanged(false):setChanged(true)
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-[50%] h-full">
      <div className="w-full h-10 flex items-center ps-5">
        Personal Details:
      </div>
      <form
        className="w-full h-[36.4rem] flex flex-col justify-between"
        onSubmit={submitUserEdit}
      >
        <div className="flex flex-col h-fit gap-4 items-center">
          {/* first name input */}
          <div className="w-[18rem] flex flex-col h-14 mt-5 m-0 justify-center">
            <p className="text-sm">
              First Name
              <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              defaultValue={data?.firstName}
              ref={firstNameRef}
              //   onChange={handleChange}
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          {/* second name input */}
          <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
            <p className="text-sm">
              Last Name
              <span className="text-red-500">*</span>{" "}
            </p>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              defaultValue={data?.lastName}
              ref={lastNameRef}
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
              //   onChange={handleChange}
            />
          </div>
          {/* mobile input */}
          <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
            <p className="text-sm">
              Mobile
              <span className="text-red-500">*</span>{" "}
            </p>
            <input
              type="number"
              defaultValue={data?.mobile}
              name="mobile"
              ref={numberRef}
              placeholder="Enter Mobile number"
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md spin-button-none"
              //   onChange={handleChange}
            />
          </div>
          {/* about input */}
          <div className="w-[18rem] flex flex-col h-14  m-0 mt-3 justify-center">
            <p className="text-sm">
              About you
              <span className="text-red-500">*</span>{" "}
            </p>
            <textarea
              name="about"
              ref={aboutRef}
              //   onChange={handleChange}
              defaultValue={data?.about}
              className="placeholder-gray-500 pl-2 text-xs w-[18rem] min-h-[5rem] max-h-[5rem] flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
            />
          </div>
          {/* physical details */}
          <div className="w-full mt-3 flex justify-center pl-5 pr-5 items-center">
            <div className="w-[18rem] flex flex-col h-14  m-0 justify-center items-center">
              <p className="text-sm">
                Height
                <span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="number"
                name="height"
                placeholder="Height"
                maxLength={3}
                ref={heightRef}
                defaultValue={data?.height}
                className="placeholder-gray-500 pl-2 text-xs w-[10rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                // onChange={handleChange}
              />
            </div>
            <div className="w-[18rem] flex flex-col h-14  m-0 items-center justify-center">
              <p className="text-sm">
                Weight
                <span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="number"
                name="weight"
                ref={weightRef}
                maxLength={3}
                placeholder="Weight"
                defaultValue={data?.weight}
                className="placeholder-gray-500 pl-2 text-xs w-[10rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
                // onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-[18rem] flex flex-col h-14  m-0 justify-center">
            <p className="text-sm">
              Date of Birth
              <span className="text-red-500">*</span>{" "}
            </p>
            <input
              type="date"
              name="date"
              ref={dateRef}
              placeholder="Enter First Name"
              defaultValue={data?.date_of_birth}
              className="placeholder-gray-500 pl-2 pr-2 text-xs w-[18rem] h-9 flex-shrink-0 border-2 border-solid border-gray-500 rounded-md"
              //   onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full h-20  flex justify-center items-center">
          <div className="w-40 h-6  flex justify-between">
            <button
              type="reset"
              className="bg-red-400 bg-opacity-60 w-16 rounded-md text-sm"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-green-400 w-16 rounded-md text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPersonal;
