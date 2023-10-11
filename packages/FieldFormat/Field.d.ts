import FieldBase from "./FieldBase";
/**
 * 字段，用以匹配后端字段
 */
export default class Field extends FieldBase {
    constructor(serve: string | Function, id?: string, label?: string, method?: string, dataField?: string);
}
