import "./TopBar.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AdminAction } from "../../../Store/redux/AdminAuth";
interface TopBarProps {
  value:
    | "Community"
    | "Dashboard"
    | "Users"
    | "Edit Community"
    | "Event"
    | "Create Event"
    | "Edit Event"
    | "Banners"
    | "Add Banner"
    | "Complete Event"
    | "Accounts"
}

function TopBar(props: TopBarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AdminLogout = () => {
    Cookies.remove("adminJwt");
    dispatch(AdminAction.AdminLogout({ email: "" }));
    navigate("/admin/login");
  };

  return (
    <div className="topBarAdmin">
      <div className="topBarAdmin_main flex justify-end">
        <div className="topBarAdmin_main_top">
          <img
            className="w-4 h-4 "
            src="/icons/nofity-bell.png"
            alt="notify bell"
          />
        </div>
      </div>
      <div className="topBarAdmin_second">
        <div className=" w-full flex justify-between">
          <div className="ml-5 ">
            <h1 className="text-white text-2xl">{props.value} </h1>
          </div>
          <div className="">
            <div
              className="mr-5 w-20 h-7 bg-white flex justify-center items-center rounded-md cursor-pointer"
              onClick={AdminLogout}
            >
              <button className="flex text-sm">
                <img className="w-5 h-5" src="/icons/logout.png" alt="Logout" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
