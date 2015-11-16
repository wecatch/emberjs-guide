# 构建 emberjs 应用程序

构建 ember app 推荐使用官方出品的构建工具 [ember-cli](http://www.embercli.com)


## 安装 ember-cli

ember-cli 需要版本在 0.12 之上的 nodejs 环境

```

npm install -g ember-cli

```

## 构建第一个 ember 项目

在命令行下面执行 `ember -h` 可以看到所有的 ember 命令，构建项目目录使用
`ember new ` 命令。执行 `ember new my-emberapp` 之后，ember-cli 会创建一个
ember app 工程，并且自动安装所有依赖。

安装完成之后，进入 `my-emberapp` 目录，执行 `ember server` ，打开浏览器访问 `http://localhost:4200` 将看到 ember app 已经构建成功了
