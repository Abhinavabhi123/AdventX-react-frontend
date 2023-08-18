import "./500.css";


function Error500() {
  return (
    <div className="bodyData w-[99vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="container ">
        <img className="container_image" src="" />

        <h1>
          <span>500</span> <br />
          Internal server error
        </h1>
        <p>We are currently trying to fix the problem.</p>

      </div>
    </div>
  );
}

export default Error500;
