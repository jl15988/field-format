import FieldFormat, {FieldFormatAttr, FieldFormatOptions} from "./FieldFormat";

export default class FieldFormatDiplomat {
    readonly name: string;

    constructor() {
        this.name = 'FieldFormat';
    }

    create(options: FieldFormatOptions, attrs: FieldFormatAttr): FieldFormat {
        return new FieldFormat(options, attrs);
    }
}
