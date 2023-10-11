<template>
  <span>
    <template v-if="!hasSlot && !tag && !tags && !tagTypes">{{ labelValue }}</template>
    <el-tag v-if="!hasSlot && labelValue && (tag || tags || tagTypes)" :type="tagType">{{ labelValue }}</el-tag>
    <slot></slot>
    <slot name="format" :data="data"></slot>
    <slot name="list" :list="list"></slot>
  </span>
</template>

<script>

import ElTag from "./tag.vue";

export default {
  name: "LnFieldFormat",
  components: {ElTag},
  props: {
    /**
     * 用于匹配的值
     */
    value: [String, Number],
    /**
     * 要格式化的类型
     */
    type: String,
    /**
     * 发起请求的额外参数
     */
    params: Object,
    /**
     * 没有匹配的数据时，代替显示的内容
     */
    alternate: String,
    /**
     * 关闭Tag标签样式
     */
    closeTag: Boolean,
    /**
     * 要显示的Tag标签样式（默认的为default），见Element文档
     */
    tag: String,
    /**
     * 按数据显示的Tag标签样式，数据值为key，样式为值
     */
    tags: Object
  },
  data() {
    return {
      data: undefined,
      list: [],
      serve: undefined,
      id: undefined,
      label: undefined,
      method: 'get',
      requestParams: undefined,
      responseKey: 'data',
      dataField: 'data',
      class: undefined,
      isCustom: false,
      customData: undefined,
      render: undefined,
      tagTypes: undefined
    }
  },
  computed: {
    fieldFormats() {
      // 获取缓存的数据
      return this.$fieldFormat.cacheTypes;
    },
    hasSlot() {
      // 判断有没有插槽（默认插槽除外）
      return (this.$scopedSlots && (!!this.$scopedSlots.list || !!this.$scopedSlots.format))
        || (this.$slots && (!!this.$slots.list || !!this.$slots.format));
    },
    labelValue() {
      if (this.render) {
        return this.render(this.data, this.list);
      } else if (this.isCustom && !this.id) {
        return this.customData[this.value];
      } else if (this.data && this.label) {
        return this.data[this.label];
      } else {
        return this.alternate;
      }
    },
    tagType() {
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
  },
  watch: {
    type: {
      handler(n) {
        // 类型改变时重新获取数据
        this.getData();
      }
    },
    value: {
      handler(n) {
        // 值改变时重新解析
        this.format();
      }
    }
  },
  methods: {
    /**
     * 解析
     */
    format() {
      // 在列表中查找对应数据
      if (this.isCustom && this.id) {
        this.list = this.customData;
      }

      const list = this.list;
      if (list && list.length > 0) {
        this.data = list.find(datum => String(datum[this.id]) === String(this.value));
      }
    },
    /**
     * 获取参数
     * @returns {string|*}
     */
    getOption() {
      // 根据type获取option
      const option = this.$fieldFormat.options[this.type];
      // 赋值属性
      Object.assign(this.$data, option);
      return option.serve;
    },
    /**
     * 获取数据
     */
    async getData() {
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
    },
    /**
     * 解析结果
     */
    relRes(res) {
      let list = this.list = res[this.responseKey][this.dataField];
      this.$fieldFormat.addCacheTypes(this.type, list);
      this.format();
    },
    cacheGet() {
      return this.$fieldFormat.cacheGet;
    },
    cachePost() {
      return this.$fieldFormat.cachePost;
    }
  },
  created() {
    this.getData();
  }
}
</script>