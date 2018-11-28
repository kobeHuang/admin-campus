<template>
  <div ref="editor" class="editor">
  </div>
</template>
<script>
let editor = null;
export default {
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selfContent: this.content
    };
  },
  watch: {
    content(newVal) {
      editor.txt.html(newVal);    
    }
  },
  mounted() {
    const E = window.wangEditor;
    editor = new E(this.$refs.editor);
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code" // 插入代码
    ];
    editor.customConfig.onchange = html => {
      this.selfContent = html;
      this.$emit("changeContent", this.selfContent);
    };
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();
    editor.txt.html(this.content);  
  }
};
</script>
<style lang='scss' scoped>
.editor {
  /deep/ .w-e-menu {
    z-index: 11 !important;
  }
  /deep/ .w-e-text-container {
    height: 400px !important;
    z-index: 10 !important;
  }
}
</style>