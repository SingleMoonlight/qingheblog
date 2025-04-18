import{_ as i,c as a,a as n,o as e}from"./app-CvKX1Xds.js";const l={};function h(p,s){return e(),a("div",null,s[0]||(s[0]=[n(`<h2 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面"><span>写在前面</span></a></h2><p>Docker 部署 vue 项目和普通服务器部署 vue 项目实际上是一样的，不同之处仅在于部署目标不一样。一个是在Docker 容器中，一个是在宿主机中。因此在 Docker 中部署 vue 项目，本质上就是运行 Docker 容器中的 nginx。</p><blockquote><p>Docker 安装和基本使用请看<a href="https://blog.ifback.com/article/basic-use-of-docker/" target="_blank" rel="noopener noreferrer">这里</a>。</p></blockquote><h2 id="安装-nginx-镜像" tabindex="-1"><a class="header-anchor" href="#安装-nginx-镜像"><span>安装 nginx 镜像</span></a></h2><ol><li>运行以下命令，拉取官方的 nginx 镜像</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> pull</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>运行 Docker 镜像</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> run</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx-container</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -p</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 8080:80</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -d</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这条命令会创建一个名为 nginx-container 的容器，将宿主机的 8080 端口映射到容器的 80 端口，并在后台运行。</p><ol start="3"><li>访问容器内的 Nginx</li></ol><p>打开浏览器并输入 http://localhost:8080 ，应该能看到 Nginx 的欢迎页面。</p><h2 id="部署-vue-项目" tabindex="-1"><a class="header-anchor" href="#部署-vue-项目"><span>部署 vue 项目</span></a></h2><p>如果要部署 vue 项目，就只需要将 Docker 容器内默认的 nginx 替换为 vue 项目即可。也就是修改 Docker 容器内的 nginx 配置文件，并将 vue 打包文件放在容器里。</p><p>这一步有两种做法，一个是直接进入 Docker 容器，按照宿主机部署 nginx 的方式部署 vue 项目。另一种就是直接在宿主机进行操作，使用 Docker 提供的文件挂载命令，将宿主机内的文件挂载到 Docker 容器内，然后运行 Docker 容器即可。</p><p>命令如下：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> run</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -it</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -d</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">--name </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">container-name</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/usr/local/project/vue/dist:/usr/share/nginx/html</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/usr/local/project/vue/nginx:/etc/nginx/conf.d</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-p </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">12345:80</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>--name</code>表示容器名称，可以自行命名。</p><p><code>-v</code>表示将宿主机的文件挂载到 Docker 容器内，这里就将 vue 项目打包好的 dist 文件夹和 nginx 配置分别挂载到了 Docker 容器内 nginx 的 html 和 conf.d 文件夹下。</p><p><code>-p</code>表示端口映射，这里将宿主机的 12345 端口映射到容器内的 80 端口上。</p><p><code>nginx</code>表示运行的镜像，这里就是 nginx。</p><h2 id="nginx-配置文件" tabindex="-1"><a class="header-anchor" href="#nginx-配置文件"><span>nginx 配置文件</span></a></h2><p>Docker 部署 vue 项目，还有一个很重要的就是宿主机 nginx 和容器内 nginx 配置文件的编写，直接影响到了部署成功与否。</p><h3 id="宿主机" tabindex="-1"><a class="header-anchor" href="#宿主机"><span>宿主机</span></a></h3><p>在宿主机 nginx 文件中添加/修改如下 server：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">server</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    listen</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">   80</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    server_name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  domain-name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> or</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> IP</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> =</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_pass</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> http://localhost:12345</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ~</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> .</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">*</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_pass</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> http://localhost:12345</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_set_header</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Host</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $proxy_host</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_set_header</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> X-Real-IP</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $remote_addr</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_set_header</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> X-Forwarded-For</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $proxy_add_x_forwarded_for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>listen</code>即宿主机监听的端口，外部请求将转发至此。</p><p><code>server_name</code>即外部访问的服务名字，可以是域名或者 IP。</p><blockquote><p>如果想部署多个容器，可以选择监听不同的端口号，或者使用同一个端口号，但是用不同的域名。</p></blockquote><p><code>location</code>即将访问域名或 IP 加端口的所有请求转发到指定地方，这里就转发到了宿主机的 12345 端口，也就是容器的端口。</p><blockquote><p>需要注意，location ~ .* 必须添加，表示匹配所有请求，都转发到容器内，如果不加，就只有域名或 IP 加端口这一个 URL 被转发到容器内。</p></blockquote><p>如果还想要配置其他内容，只需要在宿主机 nginx 配置文件进行修改即可。</p><h4 id="https" tabindex="-1"><a class="header-anchor" href="#https"><span>https</span></a></h4><p>添加/修改如下 server：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">server</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    listen</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 443</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ssl</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    server_name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> domain-name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> or</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> IP</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    ssl_certificate</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> pem-file-path</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    ssl_certificate_key</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> key-file-path</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    ssl_session_timeout</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 5m</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    ssl_ciphers</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    ssl_protocols</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> TLSv1</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> TLSv1.1</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> TLSv1.2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    ssl_prefer_server_ciphers</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> on</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> =</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_pass</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> http://localhost:12345</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ~</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> .</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">*</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_pass</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> http://localhost:12345</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_set_header</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Host</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $proxy_host</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_set_header</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> X-Real-IP</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $remote_addr</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        proxy_set_header</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> X-Forwarded-For</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $proxy_add_x_forwarded_for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要指定 SSL 所需的 pem 和 key 文件。</p><h4 id="gzip" tabindex="-1"><a class="header-anchor" href="#gzip"><span>gzip</span></a></h4><p>在 http 下添加如下内容：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    gzip</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> on</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    gzip_vary</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> on</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    gzip_proxied</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> any</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    gzip_types</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> text/plain</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> text/css</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> application/json</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> application/javascript</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> application/x-javascript</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> text/xml</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> application/xml</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> application/xml+rss</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> text/javascript</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    gzip_comp_level</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 6</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    gzip_buffers</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 16</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 8k</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    gzip_min_length</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 256</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="容器" tabindex="-1"><a class="header-anchor" href="#容器"><span>容器</span></a></h3><p>容器内的 nginx 配置文件很简单，一般来说保持默认即可，无需修改：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">server</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    listen</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">       80</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    server_name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  localhost</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    #charset koi8-r;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    access_log</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  /var/log/nginx/host.access.log</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  main</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    error_log</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  /var/log/nginx/error.log</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  error</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        root</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">   /usr/share/nginx/html</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        index</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  index.html</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> index.htm</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    #error_page  404              /404.html;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    # redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    #</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    error_page</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">   500</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 502</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 503</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 504</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  /50x.html</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> =</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /50x.html</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        root</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">   /usr/share/nginx/html</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在运行 Docker 容器时，指定容器内部端口不是 80，按需修改接即可。</p><p>但如果容器内有访问外部请求的需求，即代理，在里面添加即可，举一个例子：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">server</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    listen</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">       80</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    server_name</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  localhost</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    #charset koi8-r;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    access_log</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  /var/log/nginx/host.access.log</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  main</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    error_log</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  /var/log/nginx/error.log</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  error</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        root</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">   /usr/share/nginx/html</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        index</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  index.html</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> index.htm</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    #访问百度建议</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /sug</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      	proxy_pass</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://www.baidu.com/sugrec</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    #error_page  404              /404.html;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    # redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    #</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    error_page</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">   500</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 502</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 503</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 504</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  /50x.html</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    location</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> =</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /50x.html</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        root</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">   /usr/share/nginx/html</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,44)]))}const t=i(l,[["render",h]]),r=JSON.parse('{"path":"/article/docker-deploy-vue-project/","title":"Docker 部署 Vue 项目","lang":"zh-CN","frontmatter":{"title":"Docker 部署 Vue 项目","createTime":"2024/05/18 06:58:03","permalink":"/article/docker-deploy-vue-project/","excerpt":"写在前面Docker 部署 vue 项目和普通服务器部署 vue 项目实际上是一样的，不同之处仅在于部署目标不一样。一个是在Docker 容器中，一个是在宿主机中。因此在 Docker 中部署 vue 项目，本质上就是运行 Docker 容器中的 nginx。Docker 安装和基本使用请看这...","outline":[2,6],"tags":["Docker","Vue"],"description":"写在前面 Docker 部署 vue 项目和普通服务器部署 vue 项目实际上是一样的，不同之处仅在于部署目标不一样。一个是在Docker 容器中，一个是在宿主机中。因此在 Docker 中部署 vue 项目，本质上就是运行 Docker 容器中的 nginx。 Docker 安装和基本使用请看这里。 安装 nginx 镜像 运行以下命令，拉取官方的 ...","head":[["meta",{"property":"og:url","content":"https://blog.ifback.com/article/docker-deploy-vue-project/"}],["meta",{"property":"og:site_name","content":"青何博客"}],["meta",{"property":"og:title","content":"Docker 部署 Vue 项目"}],["meta",{"property":"og:description","content":"写在前面 Docker 部署 vue 项目和普通服务器部署 vue 项目实际上是一样的，不同之处仅在于部署目标不一样。一个是在Docker 容器中，一个是在宿主机中。因此在 Docker 中部署 vue 项目，本质上就是运行 Docker 容器中的 nginx。 Docker 安装和基本使用请看这里。 安装 nginx 镜像 运行以下命令，拉取官方的 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-30T14:46:04.000Z"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"Vue"}],["meta",{"property":"article:modified_time","content":"2024-11-30T14:46:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker 部署 Vue 项目\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-30T14:46:04.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":4.05,"words":1215},"git":{"updatedTime":1732977964000,"contributors":[{"name":"SingleMoonlight","username":"SingleMoonlight","email":"winston.wyx@foxmail.com","commits":6,"avatar":"https://avatars.githubusercontent.com/SingleMoonlight?v=4","url":"https://github.com/SingleMoonlight"}]},"autoDesc":true,"filePathRelative":"编程/Docker 部署 Vue 项目.md","categoryList":[{"id":"41282b","sort":10007,"name":"编程"}]}');export{t as comp,r as data};
