---
title: Docker 部署 Certbot 自动获取 SSL 证书
createTime: 2024/08/27 22:31:05
permalink: /article/docker-deploys-cerbot-to-automatically-obtain-ssl-certificates/
outline: [2, 6]
---
现在云平台的官方免费 SSL 证书已经没有一年的了，有效期只有三个月，每次都需要手动申请和更新，挺麻烦的，好在现在有非常方便的自动化工具和平台，可以无限免费申请证书，最重要的还可以自动化续约，一次部署，就再也不用管了，非常方便。

这里所介绍的方式就是通过容器化方式部署 certbot 工具，自动申请来自 let's encrypt 平台的免费 SSL 证书。

## 拉取镜像
```shell
docker pull certbot/certbot
```

目前 docker 被墙，使用 docker pull 拉取 certbot 镜像会失败，可以使用自行查找第三方镜像仓库。

我这里使用的是阿里云的镜像加速服务：

> 当前仅支持阿里云用户使用具备公网访问能力的阿里云产品进行镜像加速，且仅限于特定范围内的容器镜像。详情请见[公告](https://help.aliyun.com/zh/acr/product-overview/product-change-acr-mirror-accelerator-function-adjustment-announcement)。
>

## 运行 certbot 容器
```shell
docker run -it --rm \
-v your_web_root_path:/etc/letsencrypt/webroot \
-v your_letsencrypt_path:/etc/letsencrypt \
-v your_letsencrypt_path/log:/var/log/letsencrypt \
certbot/certbot certonly --webroot \
--webroot-path=/etc/letsencrypt/webroot \
--email your_email \
--agree-tos \
--no-eff-email \
-d your_domain
```

`your_web_root_path`：网站的根目录，即 index.html 目录，如果是 Jenkins，则在 jenkins_home/war/ 下。

`your_letsencrypt_path`：在宿主机挂载的保存证书文件目录，申请下来的证书会在这个目录下，定时任务等文件也在这个文件夹下。

certbot 运行的 log 会保存在容器的 /var/log/letsencrypt 目录下，如果要查看问题，最好也挂载在宿主机中，这里就挂在了 your_letsencrypt_path/log 下。

`certonly` 表示只申请证书，不需要 certbot 帮忙部署。

`--webroot` 表示采用访问的方式进行域名所有权认证，也可以选择 dns 验证，这里选择 webroot 是因为可以进行自动化，可以自动续约，不需要手动去云服务器控制台手动添加 dns 解析条目。如果要申请通配符域名，则必须采用 dns 认证的方式。

`your_domain`：需要申请证书的域名。

## 获取证书
如上所述，运行容器后，就会在宿主机挂载目录获取到证书。

运行完成后，容器会自动停止并删除。

等快到期后，cerbot 会自动续约。

