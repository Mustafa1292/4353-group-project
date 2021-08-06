import { authHeader } from '../helpers';
import {
    API_URL
} from "../constants/api";


export const userService = {
    login,
    logout,
    register,
    updateProfile,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    console.log("user service login")
    return fetch(API_URL + "/login", requestOptions)
        .then(handleResponse)
        .then((user) => {
            console.log("Service response data:", user);
            //redux store 
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })

   // return {};
}

function logout() {
    // localStorage.setItem('user', "");
    localStorage.removeItem('user');
    
    return {};
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(API_URL + "/register", requestOptions)
        .then(handleResponse)
        .then((data) => {
            console.log("Response from server after registration");
            return data;
        })
}


function updateProfile(username, profile) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({profile})
    };
    return fetch(API_URL + `/user/${username}/profile`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            console.log("Response from server after registration");
            return data.user;
        })
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}