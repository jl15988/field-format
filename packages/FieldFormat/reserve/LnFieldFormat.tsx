import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import ElTag from "../tag.vue";
import {JSONData, renderParams, TagType} from "../FieldBase";
import {AxiosResponse} from "axios";

@Component({
    components: {
        ElTag
    }
})

export default class LnFieldFormat extends Vue {

    /**
     * 用于匹配的值
     */
    @Prop([String, Number]) private value!: string | number;
    /**
     * 当前数据
     */
    @Prop(Object) private row: object | undefined;
    /**
     * 要格式化的类型
     */
    @Prop(String) private type: string | undefined;
    /**
     * 发起请求的额外参数
     */
    @Prop(Object) private params: object | undefined;
    /**
     * 没有匹配的数据时，代替显示的内容
     */
    @Prop(String) private alternate: string | undefined;
    /**
     * 关闭Tag标签样式
     */
    @Prop(Boolean) private closeTag: boolean | undefined;
    /**
     * 要显示的Tag标签样式（默认的为default），见Element文档
     */
    @Prop(String) private tag: TagType | undefined;
    /**
     * 按数据显示的Tag标签样式，数据值为key，样式为值
     */
    @Prop(Object) private tags: JSONData<TagType> | undefined;

    private fieldData: any;
    private list: any[] | undefined;
    private serve: string | Function | undefined;
    private id: string = '';
    private label: string | undefined;
    private method: string = 'get';
    private requestParams: JSONData<any> | undefined;
    private responseKey: string = 'data';
    private dataField: string = 'data';
    private class: string | undefined;
    private isCustom: boolean = false;
    private customData: any;
    private $render: (((params: renderParams) => string)) | undefined;
    private tagTypes: JSONData<TagType> | undefined;

    get defaultShow() {
        if (!this.hasSlot) {
            if ((!this.tag && !this.tags && !this.tagTypes) || this.closeTag) {
                return true;
            }
        }
        return false;
    }

    get tagShow() {
        if (!this.hasSlot) {
            if (this.labelValue && (this.tag || this.tags || this.tagTypes) && !this.closeTag) {
                return true;
            }
        }
        return false;
    }

    get fieldFormats() {
        // 获取缓存的数据
        // @ts-ignore
        return this.$fieldFormat.cacheTypes;
    }

    get hasSlot() {
        // 判断有没有插槽（默认插槽除外）
        return (this.$scopedSlots && (!!this.$scopedSlots.list || !!this.$scopedSlots.format))
            || (this.$slots && (!!this.$slots.list || !!this.$slots.format));
    }

    get labelValue() {
        if (this.$render) {
            const params: renderParams = {
                data: this.fieldData,
                list: this.list,
                row: this.row,
                customData: this.customData,
                value: this.value
            }
            if (this.isCustom && !this.isCustomArray) {
                // 如果是自定义数据，且不是数组类型，则重新定义data
                params.data = this.customData ? this.customData[this.value] : "";
            }
            return this.$render(params);
        } else if (this.isCustom && !this.isCustomArray) {
            if (!this.customData) {
                return "";
            }
            return this.customData[this.value];
        } else if (this.fieldData && this.label) {
            return this.fieldData[this.label];
        } else {
            return this.alternate;
        }
    }

    get tagType() {
        if (this.closeTag) {
            return "";
        }
        if (this.tag) {
            return this.tag;
        } else if (this.tags) {
            return this.tags[this.value];
        } else if (this.tagTypes) {
            return this.tagTypes[this.value];
        } else {
            return "";
        }
    }

    /**
     * 是否为自定义数组类型
     * @returns {boolean}
     */
    get isCustomArray() {
        return this.isCustom && this.id && this.customData && this.customData instanceof Array;
    }

    @Watch('type')
    onTypeChange() {
        // 类型改变时重新获取数据
        this.getData();
    }

    @Watch('value')
    onValueChange() {
        // 值改变时重新解析
        this.format();
    }

    /**
     * 解析
     */
    private format(): void {
        // 在列表中查找对应数据
        if (this.isCustomArray) {
            // 如果是自定义的，有id，且自定义数据为数组，则直接赋值list走统一逻辑
            this.list = this.customData;
        }

        const list = this.list;
        if (list && list.length > 0) {
            this.fieldData = list.find(datum => String(datum[this.id]) === String(this.value));
        }
    }

    /**
     * 获取参数
     * @returns {string|*}
     */
    private getOption(): string | (() => Promise<AxiosResponse<any>>) {
        // 根据type获取option
        // @ts-ignore
        const option = this.$fieldFormat.options[this.type];
        // 赋值属性
        this.serve = option.serve;
        this.id = option.id;
        this.label = option.label;
        this.method = option.method;
        this.requestParams = option.requestParams;
        this.responseKey = option.responseKey;
        this.dataField = option.dataField;
        this.class = option.class;
        this.isCustom = option.isCustom;
        this.customData = option.customData;
        this.$render = option.$render;
        this.tagTypes = option.tagTypes;
        // Object.assign(this.$data, option);
        return option.serve;
    }

    /**
     * 获取数据
     */
    private async getData(): Promise<void> {
        const serve = this.getOption();

        // 如果vuex中有当前类型缓存，则取缓存
        if (this.fieldFormats[this.type]) {
            this.list = this.fieldFormats[this.type];
            this.format();
            return;
        }

        if (serve instanceof Function) {
            // 如果serve类型为Function，则直接调用取值
            serve().then(res => {
                this.relRes(res);
            });
        } else {
            if (this.isCustom) {
                this.format();
            } else {
                let res;
                if (this.method === "post") {
                    res = await this.cachePost()(serve, this.params || this.requestParams);
                } else {
                    res = await this.cacheGet()(serve, this.params || this.requestParams);
                }
                this.relRes(res);
            }
        }
    }

    /**
     * 解析结果
     */
    private relRes(res: any): void {
        let list = this.list = res[this.responseKey][this.dataField];
        // @ts-ignore
        this.$fieldFormat.addCacheTypes(this.type, list);
        this.format();
    }

    private cacheGet(): ((api: string, params: any) => Promise<any>) {
        // @ts-ignore
        return this.$fieldFormat.cacheGet;
    }

    private cachePost(): ((api: string, params: any) => Promise<any>) {
        // @ts-ignore
        return this.$fieldFormat.cachePost;
    }

    private created() {
        this.getData();
    }

    render() {
        return (
            <span>
                {this.defaultShow ? this.labelValue : ''}
                {this.tagShow ? <el-tag type={this.tagType}>{this.labelValue}</el-tag> : ''}
                {this.$scopedSlots && this.$scopedSlots.list && this.$scopedSlots.list({
                    list: this.list
                })}
                {this.$scopedSlots && this.$scopedSlots.data && this.$scopedSlots.data({
                    data: this.fieldData
                })}
            </span>
        )
    }
}
