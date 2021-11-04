# 典典博客


预览: [https://itbug.shop](https://itbug.shop)


## 安装

进入项目根目录安装依赖

```bash
$ yarn
```


找到`src/util/request.ts`文件将常量`host`替换成服务器地址

```bash
const host = 'https://itbug.shop'; // api接口服务器
```

启动服务

```bash
$ yarn start
```

## 部署
运行命令
```bash
yarn build
```
系统会在根目录下面创建`dist`目录,里面有三个文件
```bash
index.html
umi.css
umi.js
```
把这三个放到你的服务器里面做url映射
