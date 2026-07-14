# charme01 项目交接文档

> 用途：在新的 Codex 对话中继续开发时，将本文件提供给 Codex，并让它先检查仓库实际状态。

## 1. 项目位置与 Git

- 本地仓库：`D:\GitHub\charme01`
- GitHub：<https://github.com/CharmeWells/charme01>
- 默认分支：`main`
- 当前已知提交：`42d978c`
- Git 用户：`CharmeWells`
- Git 邮箱：`2789048798@qq.com`
- GitHub CLI：已登录 `CharmeWells`

新对话开始后先运行：

```powershell
git status --short --branch
git remote -v
git pull --ff-only origin main
```

## 2. 项目主题

网站围绕“测试工程师从零开始成为开发工程师”展开，首页作为学习导航，包含三大模块：

- 前端开发
- 后端开发
- AI 辅助开发

内容采用多级导航：模块 → 课程阶段 → 知识点 → 学习重点 → 具体教程。

## 3. 技术结构

### 前端

- React 18
- TypeScript
- Vite
- 目录：`web/`
- GitHub Pages 自动部署

主要文件：

- `web/src/App.tsx`：页面状态和多级学习导航
- `web/src/components/Header.tsx`：首页、模块、登录和会话导航
- `web/src/pages/LoginPage.tsx`：注册与登录表单
- `web/src/services/auth.ts`：认证 API 客户端
- `web/src/styles/global.css`：全站样式
- `web/vite.config.ts`：Vite、Pages 基础路径和本地 API 代理

### 后端

- FastAPI
- Psycopg 3 连接池
- PostgreSQL 18
- Argon2 密码哈希
- PyJWT 登录会话
- Docker
- 目录：`backend/`

主要接口：

- `POST /api/auth/register`：创建账号并建立会话
- `POST /api/auth/login`：验证用户名和密码
- `GET /api/auth/me`：读取当前用户
- `POST /api/auth/logout`：退出登录
- `GET /api/health`：API 和数据库健康检查

安全设计：

- 数据库只保存 Argon2 密码哈希，不保存明文密码
- JWT 放在 `HttpOnly` Cookie 中
- 线上使用 `Secure` 和 `SameSite=None`
- 用户名唯一约束
- SQL 使用参数化查询
- 登录失败统一返回“用户名或密码错误”

### 数据库

核心表：

- `users`
- `learning_progress`
- `learning_notes`

`users` 主要字段：

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | bigint | 自动生成主键 |
| `username` | text | 唯一用户名 |
| `display_name` | text | 显示名称，注册时默认等于用户名 |
| `password_hash` | text | Argon2 密码哈希 |
| `created_at` | timestamptz | 创建时间 |
| `updated_at` | timestamptz | 更新时间 |

数据库脚本：

- `database/init/001_schema.sql`：本地全新数据库初始化
- `database/init/002_rename_email_to_username.sql`：旧数据库字段迁移
- `backend/migrations/001_schema.sql`：线上 API 启动时执行的幂等迁移

## 4. 已完成功能

- 首页导航至前端、后端、AI 辅助三大模块
- 每个模块具有具体课程内容
- 三级知识点导航跳转到独立内容页
- 四级学习重点跳转到详细教程页
- 首页登录按钮
- 注册表单：用户名、密码、确认密码
- 必填校验、密码长度校验、两次密码一致性校验
- 登录与注册模式切换
- 密码和确认密码独立显示/隐藏按钮
- 真实后端注册、登录、会话恢复和退出
- PostgreSQL 用户数据持久化
- Docker 本地开发环境
- GitHub Pages 前端自动部署
- Render FastAPI 与 PostgreSQL 自动部署

## 5. 线上环境

- 网站：<https://charmewells.github.io/charme01/>
- API：<https://quality-to-code-api.onrender.com>
- API 健康检查：<https://quality-to-code-api.onrender.com/api/health>
- OpenAPI：<https://quality-to-code-api.onrender.com/docs>

Render 资源：

- Web Service：`quality-to-code-api`
- PostgreSQL：`quality-to-code-db`
- Blueprint：仓库根目录 `render.yaml`

GitHub 仓库 Actions Variable：

```text
VITE_API_URL=https://quality-to-code-api.onrender.com
```

免费 Render 实例长时间无请求会休眠，首次请求可能等待约 50 秒。

## 6. 本地启动

进入新仓库：

```powershell
cd D:\GitHub\charme01
```

启动 PostgreSQL、Adminer 和 API：

```powershell
docker compose up -d --build
docker compose ps
```

启动前端：

```powershell
cd web
npm.cmd install
npm.cmd run dev
```

本地地址：

- 前端：<http://localhost:5173>
- API：<http://localhost:8000>
- API 文档：<http://localhost:8000/docs>
- Adminer：<http://localhost:8080>

本地 `.env` 被 Git 忽略。如文件缺失：

```powershell
Copy-Item .env.example .env
```

然后修改 `.env` 中的数据库密码和 `JWT_SECRET`。

## 7. 构建与检查

```powershell
cd D:\GitHub\charme01\web
npm.cmd run build
```

```powershell
cd D:\GitHub\charme01
docker compose ps
docker compose logs --tail 50 api
git diff --check
git status --short --branch
```

## 8. 部署流程

### 前端

推送或合并到 `main` 后，`.github/workflows/deploy-pages.yml` 自动构建并部署 GitHub Pages。

手动触发：

```powershell
gh workflow run deploy-pages.yml --repo CharmeWells/charme01 --ref main
```

### 后端

Render Blueprint 监听 `main`。合并后自动重建 API；API 启动前运行幂等数据库迁移。

详细说明见：

- `DEPLOYMENT.md`
- `backend/README.md`
- `database/README.md`

## 9. 开发注意事项

- 不要提交根目录 `.env`。
- 不要把生产数据库 URL、JWT 密钥或用户密码写入代码。
- 不要在浏览器保存明文 JWT。
- 修改数据库结构时，同时考虑本地初始化脚本和线上幂等迁移。
- GitHub Pages 是静态托管，后端必须继续部署在 Render 或其他服务器。
- GitHub Pages 与 Render 跨站 Cookie 可能被部分浏览器限制；正式产品建议使用同一主域名，例如 `www.example.com` 和 `api.example.com`。
- 修改后至少运行前端构建和相关 API 测试。

## 10. 新对话启动提示词

可在新 Codex 对话中发送：

```text
请先阅读 D:\GitHub\charme01\PROJECT_HANDOFF.md，并检查当前 Git 状态、main 与远程分支、Docker 容器和线上健康接口。不要重复已经完成的功能。之后继续处理我的新需求；修改完成后运行与风险相匹配的构建和测试。
```

## 11. 下一步建议

- 增加用户个人中心
- 将学习进度和学习笔记接入现有数据库表
- 增加修改密码和找回密码流程
- 增加登录频率限制、审计日志和 CSRF 防护
- 为后端增加自动化测试与 GitHub Actions
- 配置自定义域名，减少跨站 Cookie 限制
