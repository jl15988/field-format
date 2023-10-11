# field-format
A globally maintainable field formatting component.

## 1. 安装
```js
npm install field-format -S
```

## 2. 配置

添加 `field-format.js`

```js
import formatDiplomat, {Field, FieldCustom} from "field-format";
import Vue from "vue";

const fieldFormat = formatDiplomat.create({
    // 车辆类型（全路径）
    vehicleTypeFull: new Field('/bayonet/vehicleType/listAll', "vehicleTypeId", "name")
        .renders((data, list) => {
            if (!data || !data.name) {
                return "";
            }
            const names = [data.name];

            findParent(data);

            function findParent(row) {
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

const token = "";

// 前置请求拦截
fieldFormat.interceptors.request = (config) => {
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
}

// 后置请求拦截
fieldFormat.interceptors.response = (res) => {
    return res;
}

Vue.use(fieldFormat)

export default fieldFormat

```

在 main.js 中引入
```js
import fieldFormat from "./field-format";
new Vue({
    fieldFormat,
    render: h => h(App)
}).$mount('#app')
```

## 3. 使用

### 1. 格式化
在需要格式化的地方，使用组件 field-format，value为已知数据值， type 为 formatOptions 中添加的名称，另外还有 params 字段用于请求自定义传参
```vue
<field-format :value="form.vehicleType" type="vehicleType"></field-format>
```

### 2. 自定义插槽
可以使用插槽实现更多场景的功能，如
```html
<field-format :value="form.vehicleType" type="vehicleType">
  <template #format="{data}">{{ data.name }}</template>
</field-format>
```

### 3. 遍历
或者获取所有列表，用于遍历
```html
<field-format type="vehicleType">
    <template #list="{list}">
      <el-select v-model="form.vehicleType">
        <el-option
          v-for="item in list"
          :label="item.name"
          :value="item.vehicleTypeId"
          :key="item.vehicleTypeId"
        ></el-option>
      </el-select>
    </template>
  </field-format>
</el-form-item>
```

### 4. 默认插槽
用以自定义追加数据
