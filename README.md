# weapp

---

[简体中文](README_zh-CN.md)

> Personal Wechat Miniprogram for Hardway

| Trial Version                                   | Release Version                                   |
|-------------------------------------------------|---------------------------------------------------|
| ![哈德韦体验版](https://i1.lensdump.com/i/Rg0UAq.jpg) | ![哈德韦正式版](https://i.lensdump.com/i/Rg0cVA.md.png) |

## Local development

```shell
yarn 
yarn build:weapp
```

## Troubleshooting

### Error with node 18: 'digital envelope routines'

#### Mac OSX

##### shell

```shell
NODE_OPTIONS="--openssl-legacy-provider" yarn dev:h5
```

##### cmd

```cmd
set NODE_OPTIONS="--openssl-legacy-provider" && yarn dev:h5
```

## Star History

![https://api.star-history.com/svg?repos=jeff-tian/weapp&type=Date](https://api.star-history.com/svg?repos=jeff-tian/weapp&type=Date)
