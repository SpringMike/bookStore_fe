import {Outlet} from "react-router-dom";
import NotFound from "../pages/NotFound";



const useAuth = () =>{
    const user1 = JSON.parse(localStorage.getItem("user"))
    const user = { isAdmin: false}
    let checkAdmin = false

    if (user1 !== null){
        for (let i =0; i <user1.roles.length;i++){
            if (user1.roles[i] === "ROLE_ADMIN"){
                checkAdmin = true
            }
        }
        if (checkAdmin){
            user.isAdmin = true
        }
    }
    return user.isAdmin
}

const ProtectedRoutesWithROl = () =>{
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <NotFound/>
}
export default ProtectedRoutesWithROl
