/**
 * 文件作用：配置 Vite 开发服务器、React 编译插件和 GitHub Pages 资源路径。
 * 文件交互：package.json 的 dev/build/preview 命令会读取本文件；部署工作流构建时同样使用它。
 * 交互方式：第 10 行注册 React 插件；第 11 行设置 /charme01/ 基础路径；第 13 行固定本地端口 5173。
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/charme01/',
  server: {
    port: 5173,
  },
})
