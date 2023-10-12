import FieldBase from "./FieldBase";

/**
 * 自定义数据
 */
export default class FieldCustom extends FieldBase {
    constructor(data: any, id?: string, label?: string) {
        super();
        this.customData = data;
        this.isCustom = true;
        this.id = id;
        this.label = label;
    }

}
