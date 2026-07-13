# North Web Starter

一个基于 React、TypeScript 和 Vite 的轻量 Web 项目骨架，包含响应式首页、基础组件拆分与完整构建配置。

## 开始使用

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 目录结构

```text
src/
├── components/     # 可复用组件
├── styles/         # 全局样式与设计变量
├── App.tsx         # 页面结构
└── main.tsx        # 应用入口
```
<!--
文件作用：项目的人类可读说明文档。
文件交互：不参与构建；开发者通过这里了解 web 子项目的启动、构建与部署方式。
交互方式：文档中的命令调用 package.json scripts，部署说明对应 .github/workflows/deploy-pages.yml。
-->
