import winnerIcon from "/icons/winners.png";

interface Props {
  winners: {
    first: {
      name: string;
      image: string;
    };
    second: {
      name: string;
      image: string;
    };
    third: {
      name: string;
      image: string;
    };
  }[];
}
interface Obj {
  name: string;
  image: string;
}

function WinnerDetails({ winners }: Props) {
  const win: Array<Obj> = [];
  const position: string[] = [];
  for (const winner of winners) {
    if (winner.first) {
      const obj = {
        name: winner?.first?.name ?? "",
        image: winner?.first?.image ?? "",
      };
      position.push("First");
      win.push(obj);
    }
    if (winner.second) {
      const obj = {
        name: winner?.second?.name ?? "",
        image: winner?.second?.image ?? "",
      };
      position.push("Second");
      win.push(obj);
    }
    if (winner.third) {
      const obj = {
        name: winner?.third?.name ?? "",
        image: winner?.third?.image ?? "",
      };
      position.push("Third");
      win.push(obj);
    }
  }


  return (
    <div className="w-full h-[17rem]  flex justify-center items-center border-b border-gray bg-gray-100 ">
      <div className="w-[88%] h-[95%] ">
        <div className="w-full h-[15%] flex items-center ">
          <p className="text-2xl font-serif ms-5">Event Winners </p>{" "}
          <img className="w-8 ms-3" src={winnerIcon} alt="winner" />
        </div>
        <div className="w-full h-[85%] flex justify-evenly items-center ">
          {/*  */}
          {win.map((winner, i) => {
            return (
              <div
                key={i}
                className="w-[25%] h-full flex justify-center items-center"
              >
                <div className="w-[85%] h-[85%] relative flex flex-col justify-between items-center">
                  <img
                    className="w-full h-full absolute rounded-md"
                    src={winner?.image}
                    alt="image"
                  />
                  <p className="relative text-yellow-600">{position[i]}</p>
                  <p className="relative font-bold text-2xl text-white">
                    {winner?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WinnerDetails;
