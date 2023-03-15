# Create By CMCLI

## 开发

```
npm install
npm run dev
```

## 构建

```
npm run build
```

## 目录结构

- 单页

1. App.tsx 是入口文件
2. router 文件夹是路由信息
3. layout 文件的 Nav 组件引入 router 的信息当做菜单
4. pages 是页面目录

```
├── public
│   ├── index.html
├── src
│   ├── assets
│   ├── App.tsx
│   ├── components
│   ├── pages
│   ├── common
│   │   ├── api
│   │   └── styles
│   ├── layout
│   ├── index.tsx
│   ├── router
│   ├── store
│   ├── index.scss
│   ├── widgets
│   │   └── request.ts
```
