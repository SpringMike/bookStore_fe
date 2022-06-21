import {Outlet} from "react-router-dom";
import SignIn from "../pages/SignIn";



const useAuth = () =>{
    const user = { isLogin: false,isAdmin:false}
    if (JSON.parse(localStorage.getItem("user")) !== null){
        user.isLogin = true
    }
    return user.isLogin
}

const ProtectedRoutes = () =>{
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <SignIn/>
}
export default ProtectedRoutes
