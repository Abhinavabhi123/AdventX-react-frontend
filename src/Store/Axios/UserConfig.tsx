import axios from "axios";
import Cookies from "js-cookie";

const UserAxios =axios.create({
    baseURL:import.meta.env.VITE_USER_API,
    headers:{
        "Content-Type":"application/json"
    }
});

UserAxios.interceptors.request.use(
    function(config){
        const token=Cookies.get("jwtToken");
        config.headers.Authorization = token;
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)
export default UserAxios