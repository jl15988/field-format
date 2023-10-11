import FieldBase, { JSONData } from "./FieldBase";
/**
 * 自定义数据
 */
export default class FieldCustom extends FieldBase {
    constructor(data: JSONData<any>, id?: string, label?: string);
}
