import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import AdminAxios from "../../../Store/Axios/AdminConfig";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await AdminAxios.get(`getAllUser`).then((response) => {
        setUsers(response.data);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="w-[71rem] h-[76rem] rounded-md bg-white bg-opacity-100 border border-black over overflow-y-scroll">
      <table className="w-full rounded-md table-auto inline-table ">
        <thead className="h-10">
          <tr>
            <th className="w-40 ">Id</th>
            <th className="w-40">Name</th>
            <th className="w-40">Email</th>
            <th className="w-40">Mobile</th>
            <th className="w-14">Prime</th>
            <th className="w-40">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, i) => {
            return <TableRow key={i} value={data} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
