import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import FieldBase from "./FieldBase";
import { PluginFunction } from "vue";
import LnFieldFormat from "./index.vue";
interface RequestInterceptors {
    request: ((config: InternalAxiosRequestConfig<any>) => (Promise<InternalAxiosRequestConfig<any>> | InternalAxiosRequestConfig<any>)) | null;
    response: ((res: AxiosResponse) => (Promise<AxiosResponse> | AxiosResponse)) | null;
}
export interface FieldFormatAttr {
    /**
     * 基础url
     */
    baseUrl?: string;
    /**
     * axios实体
     */
    request?: AxiosInstance;
}
export interface FieldFormatOptions {
    [key: string]: FieldBase | any;
}
interface CacheTypes {
    [key: string]: {}[] | {};
}
export default class FieldFormat {
    /**
     * 格式化类型项
     * @private
     */
    options: FieldFormatOptions;
    /**
     * 属性
     */
    attrs: FieldFormatAttr;
    interceptors: RequestInterceptors;
    /**
     * 缓存get
     */
    cacheGet: ((api: string, params: any) => Promise<any>) | undefined;
    /**
     * 缓存post
     */
    cachePost: ((api: string, data: any) => Promise<any>) | undefined;
    /**
     * 类型数据缓存
     */
    private cacheTypes;
    /**
     * 添加类型数据缓存
     * @param type 类型
     * @param data 数据
     */
    addCacheTypes(type: string, data: CacheTypes): void;
    /**
     * @param options 格式化类型项
     * @param attrs 属性
     */
    constructor(options: FieldFormatOptions, attrs: FieldFormatAttr);
    /**
     * 安装
     * @param Vue
     */
    install: PluginFunction<never>;
}
export { LnFieldFormat };
