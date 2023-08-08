import Navbar from "../../components/User/NavBar/Navbar";
import Footer from "../../components/User/Footer/Footer";
import Banner from "../../components/User/Banner/Banner";
import UpcomingEvent from "../../components/User/UpcomingEvents/UpcomingEvent";
import AllEvents from "../../components/User/AllEvents/AllEvents";

function Home() {
  return (
    <div className=" w-screen h-[100vh]">
      <div className=" w-full h-20">
        <Navbar />
      </div>
      <div className="w-full h-[43rem]  m-0 bg-white">
        <Banner />
      </div>
      <div className="w-[92rem] h-[38rem] bg-white flex  flex-col items-center justify-evenly">
        <div className="w-[80%] h-[41%] bg-gray-400 bg-opacity-10 rounded-md">
          <UpcomingEvent/>
        </div>
        <div className="w-[80%] h-[41%] bg-gray-400 bg-opacity-10 rounded">
          <AllEvents/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
