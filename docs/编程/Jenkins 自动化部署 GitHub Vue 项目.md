---
title: Jenkins 自动化部署 GitHub Vue 项目
createTime: 2024/08/25 16:26:47
permalink: /article/jenkins-automates-the-deployment-of-github-vue-projects/
outline: [2, 6]
---
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

![](../.vuepress/public/images/078ea2a8dc4089f887f24d7a19eb93ba.png)

### Publish Over SSH
配置 Jenkins 与服务器之间的 SSH，用于将 Jenkins 容器中的文件上传至宿主机。

![](../.vuepress/public/images/4a54bec2a6b79acac53213e5bcb2e2a7.png)

## GitHub 配置
首先要有一个 vue 项目仓库，这里以本人项目为例。

### GitHub 配置 WebHook
在项目 Setting 下选择 WebHook，点击点击 WebHook。

![](../.vuepress/public/images/afe0ff97f53f0e0f6af5931fe4d09927.png)

输入 WebHook 的基本配置：

Payload URL 为`Jenkins URL/github-webhook/`，即自己搭建的 Jenkins 服务器地址。

何时触发 WebHook，这里选择的`Just the push event`表示当有 push 时，请求上述 WebHook 地址。

![](../.vuepress/public/images/7ade7434077d7fc505ad48bae7b44d42.png)

### GitHub 配置 Access Token
Jenkins 访问 GitHub 需要通过令牌进行鉴权，因此需要添加 Assess Token。

在开发者设置中，选择个人令牌生成。

![](../.vuepress/public/images/461e3011ff20d60d41b585851a170968.png)

输入名字，便于区分。

![](../.vuepress/public/images/32f65b8a63b7ba60a288b1846fbd9d20.png)

勾选 repo 和 repo_hook。

![](../.vuepress/public/images/5024db035f1790d379b543b27cdf4bf3.png)

![](../.vuepress/public/images/0d436b092c3c5e318af190d17681bd2c.png)

最后点击生成即可，注意需要将 token 即时保存下来，因为它只会显示一次。

## 全局凭据配置
Jenkins 提供了集中管理凭据的地方，即全局凭据配置，可以理解为密码箱，在这里可以配置所需的凭据。

![](../.vuepress/public/images/c384da6efb21450af3867dc818e16862.png)

### GitHub 账号凭据
![](../.vuepress/public/images/76684956427c4cb63596e46c9275e87a.png)

### GitHub 令牌凭据
这里要选择 Secret text，密钥就是 Assess Token。

![](../.vuepress/public/images/4f8d122f8f081a0e957be5989261d9dc.png)

配置完成效果如下：

![](../.vuepress/public/images/62dd0de8b7f074e4cdf63759c5078439.png)

## Jenkins 插件配置
### 配置 NodeJS
在系统管理>全局工具配置里新增 NodeJS，新增安装里这里选择了镜像网站，实测使用官网下载会失败。

![](../.vuepress/public/images/e3176b4eda4a5218eda8c081eee1fb9a.png)

设置别名、版本等信息后，点击保存。

![](../.vuepress/public/images/9d76c4e9712a51b6196ae9fd2b665dd7.png)

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

![](../.vuepress/public/images/a1b89bf4d2bdc1729734184cfa36380e.png)

Disable exec 视情况，可以勾选也可以不勾选，勾选后就不能通过 SSH 执行宿主机命令。

然后在 SSH Server 里添加宿主机的基本信息，Name 可以自己取，Hostname 就是宿主机 IP，Username 就是宿主机用户，Remote Directory 是宿主机的目录，可以自定义，这里就定义为根目录。

![](../.vuepress/public/images/8ca6a021bbe43554ca0a725642762881.png)

配置完成，点击测试，显示 Success 证明配置成功。

### 配置 GitHub 服务器
在系统管理里，找到添加 GitHub 服务器，然后输入服务器名称和 URL，默认已经输入好了。

凭据选择上面新增的个人令牌凭据，输入完成可以点击测试，出现下图所示 log 即为成功。

![](../.vuepress/public/images/2bf87653062cb3bdd4c7ccc01ba70bb8.png)

## 创建任务
完成上述配置后，就可以开始创建任务了。

输入任务命令，选择任务类型，这里选择的是自由风格软件项目，自由风格可供配置的自由度非常高，然后点击创建。

![](../.vuepress/public/images/34ce56c47bf7842e21a051e94917c2a3.png)

进入项目配置界面后，可以看到有六个配置项，可以根据实际情况进行配置。

![](../.vuepress/public/images/a2216f0eb05f6fc336437bd68a16030e.png)

下面就 GitHub vue 项目进行配置介绍。

### General
输入项目描述等，途中 GitHub 项目输入实际项目地址。

![](../.vuepress/public/images/175f437026888bba818a0d179cc00b07.png)

### 源码管理
源码仓库地址输入实际项目地址，凭据选择 GitHub 账号凭据，构建将通过该地址和凭据拉取代码。

![](../.vuepress/public/images/6d49ba3c606ba7e5aabcdff4a2d5f27a.png)

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

![](../.vuepress/public/images/ef984bb0633cbd2ac13d624d53cfa749.png)

### 构建环境
构建环境需要选择 NodeJS ，这里选择前面配置的 NodeJS 20.11.0。

然后还选择了在构建日志中添加时间戳，如果有问题便于查看和分析。

![](../.vuepress/public/images/47e9bb6c6b37ee2f5833d36003e39fab.png)

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

![](../.vuepress/public/images/4066941324a08dca7220ed06a92b96ef.png)

### 构建后操作
构建后操作，即完成构建后执行的操作，这里就是将构建好的 dist 文件拷贝到 nginx 配置的目录下。

添加通过 SSH 发送构建产物的操作，SSH Server 选择上面配置的宿主机。

![](../.vuepress/public/images/3fe3dbbe2f104e86ead86baa1c2ee7b5.png)

在执行命令中，选择要执行的命令，注意这里执行是在宿主机执行。

![](../.vuepress/public/images/da21030e414d1cf79ce45f8af3e1d5ac.png)

同时我这里还添加了一个归档成品的步骤，用于保存每次构建成功的 dist 压缩包。

![](../.vuepress/public/images/fab1f4f879b11476e32cff3fe2e053b7.png)

## 手动构建
配置完任务后，可以点击手动构建，查看构建是否符合预期。

构建过程可以在控制台输出查看，如果遇到错误可以根据报错进行解决。

![](../.vuepress/public/images/9116cf06c273b0a5d53d1583619a0758.png)

## 自动构建
在本地代码仓库推送代码到远程仓库，即可触发自动构建。

![](../.vuepress/public/images/4f88a81cd0d1565e1bf12f9415b68efe.png)

如果构建发现时间与实际时间差了 8 个小时，可以在脚本命令行处粘贴并运行如下命令：

```shell
System.setProperty('org.apache.commons.jelly.tags.fmt.timeZone','Asia/Shanghai');
```

![](../.vuepress/public/images/9aae16da93ec9f2d173774089533a72c.png)

再次构建可以看到时间就正常了：

![](../.vuepress/public/images/ea78b7c6641677fa64ed2e945a64564c.png)

