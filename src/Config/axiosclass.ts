import axios from "axios";

const axiosclass = axios.create({
    baseURL: "http://localhost:8080",
})

export default axiosclass;