---
title: Docker 基本使用
createTime: 2024/06/30 08:22:01
permalink: /article/basic-use-of-docker/
excerpt: 写在前面Docker 命令非常多，这里简单介绍 CentOS 下 Docker 的安装方式以及 Docker 的基本命令。安装运行以下命令，下载 docker-ce 的 yum 源。sudo wget -O /etc/yum.repos.d/docker-ce.repo https://mir...
outline: [2, 6]
tags:
  - Docker
---
## 写在前面
Docker 命令非常多，这里简单介绍 CentOS 下 Docker 的安装方式以及 Docker 的基本命令。

## 安装
运行以下命令，下载 docker-ce 的 yum 源。

```shell
sudo wget -O /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

运行以下命令，安装 Docker。

```shell
sudo yum -y install docker-ce
```

安装完成。

```shell
[root@ifback /]# docker -v
Docker version 26.1.3, build b72abbb
```

## 基本使用
Docker 的使用，可以用自带的 help 命令查看，有详细的说明。

> 更详细的操作命令，请参见[Docker官网](https://docs.docker.com/get-started/overview/?spm=5176.ecscore_server.help.7.74b74df5LvSKwk)。
>

### 管理Docker守护进程
```plain
sudo systemctl start docker     #运行Docker守护进程
sudo systemctl stop docker      #停止Docker守护进程
sudo systemctl restart docker   #重启Docker守护进程
sudo systemctl enable docker    #设置Docker开机自启动
sudo systemctl status docker    #查看Docker的运行状态
```

### 操作容器
操作容器的命令列表如下：

```shell
[root@ifback ~]# docker container help

Usage:  docker container COMMAND

Manage containers

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  exec        Execute a command in a running container
  export      Export a container's filesystem as a tar archive
  inspect     Display detailed information on one or more containers
  kill        Kill one or more running containers
  logs        Fetch the logs of a container
  ls          List containers
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  prune       Remove all stopped containers
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  run         Create and run a new container from an image
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker container COMMAND --help' for more information on a command.
```

### 进入容器
使用如下命令可以进入容器内部。

```shell
docker exec -it <container_id_or_name> /bin/bash
```

### 退出容器
使用如下命令可以退出容器，回到宿主机。

```shell
exit
```

