import React,{useEffect} from "react";
import {Routes,Route} from "react-router-dom"
import {useDispatch} from "react-redux"

import Home from '../pages/User/Home';
import UserLogin from "../pages/User/UserLoing";
import UserSignup from "../pages/User/userSignup";
import ForgetPass from "../pages/User/ForgetPass";
import UserOPT from "../pages/User/UserOPT";

// import { useCookies } from 'react-cookie';
import { userActions } from "../Store/redux/UserAuth";
import ChangePass from "../components/User/Forget/ChangePass";

function User() {
  const dispatch = useDispatch()
  
  // const [cookies,setcookie] = useCookies(['jwtToken']);
  // console.log(cookies['jwtToken']);
  // console.log(cookies);
  useEffect(()=>{
    console.log();
    
  },[])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/userLogin"  element={<UserLogin/>}/>
        <Route path="/userSignup"  element={<UserSignup/>}/>
        <Route path="/OTP"  element={<UserOPT/>}/>
        <Route path="/forgetPass"  element={<ForgetPass/>}/>
      </Routes>
    </div>
  )
}

export default User
