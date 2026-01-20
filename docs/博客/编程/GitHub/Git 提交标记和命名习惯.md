---
title: Git 提交标记和命名习惯
createTime: 2025/04/07 22:52:40
permalink: /article/git-tags-and-naming-conventions/
tags:
  - Git
  - GitHub
---
在逛 GitHub 的时候，发现很多人的 GitHub 提交说明格式很统一，后面也无意间刷到了一些人汇总的 Git 标记和命名习惯，感觉挺有用，这里记录下来。当然每个公司内部应该会有自己形成的一套规则，在工作的时候还是要遵守公司内部的规范。

<!-- more -->

## 提交信息标记
在使用 Git 进行版本控制的时候，规范的提交信息有助于团队成员快速了解每次提交的主要内容，以下是一些常用的提交信息标记及其含义。

+ **feat**：新功能或者特性
    - 示例：`feat: 添加用户登录功能`
+ **fix**：修复一个 bug
    - 示例：`fix: 修复登录页面的崩溃问题`
+ **docs**：仅仅修改了文档，比如 README、注释等
    - 示例：`docs: 更新 README 文档`
+ **style**：代码格式的修改，不影响代码的逻辑，例如空格、格式化、缺少分号等
    - 示例：`style: 统一代码格式`
+ **refactor**：代码重构，既不是新增功能，也不是修复 bug
    - 示例：`refactor: 重构用户认证模块`
+ **perf**：提升性能的代码更改
    - 示例：`perf: 优化数据库查询性能`
+ **test**：添加或者修改测试代码
    - 示例：`test: 添加用户登录功能的单元测试`
+ **chore**：其他不修改 src 或者测试文件的杂物，例如构建过程或者辅助工具的变动
    - 示例：`chore: 更新构建工具版本`
+ **build**：影响构建系统或者外部依赖的更改，例如 gulp、npm、webpack
    - 示例：`build: 更新 webpack 配置`
+ **ci**：持续集成相关的更改，例如 Travis、Circle、Jenkins 配置文件
    - 示例：`ci: 配置 Travis CI`
+ **revert**：回滚某次提交
    - 示例：`revert: 回滚上一次提交`

## 分支命名
在协同开发中，合理的分支命名有助于提高代码管理的效率和可读性，以下是一些常见的分支命名规范。

### 主分支
+ `main`或者`master`，主分支，存放稳定的生产代码。
+ `develop`：开发分支，存放最新的开发代码。

### 功能分支
功能分支用于开发新的功能，通常从`develop`或者`main`分支创建，完成后合并回原分支。

命名格式：`feature/描述`

示例：

+  `feature/user-authentication`
+  `feature/payment-integration`

### 修复分支
修复分支用于修复代码中的 bug，通常从`develop`或`main`分支创建，完成后合并回原分支。

命名格式：`bugfix/描述`

示例：

+  `bugfix/fix-login-error`
+  `bugfix/correct-typo`

### 发布分支
发布分支用于准备发布版本，通常从`develop`或`main`分支创建，完成后合井回原分支。

命名格式：`release/版本号`

示例：

+  `release/ 1.0.0`
+  `release/2.1.0`

### 热修复分支
热修复分支用于紧急修复生产环境中的问题，通常从`develop`或`main`分支创建，完成后合井回原分支。

命名格式：`hotfix/描述`

示例：

+ `hotfix/critical-bug`

