import axios from 'axios';

const chatAppToken = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: Infinity
});

chatAppToken.interceptors.request.use((config)=>{
    let token = localStorage.getItem("x-token-chatApp");
    config.headers["x-token"] = token;
    return config;
})

const chatApp = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000
});

export{
    chatAppToken,
    chatApp
}
