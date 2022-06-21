import axios from "axios";
import Swal from "sweetalert2";
import authHeader from "./AuthHeader";


const API_URL = "";
class AuthService {
    login(username, password) {
        return axios
            .post(`${process.env.REACT_APP_API}auth/log-in/`, {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        Swal.fire(
            'Success!',
            'You have log-out.',
            'success'
        )
        window.location.reload();
    }
    register(account) {
        return axios.post(`${process.env.REACT_APP_API}auth/sign-up/`,account);
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
    getCurrentOrder(){
        return JSON.parse(localStorage.getItem('order'));
    }
    getListCartId(){
        return  JSON.parse(localStorage.getItem("listCartId"));
    }

}
export default new AuthService();
