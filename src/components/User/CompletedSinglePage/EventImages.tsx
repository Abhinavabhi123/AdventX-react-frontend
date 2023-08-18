interface Props {
  images: string[];
  about:string
}

function EventImages({ images,about }: Props) {


  return (
    <div className="w-full h-[40rem]  flex justify-center items-center bg-white">
      <div className="w-[90%] h-[90%] bg-transparent flex">
        <div className="w-[60%] h-full bg-transparent border-e border-gray-600">
          <div className="w-full h-fit ps-4">
            <p className="text-lg font-serif font-semibold">Event Gallery</p>
          </div>
          <div className="grid grid-cols-3 ">
            {images.map((image, i) => {
              return <img src={image} key={i} className="p-2 hover:scale-110 ease-out duration-300 object-cover" onClick={() => window.open(image)}/>;
            })}
          </div>
        </div>
        <div className="w-[40%] h-full bg-transparent">
            <div className="w-full h-[10%] flex items-center ps-5">
                <p className="text-xl font-semibold">About Event</p>
            </div>
            <div className="w-full h-[90%] bg-transparent flex justify-center items-center">
                <div className="w-[90%] h-[90%] bg-transparent overflow-x-auto over  p-3 rounded-md border border-gray-400">
                <p>{about}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default EventImages;
