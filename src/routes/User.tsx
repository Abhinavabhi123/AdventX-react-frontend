import {Routes,Route} from "react-router-dom"
import Home from '../pages/User/Home';
import UserLogin from "../pages/User/UserLoing";
import UserSignup from "../pages/User/userSignup";

function User() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/userLogin"  element={<UserLogin/>}/>
        <Route path="/userSignup"  element={<UserSignup/>}/>
      </Routes>
    </div>
  )
}

export default User
