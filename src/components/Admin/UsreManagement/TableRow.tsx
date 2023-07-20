import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdminApi } from "../../../Store/api";
import AdminAxios from "../../../Store/Axios/AdminConfig";


interface TableRowProps {
  value: any;

}
interface User {
  firstName: string;
  email: string;
  mobile: string;
  primeMember: undefined;
  status: undefined;
}

const TableRow: React.FC<TableRowProps> = ({ value}) => {
  const { _id } = value;
  const [user, setUser] = useState<User>({
    firstName: "",
    email: "",
    mobile: "",
    primeMember: undefined,
    status: undefined,
  });

  
  const id = _id;

  
  useEffect(() => {

    
    const fetchSingleUser = async () => {
      await AdminAxios
        .get(`singleUser`, {
          params: { id },
        })
        .then((response) => {
          setUser(response.data);
        });
    };
    fetchSingleUser();
  },[]);

  
  const { firstName, email, mobile, primeMember, status } = user;

  const blockUser = async () => {
    try {
      console.log("Clicked");
      await AdminAxios.post(`blockUser`, { _id }).then((response)=>{
        setUser(response.data)
        
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className="h-10 border-2 border-gray-600">
      <td className="text-center">{_id} </td>
      <td className="text-center text-sm overflow-clip">{firstName} </td>
      <td className="text-center ">{email} </td>
      <td className="text-center ">{mobile} </td>
      {primeMember == true ? (
        <td className="text-center">Yes </td>
      ) : (
        <td className="text-center ">No</td>
      )}
      {status === true ? (
        <td className="text-center ">
          <button
            className="text-xs bg-green-600 w-20 h-5 rounded-md text-white"
            onClick={blockUser}
          >
            Block
          </button>
        </td>
      ) : (
        <td className="text-center ">
          <button
            className="text-xs bg-red-600 w-20 h-5 rounded-md text-white"
            onClick={blockUser}
          >
            UnBlock
          </button>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
