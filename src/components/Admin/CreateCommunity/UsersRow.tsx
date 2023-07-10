import axios from "axios";
import React, { useEffect,useState } from "react";
import { AdminApi } from "../../../Store/api";

interface TableRowProps {
  value: any;
}

const UsersRow: React.FC<TableRowProps> = ({ value }) => {
    const [userDetail,setUserDetail] = useState([])
  const { _id } = value;
  console.log(_id,"vann");
  const id = _id;
  
  useEffect(() => {
    (async () => {
      await axios
        .get(`${AdminApi}getComUser`, {
          params: {
            id,
          },
        })
        .then((response) => {
            setUserDetail(response.data)
        //   console.log(response);
        });
    })();
  }, []);
  console.log(userDetail);
  
  return (
    <>
    {
       userDetail.map((item,i)=>{
        return(
            <p>kllkngds</p>
        )
       }) 
    }
    </>
  )
};

export default UsersRow;
