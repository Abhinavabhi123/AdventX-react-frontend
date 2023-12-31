
interface Props {
  data: {
    image: string;
    firstName: string;
    lastName: string;
    eventParticipation: string[];
    community: string[];
  };
  i:number
}

function UserRow({ data,i }: Props) {
  const { image, firstName, lastName, eventParticipation, community } = data;
    
  return (
    <tr className={`h-12 text-center ${i % 2 === 0 ? "bgwhite" : "bg-gray-200"}`}>
      <td className="ps-2 pt-2 flex  items-center h-full">
        {image ? (
          <img
            className=" rounded-full w-8 h-8 me-2 "
            src={`${import.meta.env.VITE_USERIMAGE_API}${image}`}
            alt="image"
          />
        ) : (
          <img
          className=" rounded-full w-8 h-8 me-2 "
          src={`/icons/person.png`}
          alt="image"
        />
        )}
        {`${firstName} ${lastName}`}
      </td>
      <td className="h-2">{eventParticipation.length}</td>
      <td className="h-2">{community.length}</td>
    </tr>
  );
}

export default UserRow;
