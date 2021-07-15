import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    console.log("user service login")
    return fetch("http://localhost:8080/login", requestOptions)
        .then(handleResponse)
        .then((data) => {
            console.log("Service response data:", data.user);
            //redux store 
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        })

   // return {};
}

function logout() {
    return {};
}

function register(user) {
    return {};
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