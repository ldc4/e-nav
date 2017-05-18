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
[Running Test](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)
[Enzyme官方文档](http://airbnb.io/enzyme/)
[jest内建except API](http://facebook.github.io/jest/docs/expect.html)





