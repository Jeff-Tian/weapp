# weapp 

---

[English](README.md)

> 哈德韦的个人小程序

|体验版|正式版|
| --- | --- |
|![哈德韦体验版](basicprofile.jpeg)| ![哈德韦正式版](./扫码_搜索联合传播样式-微信标准绿版.png) |

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

在开发版更新成功后，去 https://mp.weixin.qq.com/wxamp/wacodepage/getcodepage?token=14130862&lang=zh_CN 页面，将最新更新的开发版设置为体验版，在体验版体验完毕后，可以提交审核成为线上版本。

### 排障指南

#### Windows 11 下命令行中文输出乱码

运行如下 bat 文件解决

```shell
chinese.bat
```

#### Windows 11 下 yarn 报 node-sass 相关的错误

##### python2 找不到

```shell
choco install python2
```

##### 要求安装 .NET 2 sdk

```shell
sudo yarn add windows-build-tools --global
```

即使这个命令卡死状态，现在可以 yarn install 成功了。

## 将它发布成你的个人小程序

如果你也想要有一个个人小程序并且不想从头开发，可以基于 weapp 项目来迭代。

### 部署 Serverless-Space

weapp 的后端服务，主要由 Serverless-Space 提供，如果你要基于 weapp 项目部署你自己的小程序，需要先部署自己的 Serverless-Space 服务，否则，小程序界面上会呈现哈德韦的数据。

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
