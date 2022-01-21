---
layout: layout_article
title: Flex布局下Flex Item内容超出外层容器的原因和解决方案
tags: CSS
excerpt: 编写博客内容时，偶然发现一个布局问题：我使用flex布局，左侧内容部分使用弹性宽度，右侧目录栏固定宽度。当左侧内容（代码块）过宽的时候，内容超出了容器给的大小，右侧目录栏则被挤跑。了解了flex item的一些标准便能解决此问题。
---

# 问题复现

编写博客内容时，偶然发现一个布局问题：我使用flex布局，左侧内容部分使用弹性宽度，右侧目录栏固定宽度。当左侧内容（代码块）过宽的时候，内容超出了容器给的大小，右侧目录栏则被挤跑。

![image-20220121174444880](/assets/img/2022-01-21-flex-and-min-width-1.png)

图中也可见，右侧的目录栏已经超过了容器的范围。

# 原因分析

在flexbox的子元素中：

- 如果是非滚动容器，主轴方向上的最小尺寸是基于内容的最新尺寸，`min-width`的值是`auto`。
- 如果是滚动容器，`min-width`的值是`0`。

> W3C原文
>
> To provide a more reasonable default minimum size for flex items, the used value of a main axis automatic minimum size on a flex item that is not a scroll container is a content-based minimum size; for scroll containers the automatic minimum size is zero, as usual.

`min-width`的值为`auto`意味着，一旦元素宽度缩小到其隐式自动宽度以下，那么`min-width: auto`将启动并防止元素缩小。

# 解决方案

方案一：`min-width`的值设置为`0`。

方案二：设置`overflow: hidden`或`overflow:auto`，也就是设置为滚动容器。

# 参考资料

[CSS Flexible Box Layout Module Level 1 (w3.org)](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)

[浅析flex布局被子元素内容撑破的问题 - Flex布局中一个不为人知的特性（flex-item项目的最小尺寸问题） - 古兰精 - 博客园 (cnblogs.com)](https://www.cnblogs.com/goloving/p/15201080.html)

[flex布局与min-width &#124; TonyStudio (tcs-y.com)](https://blog.tcs-y.com/2021/09/23/flex-content-min-width/)