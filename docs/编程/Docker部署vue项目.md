---
title: Docker部署vue项目
createTime: 2024/05/18 14:58:03
permalink: /article/docker-deploy-vue-project/
outline: [2, 6]
---
Docker 部署 vue 项目和普通服务器部署 vue 项目实际上是一样的，不同之处仅在于部署目标不一样。一个是在Docker 容器中，一个是在宿主机中。因此在 Docker 中部署 vue 项目，本质上就是运行 Docker 容器中的 nginx。

> Docker 安装和基本使用请看[这里](https://www.yuque.com/smilingly/note/zt9uggwgixe6nuv2)。
>

## 安装 nginx 镜像
1. 运行以下命令，拉取官方的 nginx 镜像

```shell
docker pull nginx
```

2. 运行 Docker 镜像

```shell
docker run --name nginx-container -p 8080:80 -d nginx
```

这条命令会创建一个名为 nginx-container 的容器，将宿主机的 8080 端口映射到容器的 80 端口，并在后台运行。

3. 访问容器内的 Nginx

打开浏览器并输入 http://localhost:8080 ，应该能看到 Nginx 的欢迎页面。

## 部署 vue 项目
如果要部署 vue 项目，就只需要将 Docker 容器内默认的 nginx 替换为 vue 项目即可。也就是修改 Docker 容器内的 nginx 配置文件，并将 vue 打包文件放在容器里。

这一步有两种做法，一个是直接进入 Docker 容器，按照宿主机部署 nginx 的方式部署 vue 项目。另一种就是直接在宿主机进行操作，使用 Docker 提供的文件挂载命令，将宿主机内的文件挂载到 Docker 容器内，然后运行 Docker 容器即可。

命令如下：

```shell
docker run -it -d \
--name container-name \
-v /usr/local/project/vue/dist:/usr/share/nginx/html \
-v /usr/local/project/vue/nginx:/etc/nginx/conf.d \
-p 12345:80 \
nginx
```

`--name`表示容器名称，可以自行命名。

`-v`表示将宿主机的文件挂载到 Docker 容器内，这里就将 vue 项目打包好的 dist 文件夹和 nginx 配置分别挂载到了 Docker 容器内 nginx 的 html 和 conf.d 文件夹下。

`-p`表示端口映射，这里将宿主机的 12345 端口映射到容器内的 80 端口上。

`nginx`表示运行的镜像，这里就是 nginx。

## nginx 配置文件
Docker 部署 vue 项目，还有一个很重要的就是宿主机 nginx 和容器内 nginx 配置文件的编写，直接影响到了部署成功与否。

### 宿主机
在宿主机 nginx 文件中添加/修改如下 server：

```shell
server {
    listen   80;
    server_name  domain-name or IP;
    location = / {
        proxy_pass http://localhost:12345;
    }
    location ~ .* {
        proxy_pass http://localhost:12345;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

`listen`即宿主机监听的端口，外部请求将转发至此。

`server_name`即外部访问的服务名字，可以是域名或者 IP。

> 如果想部署多个容器，可以选择监听不同的端口号，或者使用同一个端口号，但是用不同的域名。
>

`location`即将访问域名或 IP 加端口的所有请求转发到指定地方，这里就转发到了宿主机的 12345 端口，也就是容器的端口。

> 需要注意，location ~ .* 必须添加，表示匹配所有请求，都转发到容器内，如果不加，就只有域名或 IP 加端口这一个 URL 被转发到容器内。
>

如果还想要配置其他内容，只需要在宿主机 nginx 配置文件进行修改即可。

#### https
添加/修改如下 server：

```shell
server {
    listen 443 ssl;
    server_name domain-name or IP;

    ssl_certificate pem-file-path;
    ssl_certificate_key key-file-path;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location = / {
        proxy_pass http://localhost:12345;
    }
    location ~ .* {
        proxy_pass http://localhost:12345;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

需要指定 SSL 所需的 pem 和 key 文件。

#### gzip
在 http 下添加如下内容：

```shell
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_min_length 256;
```

### 容器
容器内的 nginx 配置文件很简单，一般来说保持默认即可，无需修改：

```shell
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

```

如果在运行 Docker 容器时，指定容器内部端口不是 80，按需修改接即可。

但如果容器内有访问外部请求的需求，即代理，在里面添加即可，举一个例子：

```shell
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #访问百度建议
    location /sug {
      	proxy_pass https://www.baidu.com/sugrec;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

```

