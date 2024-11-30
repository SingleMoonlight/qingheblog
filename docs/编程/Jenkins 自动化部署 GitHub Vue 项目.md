---
title: Jenkins 自动化部署 GitHub Vue 项目
createTime: 2024/08/25 08:26:47
permalink: /article/jenkins-automates-the-deployment-of-github-vue-projects/
excerpt: 个人站点使用本地化开发，本地打包后手动上传到服务器，这个流程说麻烦也麻烦，说简单也简单。如果每次一个小的改动都需要这么走一遍，也挺不爽的。借助 CI/CD 工具，自动化地完成上述步骤，连更新都会变得更有动力呢，哈哈哈。下面实现的 CI/CD 流程如下：1、本地开发，push 到 Github ...
outline: [2, 6]
tags:
  - Jenkins
  - GitHub
---
## 写在前面
个人站点使用本地化开发，本地打包后手动上传到服务器，这个流程说麻烦也麻烦，说简单也简单。如果每次一个小的改动都需要这么走一遍，也挺不爽的。借助 CI/CD 工具，自动化地完成上述步骤，连更新都会变得更有动力呢，哈哈哈。

下面实现的 CI/CD 流程如下：

1、本地开发，push 到 Github 仓库后

2、触发 Github 的钩子函数，通知 Jenkins，进行重新构建

3、Jenkins 构建完成后，将前端打包出来的 dist 目录，发送到部署的服务器上的 Nginx 容器挂载的部署目录下

4、完成部署，进行访问

