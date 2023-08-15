import Navbar from "../../components/User/NavBar/Navbar";
import Footer from "../../components/User/Footer/Footer";
import Banner from "../../components/User/Banner/Banner";
import UpcomingEvent from "../../components/User/UpcomingEvents/UpcomingEvent";
import AllEvents from "../../components/User/AllEvents/AllEvents";

function Home() {
  window.scrollTo(0, 0);
  return (
    <div className=" w-[100%] h-[100vh]">
      <div className=" w-full h-20 ">
        <Navbar />
      </div>
      <div className="w-full h-[43rem]  m-0 bg-white">
        <Banner />
      </div>
      <div className="w-[100%] h-[38rem] bg-white flex  flex-col items-center m-0 justify-evenly">
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
