import axios from "axios";
const instance1=axios.create({
    baseURL:'http://localhost:3000/',
    // baseURL:'http://127.0.0.1:3333/',
    timeout:5000,
})

instance1.interceptors.request.use((config)=>{
    console.log(config);
    return config;
},(error)=>{
    console.log("请求失败");
    return Promise.reject(error);
})

instance1.interceptors.response.use((response)=>{
    console.log(response);
    return response;
},(error)=>{
    console.log("请求失败");
    return Promise.reject(error);
})
export default instance1;