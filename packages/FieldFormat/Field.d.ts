import FieldBase from "./FieldBase";
import { AxiosResponse } from "axios";
/**
 * 字段，用以匹配后端字段
 */
export default class Field extends FieldBase {
    constructor(serve: string | (() => Promise<AxiosResponse<any>>), id?: string, label?: string, method?: string, dataField?: string);
}
