import axios from "axios";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImUwZjU4NzBmLWNjOGQtNDhmYS1iNjg3LWE4MzljMDJiNjkxNyJ9.UhEgrq1GQZ5LtC85MoYLOTBSaVuw3nGXO4NtvU5E63-J2JUkkpMLjNLecyI7NkX8enG-wFHOuVvJSLZBJoiJkw";

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: 'http://192.168.0.130:8089/api-docs',
    // 超时
    timeout: 100000
})

service.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(res => {
    console.log(res);
    return res;
})

export default service;
