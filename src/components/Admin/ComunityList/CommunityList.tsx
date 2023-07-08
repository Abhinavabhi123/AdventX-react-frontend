import CommunityRow from "./CommunityRow";

function CommunityList() {
  const data: number[] = [1, 2, 3, 4, 5, 3, 4, 5, 6, 7, 8, 8, 9];
  return (
    <div className="">
      <table className="w-full h-full">
        <thead className="h-10">
          <th>Si.No</th>
          <th>Image</th>
          <th>Name</th>
          <th>Members</th>
          <th>Status</th>
          <th>Actions</th>
        </thead>
        {/* <div className="w-full h-full bg-red-400"> */}
          <tbody className="">
            {data.map((item) => {
              return <CommunityRow />;
            })}
          </tbody>
        {/* </div> */}
      </table>
    </div>
  );
}

export default CommunityList;