## 插件安装
> docker 部署 Jenkins 可以见：[https://blog.ifback.com/article/docker-deploy-jenkins/](https://blog.ifback.com/article/docker-deploy-jenkins/)
>

在插件市场选择必须的插件进行安装，如果按照上述文章进行配置 Jenkins，这里应该只差下面几个插件。

### NodeJS
NodeJS 是 vue 项目的打包构建必备环境，不必多说。

![](../.vuepress/public/images/1725081781705-d78e60cd-6754-4c2d-9c03-3fad4f12a6f1.png)

### Publish Over SSH
配置 Jenkins 与服务器之间的 SSH，用于将 Jenkins 容器中的文件上传至宿主机。

![](../.vuepress/public/images/1725109460579-3482f8fc-8d0f-462e-8bd1-c8b149f43e9c.png)

## GitHub 配置
首先要有一个 vue 项目仓库，这里以本人项目为例。

### GitHub 配置 WebHook
在项目 Setting 下选择 WebHook，点击点击 WebHook。

![](../.vuepress/public/images/1725082523420-cea32358-4150-4971-adf3-5085ba22b4fe.png)

输入 WebHook 的基本配置：

Payload URL 为`Jenkins URL/github-webhook/`，即自己搭建的 Jenkins 服务器地址。

何时触发 WebHook，这里选择的`Just the push event`表示当有 push 时，请求上述 WebHook 地址。

![](../.vuepress/public/images/1725082746184-a9360b59-b3b0-4eae-8a9b-7b1d65af2814.png)

### GitHub 配置 Access Token
Jenkins 访问 GitHub 需要通过令牌进行鉴权，因此需要添加 Assess Token。

在开发者设置中，选择个人令牌生成。

![](../.vuepress/public/images/1725096727180-a460e145-4980-4065-9490-b6c32273c50b.png)

输入名字，便于区分。

![](../.vuepress/public/images/1725087358610-5aa5b93b-dce1-4d00-98ef-77a647dec105.png)

勾选 repo 和 repo_hook。

![](../.vuepress/public/images/1725087369763-b1c0d80f-f237-4cd2-82a9-24de87696af8.png)

![](../.vuepress/public/images/1725087379486-b46030f9-21c6-437c-9a14-519880350c6f.png)

最后点击生成即可，注意需要将 token 即时保存下来，因为它只会显示一次。

## 全局凭据配置
Jenkins 提供了集中管理凭据的地方，即全局凭据配置，可以理解为密码箱，在这里可以配置所需的凭据。

![](../.vuepress/public/images/1725085672442-95d97612-8d44-4191-8eaa-da6dc6d8466c.png)

### GitHub 账号凭据
![](../.vuepress/public/images/1725085780653-45733ba2-1e65-4e21-8ab2-528934cc1207.png)

### GitHub 令牌凭据
这里要选择 Secret text，密钥就是 Assess Token。

![](../.vuepress/public/images/1725087971097-2336d15b-6274-4aaa-ae9a-7f7bee6eb9cb.png)

配置完成效果如下：

![](../.vuepress/public/images/1725088398181-052540a3-9fc7-4d15-90e8-8843f9a5606e.png)

## Jenkins 插件配置
### 配置 NodeJS
在系统管理>全局工具配置里新增 NodeJS，新增安装里这里选择了镜像网站，实测使用官网下载会失败。

![](../.vuepress/public/images/1725097434278-b3231285-893b-4795-b166-deb51fabe16c.png)

设置别名、版本等信息后，点击保存。

![](../.vuepress/public/images/1725097397370-7257a237-a17b-412e-9b1f-8c29c50f32ea.png)

### 配置 Publish Over SSH
这里也简单记录下 SSH 配置过程：

1、首先在 Jenkins 容器里执行如下命令：

```shell
ssh-keygen -t rsa -f /var/jenkins_home/.ssh/id_rsa -N jenkins -C jenkins
```

-t，表示生成算法；

-f，表示生成文件路径以及文件名称，这里的路径是容器里的路径；

-N，表示生成是添加密码，也可以不加，不过生产过程需要手动确认；

-C，表示对生成的 SSH 密钥添加注释。

2、然后在宿主机，将生成的 SSH 公钥，即 id_rsa.pub 配置到宿主机，这里的路径是宿主机的路径。

```shell
cat jenkins_home/.ssh/id_rsa.pub > /root/.ssh/authorized_keys
```

配置完成后，在系统管理下面，找到 Publish Over SSH，输入密码、密钥路径。

![](../.vuepress/public/images/1725109581297-4ac25084-0d6c-4e96-8264-9f7f45594439.png)

Disable exec 视情况，可以勾选也可以不勾选，勾选后就不能通过 SSH 执行宿主机命令。

然后在 SSH Server 里添加宿主机的基本信息，Name 可以自己取，Hostname 就是宿主机 IP，Username 就是宿主机用户，Remote Directory 是宿主机的目录，可以自定义，这里就定义为根目录。

![](../.vuepress/public/images/1725109745565-970b3873-e926-4fbf-9962-c94ba1c1d8f7.png)

配置完成，点击测试，显示 Success 证明配置成功。

### 配置 GitHub 服务器
在系统管理里，找到添加 GitHub 服务器，然后输入服务器名称和 URL，默认已经输入好了。

凭据选择上面新增的个人令牌凭据，输入完成可以点击测试，出现下图所示 log 即为成功。

![](../.vuepress/public/images/1725088014615-87bb8aae-4e87-48f8-adb4-2e06066c9592.png)

## 创建任务
完成上述配置后，就可以开始创建任务了。

输入任务命令，选择任务类型，这里选择的是自由风格软件项目，自由风格可供配置的自由度非常高，然后点击创建。

![](../.vuepress/public/images/1725083934799-e071a210-58a5-4571-b9c5-dd3576249729.png)

进入项目配置界面后，可以看到有六个配置项，可以根据实际情况进行配置。

![](../.vuepress/public/images/1725084084374-4766d795-225e-4e0b-98ca-b81c618cb23a.png)

下面就 GitHub vue 项目进行配置介绍。

### General
输入项目描述等，途中 GitHub 项目输入实际项目地址。

![](../.vuepress/public/images/1725085942502-06386b18-b49c-4808-8a83-364de2c69b2e.png)

### 源码管理
源码仓库地址输入实际项目地址，凭据选择 GitHub 账号凭据，构建将通过该地址和凭据拉取代码。

![](../.vuepress/public/images/1725097690413-a9f59ab2-ad57-4044-af24-5d54a12c8aa7.png)

如果遇到了无权限访问 The TLS connection was non-properly terminated 的情况，可以执行如下命令。

```shell
git config --global  --unset https.https://github.com.proxy
git config --global  --unset http.https://github.com.proxy
git config --global --unset http.proxy
git config --global --unset https.proxy
```

参考：[https://zhuanlan.zhihu.com/p/436645167](https://zhuanlan.zhihu.com/p/436645167)

### 构建触发器
构建触发器选择 GitHub hook，因为前面配置了 GitHub WebHook，当我们 push 代码时，Jenkins 就会自动开始构建。

![](../.vuepress/public/images/1725086054082-2659bbc6-c257-44b1-a35d-d46826c87087.png)

### 构建环境
构建环境需要选择 NodeJS ，这里选择前面配置的 NodeJS 20.11.0。

然后还选择了在构建日志中添加时间戳，如果有问题便于查看和分析。

![](../.vuepress/public/images/1725086249048-5c8dab22-c8ed-4ef1-aa6f-6a612f7ac238.png)

### 构建步骤
构建步骤选择添加执行 shell，内容就是构建 vue 项目的命令。

```shell
echo ">>>>>> Start build..."
npm config set registry https://registry.npmmirror.com
npm install
npm run build
echo ">>>>>> Build dist.tar.gz"
tar -czvf dist.tar.gz dist
```

当然如果有其他需求，也可以自行添加，想我这里添加了配置 npm 镜像和打包的命令。

![](../.vuepress/public/images/1725114707483-3b6a89ea-f3f0-4cc9-9620-73dcc43262bf.png)

### 构建后操作
构建后操作，即完成构建后执行的操作，这里就是将构建好的 dist 文件拷贝到 nginx 配置的目录下。

添加通过 SSH 发送构建产物的操作，SSH Server 选择上面配置的宿主机。

![](../.vuepress/public/images/1725112781389-769bf910-be48-409b-9677-f56533968c74.png)

在执行命令中，选择要执行的命令，注意这里执行是在宿主机执行。

![](../.vuepress/public/images/1725112832094-1bbc071e-b914-4bdd-894f-278b51d3d02e.png)

同时我这里还添加了一个归档成品的步骤，用于保存每次构建成功的 dist 压缩包。

![](../.vuepress/public/images/1725114729898-3ad91a6d-d367-4e24-a8ec-69842a9d0762.png)

## 手动构建
配置完任务后，可以点击手动构建，查看构建是否符合预期。

构建过程可以在控制台输出查看，如果遇到错误可以根据报错进行解决。

![](../.vuepress/public/images/1725114957641-1ec890ce-4163-4361-918f-c85a0bb21cb2.png)

## 自动构建
在本地代码仓库推送代码到远程仓库，即可触发自动构建。

![](../.vuepress/public/images/1725116305500-55e5034d-cdb9-4c30-98ce-40897e29e0b4.png)

如果构建发现时间与实际时间差了 8 个小时，可以在脚本命令行处粘贴并运行如下命令：

```shell
System.setProperty('org.apache.commons.jelly.tags.fmt.timeZone','Asia/Shanghai');
```

![](../.vuepress/public/images/1725117293323-113c7489-1a3f-41c8-b380-d3c6a998c938.png)

再次构建可以看到时间就正常了：

![](../.vuepress/public/images/1725117405931-84372f37-fc7e-4c34-865a-b2bc77a99fef.png)

