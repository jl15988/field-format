<script>
export default {
  name: 'ElTag',
  props: {
    text: String,
    type: String
  },
  render(h) {
    const {type, effect} = this;
    const classes = [
      'el-tag',
      type ? `el-tag--${type}` : ''
    ];
    const tagEl = (
      <span
        class={classes}>
          {this.$slots.default}
        </span>
    );

    return tagEl;
  }
};
</script>
<style>
.el-tag {
  background-color: #ecf5ff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}

.el-tag.el-tag--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}

.el-tag.el-tag--info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}

.el-tag.el-tag--warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}

.el-tag.el-tag--danger {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

.el-tag--medium {
  height: 28px;
  line-height: 26px;
}
</style>
