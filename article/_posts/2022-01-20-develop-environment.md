---
layout: layout_article
title: 自己的开发环境配置整理
tags: 其他
---

有时电脑重装系统，开发环境重新配置总要搞半天，在网上反复查询，于是整理一下自己的开发环境配置流程，便于使用。

<!-- more -->

# Java

下载地址：

- Oracle JDK：[Java Downloads &#124; Oracle](https://www.oracle.com/java/technologies/downloads/)
- Microsoft Build of OpenJDK：[下载 OpenJDK 的 Microsoft 内部版本 &#124; Microsoft Docs](https://docs.microsoft.com/zh-cn/java/openjdk/download)

环境变量：

- JAVA_HOME: JDK安装目录

- Path: %JAVA_HOME%\bin

# Git

下载地址：

- [Git - Downloading Package (git-scm.com)](https://git-scm.com/download/win)

Git-LFS插件：

- [Git Large File Storage &#124; Git Large File Storage (LFS) replaces large files such as audio samples, videos, datasets, and graphics with text pointers inside Git, while storing the file contents on a remote server like GitHub.com or GitHub Enterprise.](https://git-lfs.github.com/)

# Python

最新版下载地址：

- [Python Releases for Windows &#124; Python.org](https://www.python.org/downloads/windows/)

3.7.9版下载地址

- [Python Release Python 3.7.9 &#124; Python.org](https://www.python.org/downloads/release/python-379/)

> 一些机器学习库使用3.7版本兼容性较好。3.7.9是3.7最后一个提供安装包的版本。

# Node.js

下载地址：

- [下载 &#124; Node.js 中文网 (nodejs.cn)](http://nodejs.cn/download/)

NPM镜像：

```
npm config set registry https://registry.npmmirror.com
```



# Maven

下载地址：

- [Maven – Download Apache Maven](https://maven.apache.org/download.cgi)

环境变量：

- M2_HOME: Maven安装目录
- Path: %M2_HOME%\bin

> 虽然Maven官网的配置方案没有使用M2_HOME这一变量，但为了便于Intellij IDEA识别Maven的路径还是保留了M2_HOME。

镜像配置：

%M2_HOME%\conf\settings.xml `<mirrors>`中添加如下：

```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

# MySQL

下载地址：

- [MySQL :: Download MySQL Installer](https://dev.mysql.com/downloads/installer/)

# MongoDB

下载地址：

- [MongoDB Community Download &#124; MongoDB](https://www.mongodb.com/try/download/community)

# Windows Subsystem for Linux

一般使用Debian即可。

国内镜像：

- [debian &#124; 镜像站使用帮助 &#124; 清华大学开源软件镜像站 &#124; Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)
- [Help (nju.edu.cn)](http://mirrors.nju.edu.cn/help/debian)

开发工具包：

```bash
sudo apt install build-essential
sudo apt install git
sudo apt install ruby-full
sudo apt install zsh
sudo apt install curl
sudo apt install wget
```

临时代理：

```bash
export http_proxy=192.168.1.100:7890
export https_proxy=192.168.1.100:7890
```

Oh My Zsh配置：

- 安装

  ```bash
  sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```

- zsh-autosuggestions

  ```bash
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
  ```

- zsh-syntax-highlighting

  ```bash
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
  ```

- .zshrc配置

  ```
  plugins=( [plugins...] zsh-autosuggestions zsh-syntax-highlighting)
  ```

# Docker

下载地址：

[Get Started with Docker &#124; Docker](https://www.docker.com/get-started)

# 常用开发工具

## Visual Studio Code

下载地址：

- [Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/#alt-downloads)

国内加速：

将下载链接域名替换为国内CDN地址`vscode.cdn.azure.cn`

## Intellij IDEA

下载地址：

- [下载 IntelliJ IDEA：JetBrains 功能强大、符合人体工程学的 Java IDE](https://www.jetbrains.com.cn/idea/download/#section=windows)

## Postman

下载地址：

- [Download Postman &#124; Get Started for Free](https://www.postman.com/downloads/?utm_source=postman-home)

## VirtualBox

下载地址：

- [Downloads – Oracle VM VirtualBox](https://www.virtualbox.org/wiki/Downloads)

## Typora

下载地址：

- [Typora — macOS release channel](https://typora.io/releases/all)

破解方式：

下载解包工具[Mas0nShi/typoraCracker: A extract & decryption and pack & encryption tools for typora. (github.com)](https://github.com/Mas0nShi/typoraCracker)，解包方式见README。解包后需要替换文件，参考[[resolved\] Windows版无法激活 · Issue #9 · Mas0nShi/typoraCracker (github.com)](https://github.com/Mas0nShi/typoraCracker/issues/9)

