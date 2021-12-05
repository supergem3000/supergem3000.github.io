---
layout: layout_article
title: Linux系统目录结构
tags: Linux
excerpt: Linux系统常见目录结构职责分析
---

# 目录结构

- /bin 系统必须的二进制文件，一般用户也可以使用，如ls
- /sbin 只能由root用户运行的系统二进制文件，如mount
- /lib 二进制文件公用的公共库
- /usr Unix System Resources，这里的二进制文件是非必需的
  - /usr/bin 后期安装的一些软件，如gcc
  - /usr/sbin 用户安装的系统管理程序，如usermod
  - /usr/local 手动编译的二进制文件。是一个安全区，防止它们与包管理器安装的软件发生冲突。/usr/local/bin /usr/local/sbin职责同上
- /etc Editable Text Config，文本形式的配置文件
- /home 不同用户的文件夹，包含用户的文件
- /boot 系统启动所需的文件，如Linux内核
- /dev 设备文件，以文件的形式管理硬件或驱动程序
- /opt 可选软件和软件包
- /var 操作系统使用过程中会发生变化的文件，如系统日志和缓存
- /tmp 临时文件，系统重启时不被保留
- /proc 不存储在磁盘中，而是由Linux内核运行时在内存中创建的，用来监控运行中的进程

# 参考资料

[100秒解释Linux系统目录结构](https://www.bilibili.com/video/BV1y3411t7Tz)