import {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {PluginFunction} from "vue";
import {Vue} from "vue-property-decorator";

/**
 * 字段，用以匹配后端字段
 */
export class Field extends FieldBase {
    constructor(serve: string | (() => Promise<AxiosResponse<any>>), id?: string, label?: string, method?: string, dataField?: string);
}

export interface JSONData<T> {
    [key: string]: T | any;
}

export interface renderParams {
    data: any;
    list: any[] | undefined;
    row: object | undefined;
    customData: any | undefined;
    value: string | number | undefined;
}

export type TagType = 'primary' | 'gray' | 'success' | 'warning' | 'danger';

export class FieldBase {
    /**
     * 请求地址或请求方法或枚举类型，请求方法可以是api中的，必须是Function: () => Promise格式
     * @protected
     */
    protected serve: string | (() => Promise<AxiosResponse<any>>);
    /**
     * 请求后的数据列表字段，用于匹配那一条数据
     * @protected
     */
    protected id: string | undefined;
    /**
     * 请求后的数据列表字段，用于自动格式化字段
     * @protected
     */
    protected label: string | undefined;
    /**
     * 请求方式，默认get
     * @protected
     */
    protected method: string | undefined;
    /**
     * 请求参数
     * @protected
     */
    protected requestParams: JSONData<any> | undefined;
    /**
     * 响应后数据的key值
     * @protected
     */
    protected responseKey: string;
    /**
     * 请求后的data字段，默认data
     * @protected
     */
    protected dataField: string | undefined;
    /**
     * 类别，保留
     * @protected
     */
    protected class: string;
    /**
     * 是否自定义，开启自定义数据模式
     * @protected
     */
    protected isCustom: boolean;
    /**
     * 自定义的数据
     * @protected
     */
    protected customData: any;
    /**
     * 用于自定义渲染操作，参数为(data, list)，data为当前数据项，list为全部数据列表
     * @protected
     */
    protected renderField: undefined | ((params: renderParams) => string);
    /**
     * tag属性，用以匹配el-tag样式
     * @protected
     */
    protected tagTypes: JSONData<TagType> | undefined;

    constructor();

    /**
     * 添加tag属性，用以匹配el-tag样式
     * @param tags
     */
    tags(tags: JSONData<TagType>): this;

    /**
     * 添加自定义渲染，传入函数，将渲染返回的内容
     * @param render
     */
    renders(render: ((params: renderParams) => string)): FieldBase;
}

/**
 * 自定义数据
 */
export class FieldCustom extends FieldBase {
    constructor(data: any, id?: string, label?: string);
}

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

export class FieldFormat {
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

export class FieldFormatDiplomat {
    readonly name: string;

    constructor();

    create(options: FieldFormatOptions, attrs: FieldFormatAttr): FieldFormat;
}

export declare class LnFieldFormat extends Vue {
    /**
     * 用于匹配的值
     */
    value: string | number;
    /**
     * 当前数据
     */
    row: object | undefined;
    /**
     * 要格式化的类型
     */
    type: string | undefined;
    /**
     * 发起请求的额外参数
     */
    params: object | undefined;
    /**
     * 没有匹配的数据时，代替显示的内容
     */
    alternate: string | undefined;
    /**
     * 关闭Tag标签样式
     */
    closeTag: boolean | undefined;
    /**
     * 要显示的Tag标签样式（默认的为default），见Element文档
     */
    tag: TagType | undefined;
    /**
     * 按数据显示的Tag标签样式，数据值为key，样式为值
     */
    tags: JSONData<TagType> | undefined;

    /**
     * 解析
     */
    format(): void;

    /**
     * 获取参数
     * @returns {string|*}
     */
    getOption(): string | (() => Promise<AxiosResponse<any>>);

    /**
     * 获取数据
     */
    getData(): Promise<void>;

    /**
     * 解析结果
     */
    relRes(res: any): void;

    cacheGet(): ((api: string, params: any) => Promise<any>);

    cachePost(): ((api: string, params: any) => Promise<any>);
}

declare const relRequest: (instance: FieldFormat) => void;
export {
    relRequest
};

declare const fieldFormat: FieldFormatDiplomat;
export default fieldFormat;
