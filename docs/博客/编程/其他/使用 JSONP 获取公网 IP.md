---
title: 使用 JSONP 获取公网 IP
createTime: 2024/10/03 11:39:50
permalink: /article/get-public-ip-by-jsonp/
tags:
  - JSONP
---
在使用一些第三方 API 的时候，比如查询地理位置、查询天气等场景，需要获知客户端的公网 IP 地址。在没有后台的情况下，只能借助于第三方 API，请求第三方 API，然后返回给前端公网 IP。

今天摸索了好几个 API，综合体验下来，IPinfo 使用最为优雅便捷，无需登录或者配置密钥。很多机构，包括 npm 都在用，下面简单介绍一个怎么用。

> 官网：[https://ipinfo.io/](https://ipinfo.io/)
>

<!-- more -->

## 使用
### jsonp
jsonp 可以用现成的，或者自己封装一个，在前面的博文里，我已经写过一个接口，这里就接着用了：

```javascript
export function jsonpRequest(url, callbackName) {
    return new Promise((resolve, reject) => {
        // 检查 URL 是否已经包含 callback 参数
        let urlAlreadyHasCallback = /[?&]callback=/.test(url);
        let scriptSrc = url;
        let actualCallbackName = callbackName;

        if (!urlAlreadyHasCallback) {            
            // 使用用户指定的 callbackName 或生成一个唯一的回调函数名
            actualCallbackName = `${callbackName}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
        }

        // 定义全局的回调函数
        window[actualCallbackName] = function (data) {
            // 调用对应的 resolve 函数
            resolve(data);
            // 移除回调函数
            delete window[actualCallbackName];
            // 移除 script 标签
            let script = document.querySelector(`script[src*="${actualCallbackName}"]`);
            if (script) {
                document.body.removeChild(script);
            }
        };

        if (!urlAlreadyHasCallback) {
            scriptSrc = url + (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + actualCallbackName;
        }

        // 创建一个 script 标签
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        script.onerror = function (error) {
            reject(error);
            // 移除回调函数
            delete window[actualCallbackName];
            document.body.removeChild(script);
        };

        // 添加 script 标签到文档中
        document.body.appendChild(script);
    });
}
```

### API
callback 回调的名字可以自行设计，可以在浏览器输入如下地址，先进行测试。

```javascript
https://ipinfo.io/json?callback=gotPublicIP
```

### 请求
```javascript
export async function getIP() {
    let getIPUrl = 'https://ipinfo.io/json';
    let callbackName = 'jsonpCallback_getIP';
    let ipRes = '';

    ipRes = await jsonpRequest(getIPUrl, callbackName);  
    
    return ipRes.ip;
}
```

### 返回结果
返回信息还是比较多的，包括 IP、城市、国家、坐标、时区，看实际情况进行使用即可。

```javascript
/**/ console &&console.log &&console.log({"ip":"xxx.xxx.xxx.xxx","city":"Shanghai","region":"Shanghai","country":"CN","loc":"xx.xxxx, yy.yyyy","org":"AS56041 China Mobile communications corporation","postal":"200000","timezone":"Asia/Shanghai","readme":"https://ipinfo.io/missingauth"}); typeof gotPublicIP === 'function' && gotPublicIP({
  "ip": "xxx.xxx.xxx.xxx",
  "city": "Shanghai",
  "region": "Shanghai",
  "country": "CN",
  "loc": "xx.xxxx, yy.yyyy",
  "org": "AS56041 China Mobile communications corporation",
  "postal": "200000",
  "timezone": "Asia/Shanghai",
  "readme": "https://ipinfo.io/missingauth"
});
```



