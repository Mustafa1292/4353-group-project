import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    console.log("user service login")
    fetch("http://localhost:8080/login", {}).then((result) => {
        return result.json()
    }).then((data) => {
        console.log(data);
        return data;
    })

   // return {};
}

function logout() {
    return {};
}

function register(user) {
    return {};
}
