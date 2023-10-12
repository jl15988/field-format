# field-format
A globally maintainable field formatting component.



> **场景：** 对于一些全局公用的状态，或是字典，甚至是后端枚举，为了方便维护，我们应尽量使它们全局公用，但我们在开发往往会忽略这个问题，总想着后面再改，可随着项目的不断推进，我们往往都视之不理。
> **功能：** 解决vue项目中字段、字典、状态类全局维护问题。
> **优势：** 一次配置全局公用、可单独变更、可自定义、低请求、方便、快捷。
> **特点：** 组件化、全局化、公用化。



## 1. 安装

```js
npm install field-format -S
```



## 2. 配置

添加 `fieldFormat.js`

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
import fieldFormat from "./fieldFormat";
new Vue({
    fieldFormat,
    render: h => h(App)
}).$mount('#app')
```



field-format内置了axios.js，直接传入 baseUrl 即可自动发起请求，另外你也可以通过前置请求拦截或后置请求拦截进行一些操作。

除此之外，你也可以传入自己的 axios 实体。

```js
import serve from 'request';

const fieldFormat = formatDiplomat.create({
    passStatus: new FieldCustom({
        "0": "禁行",
        "1": "通行"
    }).tags({
        "0": "danger",
        "1": "success"
    })
}, {
    request: serve
});
```



### 自定义属性类

field-format 内置了 FieldBase、FieldCustom、Field 三种属性类，你也可以直接使用 JSON 数据，另外你也可以自定义属性类。

```js
import {FieldBase} from "field-format";

export default class Dict extends FieldBase {
    constructor(type: string) {
        super();
        this.serve = 'system/dict/data/dictType/' + type;
        this.id = "dictValue";
        this.label = "dictLabel";
    }
}
```



## 3. 属性

### 1. 类属性

| 属性          | 类型               | 说明                                                         | 默认值 |
| ------------- | ------------------ | ------------------------------------------------------------ | ------ |
| serve         | String 或 Function | 请求地址或请求方法或枚举类型，请求方法可以是api中的，必须是Function: () => Promise格式 | -      |
| id            | String             | 请求后的数据列表字段，用于匹配那一条数据                     | -      |
| label         | String             | 请求后的数据列表字段，用于自动格式化字段                     | -      |
| method        | String             | 请求方式，默认get                                            | get    |
| requestParams | any                | 请求参数                                                     | -      |
| responseKey   | String             | 响应后数据的key值                                            | data   |
| dataField     | String             | 请求后的data字段，默认data                                   | data   |
| class         | String             | 类别，保留属性                                               | -      |
| isCustom      | Boolean            | 是否自定义，开启自定义数据模式                               | -      |

### 2. 组件属性

| 属性      | 类型             | 说明                                                  |
| --------- | ---------------- | ----------------------------------------------------- |
| value     | String 或 Number | 用于匹配的值                                          |
| type      | String           | 要格式化的类型                                        |
| params    | Object           | 发起请求的额外参数                                    |
| alternate | String           | 没有匹配的数据时，代替显示的内容                      |
| closeTag  | Boolean          | 关闭Tag标签样式                                       |
| tag       | String           | 要显示的Tag标签样式（默认的为default），见Element文档 |
| tags      | Object           | 按数据显示的Tag标签样式，数据值为key，样式为值        |



## 4. 使用

### 1. 格式化
在需要格式化的地方，使用组件 field-format，value为已知数据值， type 为 formatOptions 中添加的名称，另外还有 params 字段用于请求自定义传参
```vue
<ln-field-format :value="form.vehicleType" type="vehicleType"></ln-field-format>
```

### 2. 自定义插槽
可以使用插槽实现更多场景的功能，如
```html
<ln-field-format :value="form.vehicleType" type="vehicleType">
  <template #format="{data}">{{ data.name }}</template>
</ln-field-format>
```

### 3. 遍历
或者获取所有列表，用于遍历
```html
<ln-field-format type="vehicleType">
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
  </ln-field-format>
</el-form-item>
```

### 4. 默认插槽
用以自定义追加数据
