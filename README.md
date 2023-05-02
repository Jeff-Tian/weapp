# weapp

---

[简体中文](README_zh-CN.md)

> Personal Wechat Miniprogram for Hardway

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Jeff-Tian_weapp&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Jeff-Tian_weapp)

## Domains

- https://taro.jefftian.dev
- https://taro.pa-ca.me

## Mini program

| Trial Version                                   | Release Version                                      |
|-------------------------------------------------|------------------------------------------------------|
| ![哈德韦体验版](https://i1.lensdump.com/i/Rg0UAq.jpg) | ![领取哈小兔红包封面！](https://i3.lensdump.com/i/RxSMhA.jpeg) |

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
