---
title: GitHub Pages 绑定自定义域名 + 开启 HTTPS
createTime: 2024/09/21 17:19:34
permalink: /article/github-pages-bind-custom-domain-and-enable-https/
tags:
  - GitHub
  - SSL
---
使用 GitHub Pagas 部署网站后，大家可能有绑定自定义域名的需求，操作很简单。另外，GitHub Pages 还免费提供了 HTTPS，开启更简单。

<!-- more -->

## DNS 配置
### 顶级域名
在云服务厂商的 DNS 配置下，分别创建 IPV4 和 IPV6 的解析记录，指向 GitHub Pages 的 IP 地址，这个地址是不会变化的。

#### IPV4
`A`记录，将域名解析指向 GitHub Pages 的 IP 地址。

```shell
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### IPV6
`AAAA`记录，请将顶点域指向 GitHub Pages 的 IP 地址。

```shell
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

这里以阿里云为例：![](../../../.vuepress/public/images/1726916924438-47587b3a-ba17-4b44-b0f6-d9d4fd1ae24c.png)

全部创建完成后结果如下：

![](../../../.vuepress/public/images/1726916896002-25b81a4a-95e4-451c-ac2f-0d3991afa141.png)

### 子域名
如果有多个网站，希望给子域名，如`www.example.com`、`blog.example.com`，需要创建将子域名指向`<user>.github.io`的`CNAME`记录。

![](../../../.vuepress/public/images/1726917247088-01c28054-7d04-4f25-a9c2-1308e3db574c.png)

如：

![](../../../.vuepress/public/images/1726917146885-29e1f3d9-83a4-4da3-832c-198b39e18d12.png)



## GitHub Pages 配置
在仓库的`Setting`->`Pages`里，在自定义域名里输入 DNS 配置好的域名，点击保存，GitHub 会自动进行 DNS 校验，这个过程需要一点时间。

![](../../../.vuepress/public/images/1726917349258-5a17f6d5-d799-4a85-abdc-e4028c62d428.png)

当校验通过以后，就可以勾选下面的强制开启 HTTPS ，没错，是不需要申请 SSL 证书的，GitHub 会自动帮申请（虽然是免费的 Let's Encrtpy ）。

再过一会儿，刷新一下，就可以看到个人站点部署完成了，可以进行访问。

## CNAME 配置
配置完后，未来肯定会有更新代码，推送提交到 GitHub 的情况，这时候会发现 GitHub Pages 绑定的域名失效了。

这是因为页面配置自定义域名本质上是在部署目录下创建了一个名为`CNAME`的文件，里面存着自定义域名，每次 push 重新构建后会被覆盖，然后丢失。

因此需要保证在打包的输出目录，能够有 CNAME 文件，这样就不用每次打包都再指定一遍。

对于 vue  项目来说，只需要将 CNAME 文件放在 public 文件夹下即可，这样构建后 CNAME 文件会保留在产物的根目录下。

![](../../../.vuepress/public/images/1726917946991-6d7ed738-f969-4b84-ab61-99a1e878ab5b.png)

