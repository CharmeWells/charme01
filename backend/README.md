# 认证 API

该目录提供 FastAPI 认证服务，与根目录 `compose.yml` 中的 PostgreSQL 交互。

## 启动与检查

```powershell
docker compose up -d --build api
docker compose ps
docker compose logs -f api
```

启动后访问：

- 健康检查：<http://localhost:8000/api/health>
- OpenAPI 文档：<http://localhost:8000/docs>

前端开发服务器会把 `/api` 代理到 `http://localhost:8000`。部署到独立域名时，通过 `VITE_API_URL` 指定公开 API 地址。

## 安全设计

- 用户名长度 3～32，只允许字母、数字、下划线和连字符。
- 密码长度 8～128，使用 Argon2 单向哈希，数据库不保存明文。
- JWT 默认 24 小时过期，只通过 `HttpOnly`、`SameSite=Lax` Cookie 传输。
- 登录失败统一返回“用户名或密码错误”，并对不存在的用户执行虚拟哈希校验，减少时序泄露。
- SQL 使用参数化查询，唯一用户名由数据库约束兜底。
