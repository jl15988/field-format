import axios, {AxiosInstance} from "axios";
import FieldFormat from "./FieldFormat";
import {JSONData} from "./FieldBase";

const cacheMap: any = {};

/**
 * 添加响应拦截
 * @param instance
 * @param request
 */
const addResponseUse = (instance: FieldFormat, request: AxiosInstance) => {
    // 后置拦截
    request.interceptors.response.use(res => {
        try {
            // 删除缓存
            if (!res.config || !res.config.url) return res;
            const baseApi = res.config.url.replace(request.defaults.baseURL || "", "");
            let api;
            if (res.config.method === 'get') {
                api = baseApi + JSON.stringify(res.config.params);
            } else {
                api = baseApi + JSON.stringify(res.config.data);
            }
            if (cacheMap.hasOwnProperty(api)) {
                delete cacheMap[api];
            }
        } catch (err) {
        }
        if (instance.interceptors.response) {
            return instance.interceptors.response(res);
        }
        return res;
    })
}

const relRequest = (instance: FieldFormat) => {
    let request = instance.attrs.request;
    if (request) {
        // 响应拦截器
        const requestTemp = axios.create({
            baseURL: request.defaults.baseURL,
            timeout: request.defaults.timeout
        });
        requestTemp.interceptors.request = request.interceptors.request;
        addResponseUse(instance, requestTemp);
        request = requestTemp;
    } else {
        request = axios.create({
            baseURL: instance.attrs.baseUrl
        });
        addResponseUse(instance, request);
    }

    // 前置拦截
    request.interceptors.request.use(config => {
        if (instance.interceptors.request) {
            return instance.interceptors.request(config);
        }
        return config;
    });

    /**
     * Get缓存请求
     */
    instance.cacheGet = async (api: string, params: JSONData<any> | undefined | null) => {
        if (api.indexOf("/") !== 0) {
            api = "/" + api;
        }
        const key = api + JSON.stringify(params);
        if (!cacheMap.hasOwnProperty(key)) {
            if (request) {
                cacheMap[key] = request({
                    url: api,
                    method: 'get',
                    params
                });
            }
        }
        return cacheMap[key];
    }

    /**
     * Post缓存请求
     */
    instance.cachePost = async (api: string, data: JSONData<any> | undefined | null) => {
        if (api.indexOf("/") !== 0) {
            api = "/" + api;
        }
        const key = api + JSON.stringify(data);
        if (cacheMap.hasOwnProperty(key)) {
            if (request) {
                cacheMap[key] = request({
                    url: api,
                    method: 'post',
                    data
                });
            }
        }
        return cacheMap[key];
    }
}

export default relRequest;
