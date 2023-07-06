import React,{useEffect} from "react";
import {Routes,Route} from "react-router-dom"
import Home from '../pages/User/Home';
import UserLogin from "../pages/User/UserLoing";
import UserSignup from "../pages/User/userSignup";
import UserOPT from "../pages/User/UserOPT";
import {useDispatch} from "react-redux"
// import { useCookies } from 'react-cookie';
import { userActions } from "../Store/redux/UserAuth";

function User() {
  const dispatch = useDispatch()
  
  // const [cookies] = useCookies(['jwtToken']);
  // console.log(cookies['jwtToken']);
  useEffect(()=>{
    // console.log(cookies);
    
  },[])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/userLogin"  element={<UserLogin/>}/>
        <Route path="/userSignup"  element={<UserSignup/>}/>
        <Route path="/OTP"  element={<UserOPT/>}/>
      </Routes>
    </div>
  )
}

export default User
