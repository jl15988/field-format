import { Vue } from 'vue-property-decorator';
export default class LnFieldFormat extends Vue {
    /**
     * 用于匹配的值
     */
    private value;
    /**
     * 当前数据
     */
    private row;
    /**
     * 要格式化的类型
     */
    private type;
    /**
     * 发起请求的额外参数
     */
    private params;
    /**
     * 没有匹配的数据时，代替显示的内容
     */
    private alternate;
    /**
     * 关闭Tag标签样式
     */
    private closeTag;
    /**
     * 要显示的Tag标签样式（默认的为default），见Element文档
     */
    private tag;
    /**
     * 按数据显示的Tag标签样式，数据值为key，样式为值
     */
    private tags;
    private fieldData;
    private list;
    private serve;
    private id;
    private label;
    private method;
    private requestParams;
    private responseKey;
    private dataField;
    private class;
    private isCustom;
    private customData;
    private $render;
    private tagTypes;
    get defaultShow(): boolean;
    get tagShow(): boolean;
    get fieldFormats(): any;
    get hasSlot(): boolean;
    get labelValue(): any;
    get tagType(): any;
    /**
     * 是否为自定义数组类型
     * @returns {boolean}
     */
    get isCustomArray(): any;
    onTypeChange(): void;
    onValueChange(): void;
    /**
     * 解析
     */
    private format;
    /**
     * 获取参数
     * @returns {string|*}
     */
    private getOption;
    /**
     * 获取数据
     */
    private getData;
    /**
     * 解析结果
     */
    private relRes;
    private cacheGet;
    private cachePost;
    private created;
    render(): JSX.Element;
}
