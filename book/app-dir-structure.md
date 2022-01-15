# ember app 目录结构介绍

```bash
├── README.md
├── app
│   ├── adapters
│   ├── app.js
│   ├── components
│   ├── controllers
│   ├── helpers
│   ├── index.html
│   ├── models
│   ├── router.js
│   ├── routes
│   ├── serializers
│   ├── styles
│   └── templates
├── config
│   ├── ember-cli-update.json
│   ├── environment.js
│   ├── optional-features.json
│   └── targets.js
├── dist
│   ├── api
│   ├── assets
│   ├── ember-welcome-page
│   ├── index.html
│   ├── robots.txt
│   ├── testem.js
│   └── tests
├── ember-cli-build.js
├── package-lock.json
├── package.json
├── public
│   ├── api
│   ├── assets
│   └── robots.txt
├── testem.js
tests
├── acceptance
│   └── super-rentals-test.js
├── helpers
├── index.html
├── integration
│   └── components
├── test-helper.js
└── unit
    ├── adapters  // ember-data adapter
    ├── models  // model
    ├── routes  // route 
    └── serializers // ember-data serializer
└── vendor
```

秉承`约定优于配置`的设计理念，ember app 的目录结构，文件命名，变量名由官方做了统一规范，每个文件名称以及目录都可以用 ember-cli 命令来生成:

```bash
ember generate --help
```

因此开发者无需考虑包目录结构，随着项目复杂性变高，文件变多，也无需为制定各种命名规范以及划分各种包的层级一级结构而付出额外的成本，专心于业务功能的开发即可，省心省力。

