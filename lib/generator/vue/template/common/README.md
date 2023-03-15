# <%= projectName %> Create By CMCLI
## 开发
```
yarn dev
yarn dev:staging
yarn dev:production
```
注：prettier会对格式进行校验，控制台中显示警告信息。commit时自动格式化，但建议开发人员尽量自己手动修改警告。
## 构建
```
yarn build:test
yarn build:staging
yarn build:production
```
## 提交代码
```
yarn commit
```
## 生成changelog
```
yarn changelog
```
## 目录结构
<%_ if(spa) { _%>
- 单页
```
├── public
├── index.html
├── src
│   ├── assets
│   ├── app.vue
│   ├── components
│   ├── common
│   │   ├── api
│   │   └── styles
│   ├── layouts
│   ├── main.ts
│   ├── router
│   ├── store
│   ├── style.scss
│   ├── widgets
│   │   └── request.ts
```
<%_ } else { _%>
- 多页项目
- 目录结构src/pages/xxx/xxx.html
- src/pages 下支持一级目录，多个页面时html文件放在一级目录下，资源文件可创建在相应二级目录下
- 编译入口匹配 src/pages 目录下html文件
- <font color="red">文件名作为编译 chunk 名，不要使用 index.html 这样的名字!!!</font>
```
├── public
├── src
│   ├── pages
│   │   ├── projectA         项目A
│   │   │  ├── assets     项目A资源
│   │   │  ├── components 项目A组件
│   │   │  ├── pageA.html 页面A
│   │   │  ├── app.vue
│   │   │  ├── main.ts
│   │   │  ├── style.scss
│   │   ├── pageB         项目B，包含页面B、页面C两个页面
│   │   │  ├── api        项目B接口
│   │   │  ├── components 项目B组件
│   │   │  ├── pageB      页面B资源
│   │   │  │   ├── app.vue
│   │   │  │   ├── main.ts
│   │   │  │   ├── style.scss
│   │   │  ├── pageC      页面C资源
│   │   │  │   ├── app.vue
│   │   │  │   ├── main.ts
│   │   │  │   ├── style.scss
│   │   │  ├── pageB.html 页面B
│   │   │  ├── pageC.html 页面C
│   ├── common            公用资源
│   │   ├── api
│   │   ├── components
│   │   └── styles
│   ├── widgets           工具
│   │   ├── request.ts
│   │   ├── utils.ts
```
<%_ } _%>