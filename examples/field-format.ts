import formatDiplomat, {Field, FieldCustom} from "../packages";
import Vue from "vue";
import Dict from "./Dict";

const fieldFormat = formatDiplomat.create({
    // 通道方向
    xz_passage_direction: new Dict("xz_passage_direction")
        .tags({
            "0": "success",
            "1": ""
        }),
    // 车辆类型（全路径）
    vehicleTypeFull: new Field('/bayonet/vehicleType/listAll', "vehicleTypeId", "name")
        .renders((data, list) => {
            if (!data || !data.name) {
                return "";
            }
            const names = [data.name];

            findParent(data);

            function findParent(row: any) {
                if (!row.parentId) {
                    return;
                }
                const vehicleType = list.find(item => item.vehicleTypeId === row.parentId);
                if (vehicleType && vehicleType.name) {
                    names.push(vehicleType.name);
                }
                if (vehicleType && list.filter(item => item.vehicleTypeId === vehicleType.parentId).length > 0) {
                    findParent(vehicleType);
                }
            }

            names.reverse();
            return names.join("/");
        }),
    passStatus: new FieldCustom({
        "0": "禁行",
        "1": "通行"
    }).tags({
        "0": "danger",
        "1": "success"
    })
}, {
    baseUrl: 'http://192.168.0.130:8089/api-docs'
});

const token = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjdlZTFhZTNiLWFhOGItNGI0YS05M2JjLTA4NDdiOTIzZjQ1ZiJ9.rRZ0zoBGbkxipgnZzc4paVPVfHHIJ4lLNVlQkU1pp1IUD1CrY43xdklCq9yOIYxw0OfV9r_rFAlFH9In_K4j-Q";
fieldFormat.interceptors.request = (config) => {
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
}

fieldFormat.interceptors.response = (res) => {
    return res;
}
Vue.use(fieldFormat)

export default fieldFormat
