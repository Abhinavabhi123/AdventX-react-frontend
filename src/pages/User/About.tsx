import AboutUs from "../../components/User/AboutUs/AboutUs";
import HomeBtn from "../../components/User/Button/HomeBtn";
import Footer from "../../components/User/Footer/Footer";
import NavBar from "../../components/User/NavBar/Navbar";

function About() {
  return (
    <div className="">
      <div className="h-20">
        <NavBar />
      </div>
      <div className="w-[100%]">
        <div className="w-full h-20 flex items-center justify-end pe-5 border-b border-gray-300">
          <HomeBtn />
        </div>
        <div className="w-[100%]">
          <AboutUs />
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default About;
