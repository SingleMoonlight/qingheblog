import{_ as i,c as a,a as n,o as e}from"./app-uEyF5V71.js";const l="/assets/1726911884810-99b01100-5cfc-4fa1-98ab-1835c2528251-BulNwJgo.png",t="/assets/1726912127473-aa131c2f-14a9-4847-9be7-c47879987f81-DfKoebhu.png",h="/assets/1726912244948-d5f97f16-3638-4e89-8c67-0b0b39019f81-CXICUS-Z.png",p="/assets/1726913791336-d1e4e126-8b36-486f-b86d-13df12c9e75e-CIAP11dH.png",k="/assets/1726913684920-f178567e-6d10-4298-a6a7-001b2cad250e-DEjTV4LR.png",d="/assets/1726913855900-ab82aebd-3d9d-40c1-9dfe-5010b6abf3ca-Drfo0LJt.png",r={};function c(g,s){return e(),a("div",null,s[0]||(s[0]=[n('<h2 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面"><span>写在前面</span></a></h2><p>从萌生创建网站的想法开始，试过了很多建站方式，目前是云服务器自建博客前台，博文托管平台，各个子站容器化部署，更新使用 Jenkins 自动化部署和发布，配置、迁移、SSL 等都是通过脚本一键完成，可以说十分优雅，一定程度上，我觉得这将是最终形态，不会再折腾了。</p><p>但是云服务器还是有成本的，本着能<s>白嫖绝不花钱</s>的态度，决定将几个网站都迁移到 GitHub 上。</p><p>这里介绍的 GitHub 的两种工具分别是 GitHub Pages 和 GitHub Action，前者用于托管静态网站，后者用于网站的自动化部署和发布。对于个人开发者来说，建站十分方便。</p><p>静态网站意味着不能访问后台 API，不过一般来说也用不到，如果确实有使用第三方 API 的需求，就会面临着跨域和安全问题，需要仔细考虑是否有解决方案。</p><h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始"><span>开始</span></a></h2><h3 id="网站开发" tabindex="-1"><a class="header-anchor" href="#网站开发"><span>网站开发</span></a></h3><p>网站开发不必多说，每个人都不一样，需要保证本地构建运行没有问题。</p><h3 id="代码推送" tabindex="-1"><a class="header-anchor" href="#代码推送"><span>代码推送</span></a></h3><p>当本地开发好网站后，需要将代码推送到 GitHub 仓库，例如：</p><p><img src="'+l+'" alt=""></p><p>请先忽略图中的 workflows 文件，后面会说明如何进行配置。</p><h3 id="github-action-配置" tabindex="-1"><a class="header-anchor" href="#github-action-配置"><span>GitHub Action 配置</span></a></h3><p>在仓库页面上方，依次选择<code>Setting</code>-&gt;<code>Action</code>-&gt;<code>General</code>。</p><p><img src="'+t+'" alt=""></p><p>然后划到最下面，在<code>Workflow permissions</code>项中，选择赋予读写权限。</p><p><img src="'+h+`" alt=""></p><p>这里是因为后面使用 GitHub Action 自动打包部署时，会创建 gh-pages 分支，并将打包好的文件自动上传到该分支，所以需要写入权限，如果不进行配置，自动部署回报没有权限的错误。</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Run</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> crazy-max/ghaction-github-pages@v4</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Initializing</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> local</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> repo</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Copying</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /home/runner/work/qingheifback/qingheifback/dist</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> to</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /tmp/github-pages-NOVeCl</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Configuring</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> committer</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Updating</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> index</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> working</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> tree</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Committing</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> changes</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Pushing</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> dist</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> directory</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> to</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> gh-pages</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> branch</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> on</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> SingleMoonlight/qingheifback</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> repo</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  /usr/bin/git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> push</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --force</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> ***</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">github.com/SingleMoonlight/qingheifback.git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> gh-pages</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  remote:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Permission</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> to</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> SingleMoonlight/qingheifback.git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> denied</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> to</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> github-actions[bot].</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  fatal:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> unable</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> to</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> access</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">https://github.com/SingleMoonlight/qingheifback.git/</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> The</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> requested</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> URL</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> returned</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> error:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 403</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  Error:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> The</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> process</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/usr/bin/git</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> failed</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> with</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> exit</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> code</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 128</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="github-aciton-workflow-编写" tabindex="-1"><a class="header-anchor" href="#github-aciton-workflow-编写"><span>GitHub Aciton workflow 编写</span></a></h3><p>GitHub Action 自动打包部署是根据 GitHub 规定的一个名为<code>deploy.yml</code>文件自动完成的，这个文件需要放在代码库<code>.github/workflow/deploy.yml</code>路径下。</p><p>这个文件需要怎么写呢？可以参考<a href="about:blank" target="_blank" rel="noopener noreferrer">官网</a>的介绍，或者直接用现成的模板，管他三七二十一，先跑起来再说定制化。这里直接给一个基本万能，vue 项目可以直接用的文件：</p><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">name:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> deploy</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">on:</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  # 每当 push 到 main 分支时触发部署</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  # Deployment is triggered whenever a push is made to the main branch.</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  push:</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    branches:</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> [main]</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  # 手动触发部署</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  # Manually trigger deployment</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  workflow_dispatch:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">jobs</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">:</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  build-and-deploy:</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    runs-on:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ubuntu-latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    steps:</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      -</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> uses:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> actions/checkout@v4</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        with:</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">          # &quot;Last updated time&quot; and other git log-related information require fetching all commit records.</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">          fetch-depth:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      -</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> name:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Setup</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Node.js</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        uses:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> actions/setup-node@v4</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        with:</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">          # 选择要使用的 node 版本</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">          node-version:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 20</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">      </span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      # 安装依赖</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      # Install dependencies</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      -</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> name:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Dependencies</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        run:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ci</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      # 运行构建脚本</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      # Run the build script</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      -</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> name:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Build</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> site</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        run:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> run</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> build</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      # 查看 workflow 的文档来获取更多信息</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      # @see https://github.com/crazy-max/ghaction-github-pages</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      -</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> name:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Deploy</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> to</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> GitHub</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Pages</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        uses:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> crazy-max/ghaction-github-pages@v4</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        with:</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">          # 部署到 gh-pages 分支</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">          target_branch:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> gh-pages</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">          # 部署目录</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">          build_dir:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> dist</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        env:</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">          GITHUB_TOKEN:</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> \${{ secrets.GITHUB_TOKEN }}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，这个文件一点都不需要动，唯一需要关注的就是部署目录，也就是本地编译后，产物的打包目录，默认都是 dist。</p><h3 id="推送-deploy-yml" tabindex="-1"><a class="header-anchor" href="#推送-deploy-yml"><span>推送 deploy.yml</span></a></h3><p>现在本地编写完了<code>deploy.yml</code>，将其 push 到 GitHub 仓库，此时可以看到 GitHub 在自动执行构建。</p><p><img src="`+p+'" alt=""></p><p>如果不出意外的话，构建完成就可以看到自动创建的新分支<code>gh-pages</code>以及打包好的产物。</p><p><img src="'+k+'" alt=""></p><h3 id="github-pages-配置" tabindex="-1"><a class="header-anchor" href="#github-pages-配置"><span>GitHub Pages 配置</span></a></h3><p>在仓库的<code>Setting</code>-&gt;<code>Pages</code>里，<code>Branch</code>选择自动生成的<code>gh-pages</code>，稍等一会，将会在上面看到网站可以访问。</p><p><img src="'+d+`" alt=""></p><blockquote><p>这里我自定义了域名，所以地址不是<code>***.github.io/project_name</code></p></blockquote><p>如果此时访问上述网站，会发现静态资源全都加载失败，如果查看访问的地址，会发现静态资源的访问地址是<code>***.github.io/***.css</code>，而不是<code>***.github.io/project_name/***.css</code>。</p><p>这是因为 vue 项目的本地还缺少了下面的配置。</p><h3 id="base-url-配置" tabindex="-1"><a class="header-anchor" href="#base-url-配置"><span>Base URL 配置</span></a></h3><p>在<code>vite.config.js</code>里指定<code>base</code>为仓库的名称，否则部署后访问时会找不到静态资源。</p><blockquote><p>这里项目是用vite构建的，webpack构建的项目也是一样，可能配置地方不同。</p></blockquote><p>不过先别急着修改，如果你打算绑定自己的域名，那么这一步的base就需要配置为<code>&#39;/&#39;</code>。</p><blockquote><p>如何自定义域名：<a href="https://blog.ifback.com/article/github-pages-bind-custom-domain-and-enable-https/" target="_blank" rel="noopener noreferrer">https://blog.ifback.com/article/github-pages-bind-custom-domain-and-enable-https/</a></p></blockquote><div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">export</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> default</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> defineConfig</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  base:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/qingheifback</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">,</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 这里需要配置为仓库名称或者</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  plugins:</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> [</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    vue</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  ],</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  resolve:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">    alias</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      &#39;@&#39;</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> fileURLToPath</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">new</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> URL</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">&#39;./src&#39;</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">,</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> import.meta.url</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">))</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  },</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  build:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    outDir:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">dist</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">,</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    rollupOptions:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">      output:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        manualChunks(id</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">          if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">id.includes(</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">&quot;node_modules&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">            //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 将外部依赖单独打包</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">            return</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">vendor</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">          }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">      },</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    },</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  },</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">  server:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    host:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">0.0.0.0</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">,</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> //</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 配置项目可以局域网访问</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    port:</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> 8000,</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  },</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改好 base 后，将代码推送到 GitHub，不出意外，网站就可以正常访问了。</p>`,42)]))}const A=i(r,[["render",c],["__file","index.html.vue"]]),y=JSON.parse('{"path":"/article/github-pages-and-aciton-automatically-package-and-deploy-vue-projects/","title":"GitHub Pages + GitHub Aciton 自动打包部署 Vue 项目","lang":"zh-CN","frontmatter":{"title":"GitHub Pages + GitHub Aciton 自动打包部署 Vue 项目","createTime":"2024/09/21 06:08:22","permalink":"/article/github-pages-and-aciton-automatically-package-and-deploy-vue-projects/","excerpt":"写在前面从萌生创建网站的想法开始，试过了很多建站方式，目前是云服务器自建博客前台，博文托管平台，各个子站容器化部署，更新使用 Jenkins 自动化部署和发布，配置、迁移、SSL 等都是通过脚本一键完成，可以说十分优雅，一定程度上，我觉得这将是最终形态，不会再折腾了。但是云服务器还是有成本的，...","outline":[2,6],"tags":["GitHub"],"description":"写在前面 从萌生创建网站的想法开始，试过了很多建站方式，目前是云服务器自建博客前台，博文托管平台，各个子站容器化部署，更新使用 Jenkins 自动化部署和发布，配置、迁移、SSL 等都是通过脚本一键完成，可以说十分优雅，一定程度上，我觉得这将是最终形态，不会再折腾了。 但是云服务器还是有成本的，本着能的态度，决定将几个网站都迁移到 GitHub 上。...","head":[["meta",{"property":"og:url","content":"https://blog.ifback.com/article/github-pages-and-aciton-automatically-package-and-deploy-vue-projects/"}],["meta",{"property":"og:site_name","content":"青何博客"}],["meta",{"property":"og:title","content":"GitHub Pages + GitHub Aciton 自动打包部署 Vue 项目"}],["meta",{"property":"og:description","content":"写在前面 从萌生创建网站的想法开始，试过了很多建站方式，目前是云服务器自建博客前台，博文托管平台，各个子站容器化部署，更新使用 Jenkins 自动化部署和发布，配置、迁移、SSL 等都是通过脚本一键完成，可以说十分优雅，一定程度上，我觉得这将是最终形态，不会再折腾了。 但是云服务器还是有成本的，本着能的态度，决定将几个网站都迁移到 GitHub 上。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-30T13:15:27.000Z"}],["meta",{"property":"article:tag","content":"GitHub"}],["meta",{"property":"article:modified_time","content":"2024-11-30T13:15:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GitHub Pages + GitHub Aciton 自动打包部署 Vue 项目\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-30T13:15:27.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":5,"words":1500},"git":{"updatedTime":1732972527000,"contributors":[{"name":"SingleMoonlight","username":"SingleMoonlight","email":"winston.wyx@foxmail.com","commits":6,"avatar":"https://avatars.githubusercontent.com/SingleMoonlight?v=4","url":"https://github.com/SingleMoonlight"}]},"autoDesc":true,"filePathRelative":"编程/GitHub Pages + GitHub Aciton 自动打包部署 Vue 项目.md","categoryList":[{"id":"41282b","sort":10007,"name":"编程"}],"bulletin":false}');export{A as comp,y as data};