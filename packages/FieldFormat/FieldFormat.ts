import LnFieldFormat from './index.vue'
import {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import FieldBase from "./FieldBase";
import {Vue as _Vue} from "vue/types/vue";
import relRequest from "./RelRequest";
import {PluginFunction} from "vue";

interface RequestInterceptors {
    request: ((config: InternalAxiosRequestConfig<any>) => (Promise<InternalAxiosRequestConfig<any>> | InternalAxiosRequestConfig<any>)) | null,
    response: ((res: AxiosResponse) => (Promise<AxiosResponse> | AxiosResponse)) | null
}

export interface FieldFormatAttr {
    /**
     * 基础url
     */
    baseUrl?: string,
    /**
     * axios实体
     */
    request?: AxiosInstance
}

export interface FieldFormatOptions {
    [key: string]: FieldBase | any
}

interface CacheTypes {
    [key: string]: {}[] | {}
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

    interceptors: RequestInterceptors = {
        request: null,
        response: null
    };

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
    private cacheTypes: CacheTypes = {};

    /**
     * 添加类型数据缓存
     * @param type 类型
     * @param data 数据
     */
    public addCacheTypes(type: string, data: CacheTypes) {
        this.cacheTypes[type] = data;
    }

    /**
     * @param options 格式化类型项
     * @param attrs 属性
     */
    constructor(options: FieldFormatOptions, attrs: FieldFormatAttr) {
        this.options = options;
        this.attrs = attrs;
        relRequest(this);
    }

    /**
     * 安装
     * @param Vue
     */
    install: PluginFunction<never> = (Vue: typeof _Vue) => {
        Vue.component('LnFieldFormat', LnFieldFormat);
        Vue.mixin({
            beforeCreate() {
                // @ts-ignore
                if (this.$options.fieldFormat) {
                    // @ts-ignore
                    this._fieldFormatRoot = this;
                    // @ts-ignore
                    this.$fieldFormat = this.$options.fieldFormat;
                } else {
                    // @ts-ignore
                    this._fieldFormatRoot = (this.$parent && this.$parent._fieldFormatRoot) || this;
                    // @ts-ignore
                    this.$fieldFormat = this._fieldFormatRoot.$fieldFormat;
                }
            }
        })
    }
}

const install = (Vue: typeof _Vue) => {
    Vue.component('LnFieldFormat', LnFieldFormat);
    Vue.mixin({
        beforeCreate() {
            // @ts-ignore
            this._fieldFormat = this.$options.fieldFormat;
            console.log(this.$options)
        }
    })
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    LnFieldFormat
}


