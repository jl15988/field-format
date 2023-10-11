export interface JSONData<T> {
    [key: string]: T | any;
}
export type TagType = 'primary' | 'gray' | 'success' | 'warning' | 'danger';
export default class FieldBase {
    /**
     * 请求地址或请求方法或枚举类型，请求方法可以是api中的，必须是Function: () => Promise格式
     * @protected
     */
    protected serve: string | Function;
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
    protected requestParams: any;
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
    protected customData: JSONData<any>;
    /**
     * 用于自定义渲染操作，参数为(data, list)，data为当前数据项，list为全部数据列表
     * @protected
     */
    protected render: undefined | ((data: any, list: any[]) => string);
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
    renders(render: ((data: any, list: any[]) => string)): FieldBase;
}
