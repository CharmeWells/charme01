/**
 * 文件作用：React 应用的浏览器入口。
 * 文件交互：第 8 行导入 App，第 9 行导入全局样式；第 11～16 行把 App 渲染到 index.html 的 #root。
 * 交互方式：Vite 从 index.html 加载本文件，ReactDOM 再把组件树挂载到真实 DOM。
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
