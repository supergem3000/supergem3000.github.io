---
layout: layout_article
title: Vue实践——深度作用选择器
tags: Vue
---
<!-- more -->
# 问题复现

```vue
<template>
  <article class="article-content" v-html="innerHTML"></article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const ArticleDisplay = defineComponent({
  props: {
    innerHTML: { type: String, required: true },
  },
});
export default ArticleDisplay;
</script>

<style scoped>
h1::before {
  content: "#";
  font-size: 1em;
}
</style>
```

`innerHTML`为

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
```

期望一级标题中会被添加伪元素`::before`，但是没有成功。

# 原因分析

Vue组件编译后，template中的每个元素会加入`data-v-xxx`属性，如

```html
<div class="article-container" data-v-82768ea8>
```

来确保`<style scope>`只影响本组件内的元素而不污染全局。

但是`v-html`渲染出的元素不会被加入此属性，因此CSS不会对其生效。

# 解决方案

## 方案一

将`scoped`移除，或者新建一个没有scoped的style（一个.vue文件允许多个style）。

## 方案二

使用深度作用选择器`>>>`

```css
.article-content >>> h1::before {
  content: "#";
  font-size: 1em;
}
```

# 官方文档

[Scoped CSS \| Vue Loader (vuejs.org)](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#深度作用选择器)
