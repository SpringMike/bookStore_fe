import Auth from "./Auth";

export default function authHeader() {
    const user = Auth.getCurrentUser();

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

