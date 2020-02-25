# koa-server 项目模板

## 开发

安装依赖：

```bash
$ npm install
```

启动应用：

```bash
$ npm start

# 或者
$ npm run dev
```

注意：

如果无法启动，那么应该是缺少 `src/configs/db.js` 这个敏感信息文件，自己加一个进去就好了，模板可以参照如下：
```js
// src/configs/db.js
const isProd = process.env.NODE_ENV === 'production';

// 开发、测试环境 mysql 配置
const MYSQL = {
	TEST: {
		host: 'localhost',
		port: 3306,
		database: 'db_name',
		username: 'user_name',
		password: 'user_password',
	},
	PROD: {
		host: 'localhost',
		port: 3306,
		database: 'db_name',
		username: 'user_name',
		password: 'user_password',
	},
};

module.exports = {
	mysql: isProd ? MYSQL.PROD : MYSQL.TEST,
};

```

## 调试

`.vscode` 已经内置了一份 `launch.json`，可以让我们在使用 node 或者 nodemon 时调试代码，直接在 vscode 调试界面启动对应的项目即可。

启动应用之后，我们可以不借助第三方的 api 请求调试客户端，给 vscode 装一个「REST Client」扩展即可，使用方法详见参考链接。

本项目已经写好了一份请求 demo 放在 `testapi` 文件夹写，安装好扩展就可以直接使用了。

## 错误中间件

错误中间件一定要放在所有中间件的最前面，然后其他所有的中间件，包括路由中间件，都需要改写成 `async/await` 的形式，方便让错误中间件能够捕捉到 `throw` 出来的错误。

## 日志中间件

日志中间件使用了如下 npm 包来打造：

- `morgan` 框架无关的统一日志中间件，啥框架都可以用；
- `rotating-file-stream` 流式滚动文件操作库；

这两者能够契合的关键点是，`morgan` 开放了一个自定义写日志文件流的入口，而 `rotating-file-stream` 又能够提供流式滚动文件的操作。

什么滚动文件？那就是在指定文件名（或者生成文件名规则）、日志文件上限、日志文件大小上限之后，就能按这些规则来生成文件，并记录日志。

## 参考链接

- [Sequelize Docs 中文版 V5](https://github.com/demopark/sequelize-docs-Zh-CN)
- [koa2 使用 koa-body 代替 koa-bodyparser 和 koa-multer](http://www.ptbird.cn/koa-body.html)
- [是时候抛弃 Postman 了，试试直接在 VS Code 上调试并共享你的 REST API 调用](https://mp.weixin.qq.com/s/gD5aH1JEcqm3eGdA4GZM4w)
