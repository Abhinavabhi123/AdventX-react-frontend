import logo from "/ADVENTX white.png";
import instagram from "/icons/instagram.png";
import facebook from "/icons/facebook.png";
import twitter from "/icons/twitter.png";
import linkedIn from "/icons/linkedIn.png";

function Footer() {
  return (
    <div className="">
      <main className="grid h-[30rem] place-items-center bg-[#E3E3E3] ">
        <div className="w-[80%] h-[80%] ">
          <div className="w-full h-[10%] bg-transparent flex items-center justify-start ps-4">
            <img src={logo} alt="logo" className="w-24" />
          </div>
          <div className="w-full h-[30%] bg-transparent flex">
            <div className="w-56 h-full ms-4">
              <ul className=" ps-3 mt-8">
                <li className="font-semibold mb-2">Explore</li>
                <li className="text-sm">Event Details</li>
                <li className="text-sm">Participate Event</li>
              </ul>
            </div>
            <div className="w-56 h-full ms-4">
              <ul className=" ps-3 mt-8">
                <li className="font-semibold mb-2">Company</li>
                <li className="text-sm">About</li>
              </ul>
            </div>
            <div className="w-56 h-full ms-4">
              <ul className=" ps-3 mt-8">
                <li className="font-semibold mb-2">community</li>
                <li className="text-sm">Support</li>
              </ul>
            </div>
          </div>
          <div className="w-full h-[20%] bg-transparent flex justify-end">
            <div className="w-64 h-18 bg-transparent">
              <div className="w-full h-[30%] flex justify-center">
                <p className="font-semibold">Contact with us</p>
              </div>
              <div className="w-full h-[60%] flex justify-around items-center">
                <img className="w-8 h-8" src={instagram} alt="instagram" />
                <img className="w-7 h-7" src={facebook} alt="facebook" />
                <img className="w-10 h-10" src={twitter} alt="twitter" />
                <img className="w-8 h-8" src={linkedIn} alt="linkedIn" />
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-black"></div>
          <div className="w-full h-[40%] ">

          </div>
        </div>
      </main>
    </div>
  );
}

export default Footer;
