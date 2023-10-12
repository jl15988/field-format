import {Vue} from "vue-property-decorator";

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
