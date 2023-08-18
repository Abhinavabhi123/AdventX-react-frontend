
interface Props {
  data: {
    communityName: string;
    createdAt: string;
    logo: string;
    status: string;
    members:[]
  };
}

function TableRow({ data }: Props) {
  const { communityName, createdAt, status, logo,members } = data;
  const givenDate:any = new Date(createdAt);
  const currentDate:any = new Date();
  const timeDifferenceInMilliseconds =  currentDate-givenDate;
  const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);
  const time = String(timeDifferenceInHours).split(".")
  const date =createdAt
 
  return (
    <tr className="h-5 text-center border  border-gray-300">
      <td className="ps-2 mt-4 flex justify-center items-center">
        <img
          className="rounded-full w-12 h-12"
          src={`${import.meta.env.VITE_IMAGE_API}${logo}`}
          alt=""
        />
      </td>
      <td>{communityName}</td>
      <td>{time[0]} hr</td>
      <td>{`${new Date(date).toLocaleDateString()},${new Date(date).toLocaleTimeString()}`}</td>
      <td>{members.length}</td>
      <td>{status}</td>
    </tr>
  );
}

export default TableRow;
