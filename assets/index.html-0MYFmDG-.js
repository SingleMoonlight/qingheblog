import{_ as i,c as a,a as n,o as e}from"./app-CvKX1Xds.js";const h="/assets/1729268248561-7b082811-4b2c-4bee-9c19-99b26f37da22-DDGDkseS.png",t="/assets/1729264497209-f3070861-7d04-4e79-8493-2c38d600dbce-C7E5UuVP.png",l="/assets/1729264759670-987fb29f-8d53-4fc3-8c68-08743c653f97-DHO_DnJ4.png",p="/assets/1729268287805-94bf8de0-cffb-41a9-87c2-d01b92bb9fb6-DnT6EUKb.png",k="/assets/1729266557089-6557cc84-f731-488e-8038-5510bf3731a6-C3__R_BN.png",r={};function d(g,s){return e(),a("div",null,s[0]||(s[0]=[n('<h2 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面"><span>写在前面</span></a></h2><p>之前折腾个人网站的时候用云服务器，想到云服务器本质就是一个跑程序的 Linux 系统，想到用闲置的安卓手机是不是也可以，于是用淘汰下来的安卓手机试着部署了个人网站。</p><p>当然，这样部署的网站只能在局域网内访问，如果要想实现公网访问，要么通过内网穿透，要么想办法获取公网 IP。IPV4 地址获取的难度比较大（几乎不可能），不过 IPV6 公网地址获取还是比较容易的，而且现在的手机都是默认开启 IPV6 的，通过 IPV6 访问也算是个不错的选择。</p><p>后面再专门写一篇文章介绍如何让本次搭建的网站（或者其他方式搭建的局域网网站）通过域名即公网进行访问。</p><h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作"><span>准备工作</span></a></h2><p>一台安卓手机，手机不需要 root 。本篇文章使用的手机是小米 11，系统是 HyperOS。</p><p>一台电脑。</p><h2 id="开始实践" tabindex="-1"><a class="header-anchor" href="#开始实践"><span>开始实践</span></a></h2><h3 id="安装-termux" tabindex="-1"><a class="header-anchor" href="#安装-termux"><span>安装 Termux</span></a></h3><blockquote><p>Termux 是一个 Android 终端模拟器和 Linux 环境应用程序，允许用户在 Android 设备上无需 root 权限即可运行 Linux 命令行工具和软件。</p></blockquote><p>Termux 软件商店里应该是没有的，Termux <a href="https://termux.dev/cn/" target="_blank" rel="noopener noreferrer">官网</a>也提供了项目的 GitHub 地址，可以在 GitHub 项目 Releases 中下载安装包，要注意选择相应的版本，这里选择的是 ARM64 位版。</p><p>下载后安装，系统可能会提示风险，继续安装即可。</p><h3 id="termux-换源" tabindex="-1"><a class="header-anchor" href="#termux-换源"><span>Termux 换源</span></a></h3><p>首次安装时，Termux 没有配置软件源，需要先配置源，才能下载和更新软件包。</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">termux</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">change</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">-</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">repo</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>输入上述命令后，会出现一个 GUI 页面，在图形界面引导下，使用自带方向键可上下移动。</p><p><img src="'+h+`" alt=""></p><p>第一步使用空格选择需要更换的仓库，之后在第二步选择相应镜像源。确认无误后回车，镜像源会自动完成更换。</p><h3 id="ssh-远程连接" tabindex="-1"><a class="header-anchor" href="#ssh-远程连接"><span>SSH 远程连接</span></a></h3><p>手机端页面和命令行输入不方便，为了后续方便起见，还是通过 SSH 远程连接至手机的 Termux。</p><h4 id="安装-ssh-server" tabindex="-1"><a class="header-anchor" href="#安装-ssh-server"><span>安装 SSH Server</span></a></h4><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">#</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">安装OpenSSH</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">$</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> pkg</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> install</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> openssh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">#</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">运行SSH</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Server</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">$</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> sshd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">#</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">设置密码</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">$</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> passwd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意设置的密码在后面 SSH 远程登录的时候会用到。</p><blockquote><p>Termux 默认包管理工具是 pkt。</p></blockquote><h4 id="查看-ip" tabindex="-1"><a class="header-anchor" href="#查看-ip"><span>查看 IP</span></a></h4><p>就像远程云服务器一样，首先确认一下手机的 IP 地址，可以通过如下命令查看，或者直接在手机 WiFi 管理页面查看。</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">ifconfig</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="远程连接" tabindex="-1"><a class="header-anchor" href="#远程连接"><span>远程连接</span></a></h4><p>SSH 远程连接需要一个 PC 端的终端工具，此类工具有很多，比如 Xshell、putty 等，这里使用的是 MobaXterm，免费好用。MobaXterm <a href="https://mobaxterm.mobatek.net/" target="_blank" rel="noopener noreferrer">官网</a>，直接下载安装即可。</p><blockquote><p>每个人可能习惯用的工具不太一样，只要能用 SSH 就好。</p></blockquote><p><img src="`+t+'" alt=""></p><p>需要注意的是，默认端口号是 <code>8022</code>，而不是 <code>22</code>。</p><p>设置好后，输入用户名和密码登录，用户名为 <code>root</code>，密码为上一步设置的，连接成功后类似这样。后面就可以在 PC 端进行操作了。</p><p><img src="'+l+`" alt=""></p><h4 id="设置-sshd-自启动" tabindex="-1"><a class="header-anchor" href="#设置-sshd-自启动"><span>设置 sshd 自启动</span></a></h4><p>手机端每次 Termux 退出重新打开，都需要重新运行 sshd，不是很方便，因此我们可以设置 sshd 开机自动启动。</p><p>Termux 默认没有文本处理工具，可以根据个人习惯选择安装，这里使用的是 <code>vim</code>。</p><blockquote><p>如果使用 MobaXterm 的话，可以在窗口右侧直接看到文件，双击即可在 PC 端进行编辑，很方便，推荐试一试。</p></blockquote><p>编辑 <code>.bashrc</code> 文件：</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"># </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">安装</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> vim</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">pkg</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> install</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> vim</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"># </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">编辑</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">bashrc</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> 文件</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">vim</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ~/</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">bashrc</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在文件中添加如下内容：</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">echo</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">User: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">$</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">whoami</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">if</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> pgrep</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">x</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">sshd</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> &gt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> /</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">dev</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/null</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">then</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  echo</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">sshd is running...</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">else</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  sshd</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  echo</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">start sshd...</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存后，每次启动 Termux 软件就可以自动运行 sshd 了。</p><p><img src="`+p+`" alt=""></p><h3 id="后台运行" tabindex="-1"><a class="header-anchor" href="#后台运行"><span>后台运行</span></a></h3><p>安卓系统可能会杀掉运行中的不活跃应用，为了保证 Termux 一直运行，可以将其设为后台常驻。对于小米手机来说，在后台页面下拉即可。</p><h3 id="固定-ip" tabindex="-1"><a class="header-anchor" href="#固定-ip"><span>固定 IP</span></a></h3><p>手机连接 WiFi 后，每次 IP 地址可能发生变化，这样 PC SSH 连接手机还需要修改 IP 地址，比较麻烦。可以在手机 WiFi 页面，在连接 WiFi 前，选择静态 IP 地址，注意要与路由的网段保持一致。</p><h3 id="配置-nginx" tabindex="-1"><a class="header-anchor" href="#配置-nginx"><span>配置 Nginx</span></a></h3><h4 id="安装-nginx" tabindex="-1"><a class="header-anchor" href="#安装-nginx"><span>安装 Nginx</span></a></h4><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"># </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">安装</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> nginx</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">~</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> pkg</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> install</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> nginx</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"># </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">查看</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> nginx</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> 版本</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">~</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> nginx</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">v</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">nginx</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> version</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> nginx</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1.27</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行-nginx" tabindex="-1"><a class="header-anchor" href="#运行-nginx"><span>运行 Nginx</span></a></h4><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">~</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> $</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> nginx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>nginx 运行起来后，就可以在同一局域网下的设备浏览器中访问 nginx 默认网站了，地址为 <code>IP:8080</code>，PC 浏览器查看运行效果如下：</p><p><img src="`+k+`" alt=""></p><h4 id="部署个人网站" tabindex="-1"><a class="header-anchor" href="#部署个人网站"><span>部署个人网站</span></a></h4><p>nginx 的默认配置文件和网站代码在如下目录中，剩下的就是将自己的网站代码上传到 Termux 中，然后配置 nginx.conf 即可，这里就不再展示了。</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"># </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">nginx</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> 配置文件</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">data</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">data</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">com</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">termux</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">files</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">usr</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">etc</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">nginx</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">nginx</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">conf</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"># </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">网站代码</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">data</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">data</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">com</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">termux</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">files</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">usr</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">share</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">nginx</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">html</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置-nginx-开机自启动" tabindex="-1"><a class="header-anchor" href="#设置-nginx-开机自启动"><span>设置 Nginx 开机自启动</span></a></h4><p>和前面 sshd 一样，nginx 默认是不会开机启动的，需要进行配置。</p><p>编辑 <code>.bashrc</code> 文件，在其中添加如下内容：</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">if</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> pidof</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> -</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">x</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">nginx</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> &gt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> /</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">dev</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">/null</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">then</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  echo</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">nginx is running...</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">else</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  nginx</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">  echo</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">start nginx...</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">fi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样每次开启 Termux 软件后，就会自动运行 nginx。</p>`,63)]))}const B=i(r,[["render",d]]),o=JSON.parse('{"path":"/article/android-phone-deploy-personal-website-by-termux/","title":"安卓手机使用 Termux 部署个人网站","lang":"zh-CN","frontmatter":{"title":"安卓手机使用 Termux 部署个人网站","createTime":"2024/10/17 15:27:42","permalink":"/article/android-phone-deploy-personal-website-by-termux/","excerpt":"写在前面之前折腾个人网站的时候用云服务器，想到云服务器本质就是一个跑程序的 Linux 系统，想到用闲置的安卓手机是不是也可以，于是用淘汰下来的安卓手机试着部署了个人网站。当然，这样部署的网站只能在局域网内访问，如果要想实现公网访问，要么通过内网穿透，要么想办法获取公网 IP。IPV4 地址获...","outline":[2,6],"tags":["Termux"],"description":"写在前面 之前折腾个人网站的时候用云服务器，想到云服务器本质就是一个跑程序的 Linux 系统，想到用闲置的安卓手机是不是也可以，于是用淘汰下来的安卓手机试着部署了个人网站。 当然，这样部署的网站只能在局域网内访问，如果要想实现公网访问，要么通过内网穿透，要么想办法获取公网 IP。IPV4 地址获取的难度比较大（几乎不可能），不过 IPV6 公网地址获...","head":[["meta",{"property":"og:url","content":"https://blog.ifback.com/article/android-phone-deploy-personal-website-by-termux/"}],["meta",{"property":"og:site_name","content":"青何博客"}],["meta",{"property":"og:title","content":"安卓手机使用 Termux 部署个人网站"}],["meta",{"property":"og:description","content":"写在前面 之前折腾个人网站的时候用云服务器，想到云服务器本质就是一个跑程序的 Linux 系统，想到用闲置的安卓手机是不是也可以，于是用淘汰下来的安卓手机试着部署了个人网站。 当然，这样部署的网站只能在局域网内访问，如果要想实现公网访问，要么通过内网穿透，要么想办法获取公网 IP。IPV4 地址获取的难度比较大（几乎不可能），不过 IPV6 公网地址获..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-30T13:15:27.000Z"}],["meta",{"property":"article:tag","content":"Termux"}],["meta",{"property":"article:modified_time","content":"2024-11-30T13:15:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"安卓手机使用 Termux 部署个人网站\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-30T13:15:27.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":5.11,"words":1533},"git":{"updatedTime":1732972527000,"contributors":[{"name":"SingleMoonlight","username":"SingleMoonlight","email":"winston.wyx@foxmail.com","commits":3,"avatar":"https://avatars.githubusercontent.com/SingleMoonlight?v=4","url":"https://github.com/SingleMoonlight"}]},"autoDesc":true,"filePathRelative":"编程/安卓手机使用 Termux 部署个人网站.md","categoryList":[{"id":"41282b","sort":10007,"name":"编程"}]}');export{B as comp,o as data};
