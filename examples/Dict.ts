import FieldBase from "../packages/FieldFormat/FieldBase";

export default class Dict extends FieldBase {
    constructor(type: string) {
        super();
        this.serve = 'system/dict/data/dictType/' + type;
        this.id = "dictValue";
        this.label = "dictLabel";
    }
}
