import{_ as i,c as s,a as t,o as a}from"./app-CvKX1Xds.js";const n={};function r(l,e){return a(),s("div",null,e[0]||(e[0]=[t(`<h2 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面"><span>写在前面</span></a></h2><p>现在云平台的官方免费 SSL 证书已经没有一年的了，有效期只有三个月，每次都需要手动申请和更新，挺麻烦的，好在现在有非常方便的自动化工具和平台，可以无限免费申请证书，最重要的还可以自动化续约，一次部署，就再也不用管了，非常方便。</p><p>这里所介绍的方式就是通过容器化方式部署 certbot 工具，自动申请来自 let&#39;s encrypt 平台的免费 SSL 证书。</p><h2 id="拉取镜像" tabindex="-1"><a class="header-anchor" href="#拉取镜像"><span>拉取镜像</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> pull</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> certbot/certbot</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>目前 docker 被墙，使用 docker pull 拉取 certbot 镜像会失败，可以使用自行查找第三方镜像仓库。</p><p>我这里使用的是阿里云的镜像加速服务：</p><blockquote><p>当前仅支持阿里云用户使用具备公网访问能力的阿里云产品进行镜像加速，且仅限于特定范围内的容器镜像。详情请见<a href="https://help.aliyun.com/zh/acr/product-overview/product-change-acr-mirror-accelerator-function-adjustment-announcement" target="_blank" rel="noopener noreferrer">公告</a>。</p></blockquote><h2 id="运行-certbot-容器" tabindex="-1"><a class="header-anchor" href="#运行-certbot-容器"><span>运行 certbot 容器</span></a></h2><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> run</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -it</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --rm</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">your_web_root_path:/etc/letsencrypt/webroot</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">your_letsencrypt_path:/etc/letsencrypt</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-v </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">your_letsencrypt_path/log:/var/log/letsencrypt</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">certbot/certbot </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">certonly</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --webroot</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">--webroot-path=/etc/letsencrypt/webroot </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">--email </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">your_email</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> \\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">--agree-tos </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">--no-eff-email </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">-d </span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">your_domain</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>your_web_root_path</code>：网站的根目录，即 index.html 目录，如果是 Jenkins，则在 jenkins_home/war/ 下。</p><p><code>your_letsencrypt_path</code>：在宿主机挂载的保存证书文件目录，申请下来的证书会在这个目录下，定时任务等文件也在这个文件夹下。</p><p>certbot 运行的 log 会保存在容器的 /var/log/letsencrypt 目录下，如果要查看问题，最好也挂载在宿主机中，这里就挂在了 your_letsencrypt_path/log 下。</p><p><code>certonly</code> 表示只申请证书，不需要 certbot 帮忙部署。</p><p><code>--webroot</code> 表示采用访问的方式进行域名所有权认证，也可以选择 dns 验证，这里选择 webroot 是因为可以进行自动化，可以自动续约，不需要手动去云服务器控制台手动添加 dns 解析条目。如果要申请通配符域名，则必须采用 dns 认证的方式。</p><p><code>your_domain</code>：需要申请证书的域名。</p><h2 id="获取证书" tabindex="-1"><a class="header-anchor" href="#获取证书"><span>获取证书</span></a></h2><p>如上所述，运行容器后，就会在宿主机挂载目录获取到证书。</p><p>运行完成后，容器会自动停止并删除。</p><p>等快到期后，cerbot 会自动续约。</p>`,20)]))}const p=i(n,[["render",r]]),h=JSON.parse(`{"path":"/article/docker-deploys-cerbot-to-automatically-obtain-ssl-certificates/","title":"Docker 部署 Certbot 自动获取 SSL 证书","lang":"zh-CN","frontmatter":{"title":"Docker 部署 Certbot 自动获取 SSL 证书","createTime":"2024/08/27 14:31:05","permalink":"/article/docker-deploys-cerbot-to-automatically-obtain-ssl-certificates/","excerpt":"现在云平台的官方免费 SSL 证书已经没有一年的了，有效期只有三个月，每次都需要手动申请和更新，挺麻烦的，好在现在有非常方便的自动化工具和平台，可以无限免费申请证书，最重要的还可以自动化续约，一次部署，就再也不用管了，非常方便。这里所介绍的方式就是通过容器化方式部署 certbot 工具，自动...","outline":[2,6],"tags":["Docker","Certbot","SSL"],"description":"写在前面 现在云平台的官方免费 SSL 证书已经没有一年的了，有效期只有三个月，每次都需要手动申请和更新，挺麻烦的，好在现在有非常方便的自动化工具和平台，可以无限免费申请证书，最重要的还可以自动化续约，一次部署，就再也不用管了，非常方便。 这里所介绍的方式就是通过容器化方式部署 certbot 工具，自动申请来自 let's encrypt 平台的免费...","head":[["meta",{"property":"og:url","content":"https://blog.ifback.com/article/docker-deploys-cerbot-to-automatically-obtain-ssl-certificates/"}],["meta",{"property":"og:site_name","content":"青何博客"}],["meta",{"property":"og:title","content":"Docker 部署 Certbot 自动获取 SSL 证书"}],["meta",{"property":"og:description","content":"写在前面 现在云平台的官方免费 SSL 证书已经没有一年的了，有效期只有三个月，每次都需要手动申请和更新，挺麻烦的，好在现在有非常方便的自动化工具和平台，可以无限免费申请证书，最重要的还可以自动化续约，一次部署，就再也不用管了，非常方便。 这里所介绍的方式就是通过容器化方式部署 certbot 工具，自动申请来自 let's encrypt 平台的免费..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-30T13:15:27.000Z"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"Certbot"}],["meta",{"property":"article:tag","content":"SSL"}],["meta",{"property":"article:modified_time","content":"2024-11-30T13:15:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker 部署 Certbot 自动获取 SSL 证书\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-30T13:15:27.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":2.44,"words":731},"git":{"updatedTime":1732972527000,"contributors":[{"name":"SingleMoonlight","username":"SingleMoonlight","email":"winston.wyx@foxmail.com","commits":5,"avatar":"https://avatars.githubusercontent.com/SingleMoonlight?v=4","url":"https://github.com/SingleMoonlight"}]},"autoDesc":true,"filePathRelative":"编程/Docker 部署 Certbot 自动获取 SSL 证书.md","categoryList":[{"id":"41282b","sort":10007,"name":"编程"}]}`);export{p as comp,h as data};
