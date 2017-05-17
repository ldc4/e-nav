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
由于create-react-app本身依赖于react-scripts，所以需要到node_modules/react-scripts/config目录下修改配置文件webpack.config.dev.js

尝试一下能否在项目根目录中覆盖配置。
貌似不行，需要将react-scripts整合到自己的项目中。那样就可以维护自己的配置了。类似于[create-react-app-antd](https://github.com/ant-design/create-react-app-antd)
在尝试过程中，报错了。还原成原来的样子还是不行，只有删掉node_modules重新安装了。

a.按需加载
b.自定义主题

源代码中直接将patch文件夹下的配置覆盖掉react-scripts的配置就可以了。
