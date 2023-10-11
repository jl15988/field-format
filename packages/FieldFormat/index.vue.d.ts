declare const LnFieldFormat: import("vue").DefineComponent<{
    /**
     * 用于匹配的值
     */
    value: (StringConstructor | NumberConstructor)[];
    /**
     * 要格式化的类型
     */
    type: StringConstructor;
    /**
     * 发起请求的额外参数
     */
    params: ObjectConstructor;
    /**
     * 没有匹配的数据时，代替显示的内容
     */
    alternate: StringConstructor;
    /**
     * 关闭Tag标签样式
     */
    closeTag: BooleanConstructor;
    /**
     * 要显示的Tag标签样式（默认的为default），见Element文档
     */
    tag: StringConstructor;
    /**
     * 按数据显示的Tag标签样式，数据值为key，样式为值
     */
    tags: ObjectConstructor;
}, {}, {
    data: undefined;
    list: never[];
    serve: undefined;
    id: undefined;
    label: undefined;
    method: string;
    requestParams: undefined;
    responseKey: string;
    dataField: string;
    class: undefined;
    isCustom: boolean;
    customData: undefined;
    render: undefined;
    tagTypes: undefined;
}, {
    fieldFormats(): any;
    hasSlot(): boolean;
    labelValue(): any;
    tagType(): any;
}, {
    /**
     * 解析
     */
    format(): void;
    /**
     * 获取参数
     * @returns {string|*}
     */
    getOption(): any;
    /**
     * 获取数据
     */
    getData(): Promise<void>;
    /**
     * 解析结果
     */
    relRes(res: any): void;
    cacheGet(): any;
    cachePost(): any;
}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    /**
     * 用于匹配的值
     */
    value: (StringConstructor | NumberConstructor)[];
    /**
     * 要格式化的类型
     */
    type: StringConstructor;
    /**
     * 发起请求的额外参数
     */
    params: ObjectConstructor;
    /**
     * 没有匹配的数据时，代替显示的内容
     */
    alternate: StringConstructor;
    /**
     * 关闭Tag标签样式
     */
    closeTag: BooleanConstructor;
    /**
     * 要显示的Tag标签样式（默认的为default），见Element文档
     */
    tag: StringConstructor;
    /**
     * 按数据显示的Tag标签样式，数据值为key，样式为值
     */
    tags: ObjectConstructor;
}>>, {
    closeTag: boolean;
}>;
export default LnFieldFormat;
