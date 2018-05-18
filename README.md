# 生态导航（e-nav）

## 说明

面向个人学习资料整理的导航，也可以理解为书签。

## 技术方案

- create-react-app
- react + antd
- lodash

## 环境

具体参考：[Antd在create-react-app中的使用](https://ant.design/docs/react/use-with-create-react-app-cn)

1.先用create-react-app创建一个项目

```bash
npm install -g create-react-app
create-react-app e-nav
```

2.安装antd和lodash

```bash
npm install antd loadsh --save
create-react-app e-nav
```

3.配置webpack

```bash
npm run eject // 暴露出webpack配置
```

a.按需加载（babel-plugin-import）

b.自定义主题（less-loader）

c.配置eslint

4.测试

create-react-app自带jest(基于jasmine的JS测试框架)，配合使用Enzyme测试工具库，jest有内建的断言库。

具体参考：
[[Running Test]](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)
[[Enzyme官方文档]](http://airbnb.io/enzyme/)
[[jest内建except API]](http://facebook.github.io/jest/docs/expect.html)

## 目录

由于页面比较简单，还是采用一贯的：
分为两类，一类公共组件，一类业务组件。

```bash
/src
  | - /app
        | - /Nav
  | - /assets
        | - logo.svg
  | - /common
        | - /W2Footer
        | - /W2Header
  | - /data
        | - nav.json
  | - /util
        | - helper.js
```
data用于存放导航数据结构
assets用于放图片等静态资源

PS：针对data目录在构建脚本上做了一些修改：
即无须导入，发送异步请求从json文件获取数据，与向后台接口请求数据保持一致行为。以便于无缝切换。
另外，`require`或`import`的数据文件如果很大，有可能会报错。所以个人不太赞同使用这种方式。

具体修改：
`build.js`和`start.js`中添加如下主要代码：（具体请参考`build.js`和`start.js`）
```bash
var fs = require('fs-extra');

function copySrcDataFolder() {
  fs.copySync(paths.appData, paths.appBuild+'/data', {
    dereference: true
  });
}
```
**需要注意的是fs变量，是导入的fs-extra**

## nav.json格式说明

```
    {
      title: "生态导航",
      categories: [
        {
          name: "类别名",
          groups: [
            {
              name: "类别名",
              links: [
                {
                  name: "链接名",
                  src: "https://github.com/ldc4", // 具体链接
                  description: "链接描述",
                  open: 1, // 打开方式 （0 - 新窗口 | 1 - 当前窗口），默认0
                  new: true,  // 是否标记为New （ false - 不是 | true - 是 ），默认false
                }
              ]
            }
          ]
        }
      ]
    }
```

## IDEA

nav.json扩展字段addTime/updateTime，并通过addTime替代new字段

研究避免手动修改nav.json的方案（chrome插件/electron + 后台接口修改数据）


