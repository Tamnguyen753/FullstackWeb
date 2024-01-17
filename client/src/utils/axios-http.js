import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
})

const request = (config) => {
    console.log(config);
    return instance({ ...config });
}

const requestWithToken = (config) => {
    const token = localStorage.getItem("access_token")

    return instance({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        ...config,
    })
}

export { request, requestWithToken }