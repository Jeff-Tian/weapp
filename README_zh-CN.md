# weapp

---

[English](README.md)

> 哈德韦的个人小程序，在小程序里尝试多租户的概念。

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)

## 为什么要在小程序里做多租户

小程序本身需要在微信里注册、审核，这个过程比较繁琐。如今，还需要花 30
元做微信认证，并且要进行备案，整个过程需要花很长时间。如果你想要做一个小程序，但是又不想要花这么多时间，可以考虑基于 weapp
项目来做，这样你可以快速地拥有一个小程序，并且可以在小程序里做一些自己的定制化。

基于 weapp 项目，你可以拥有一个租户入口，其实和独立的小程序没有太大的区别。就类似于做网站时，不想申请域名，可以用二级域名来做一样。虽然不是根域名，但是可以省去购买域名和进行备案的麻烦。

weapp 经过了微信认证和管局备案，因此，通过租户方式入驻，你可以省去这些繁琐的步骤。你只需要 fork weapp 项目，然后用新增
subpages 的方式，来增加自己的页面。最后，提交 PR 到本项目，一旦合并，就可以在小程序里看到你的页面了。

## 域名

| 租户         | jefftian.dev    入口                                        | pa-ca.me（通过了域名备案） 入口                                  |
|------------|-----------------------------------------------------------|-------------------------------------------------------|
| 主入口        | https://taro.jefftian.dev                                 | https://taro.pa-ca.me                                 |
| Brickverse | https://taro.jefftian.dev/pages/subpages/brickverse/index | https://taro.pa-ca.me/pages/subpages/brickverse/index |
| 哈德韦        | https://taro.jefftian.dev/pages/yuque/index               | https://taro.pa-ca.me/pages/yuque/index               |

## 小程序

| 租户         | 体验版                                                     | 正式版                                                       |
|------------|---------------------------------------------------------|-----------------------------------------------------------|
| Brickverse | ![Brickverse 体验版](https://i1.lensdump.com/i/Rg0UAq.jpg) | ![Brickverse 正式版](https://i.lensdump.com/i/Rg0cVA.md.png) |
| 哈德韦        |                                                         | ![哈德韦的个人小程序](./tenants/hardway/suncode.png)               |

### 微信小程序密钥

一旦在微信小程序后台更新完密钥，就需要同步将密钥更新到 authing.cn
的后台中：https://console.authing.cn/console/620097b69a9dab5e967d0c44/connection/social-identity-source/info?provider=wechat&type=wechat:miniprogram:default&sourceId=6204b1aacf9a04e869484aa2
，否则会造成小程序无法登录。

## 图片存储

不建议将图片资源直接放在代码库中，目前图片托管在： https://lensdump.com/ 。

## 本地开发

```shell
yarn 
yarn build:weapp
```

### 更新微信小程序开发版本

先更新 package.json 的 version 和 description，然后执行：

```shell
yarn build:weapp:upload
```

### 更新体验版与提交审核

在开发版更新成功后，去 https://mp.weixin.qq.com/wxamp/wacodepage/getcodepage?token=14130862&lang=zh_CN
页面，将最新更新的开发版设置为体验版，在体验版体验完毕后，可以提交审核成为线上版本。

### 排障指南

#### Windows 11 下命令行中文输出乱码

运行如下 bat 文件解决

```shell
chinese.bat
```

#### yarn 报 node-sass 相关的错误

##### python2 找不到

##### Windows

```shell
choco install python2
```

##### Mac OSX

```shell
gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
```

直接 `brew install python2` 已经不行了，可以通过 `pyenv` 这样安装：

```shell
brew install pyenv
pyenv install 2.7.18
export PATH="$(pyenv root)/shims:${PATH}"
pyenv global 2.7.18
echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.zshrc
```

这样操作完后，`python` 默认是 2.7.18 版本，而 `python3` 仍然可用， 不冲突。

##### Windows 11 要求安装 .NET 2 sdk

```shell
sudo yarn add windows-build-tools --global
```

即使这个命令卡死状态，现在可以 yarn install 成功了。

## 将它发布成你的个人小程序

如果你也想要有一个个人小程序并且不想从头开发，可以基于 weapp 项目来迭代。

### 部署 Serverless-Space

weapp 的后端服务，主要由 Serverless-Space 提供，如果你要基于 weapp 项目部署你自己的小程序，需要先部署自己的
Serverless-Space 服务，否则，小程序界面上会呈现哈德韦的数据。

参考 []().

### 修改 appid

在项目里，把 appid 修改为你自己申请的小程序的 appid。

### 修改 Serverless-Space 域名

将 sls.pa-ca.me 修改为你自己的后端服务（Serverless-Space）域名。

## 功能

- 增加关于页面
- 优化文章显示
- 分开登录与发布的逻辑
- 增加井字棋游戏页面
- 优化井字棋游戏页面展示
- 增加人工智能版井字棋游戏页面
- 增加 C++ 代码展示页面

## Star History

![https://api.star-history.com/svg?repos=jeff-tian/weapp&type=Date](https://api.star-history.com/svg?repos=jeff-tian/weapp&type=Date)

## 备案信息

![](./beian.png)
