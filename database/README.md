# PostgreSQL 本地开发环境

## 启动

```powershell
docker compose up -d
docker compose ps
```

数据库连接：

- Host：`localhost`
- Port：`5432`
- Database：`quality_to_code`
- User：`app_user`
- Password：读取仓库根目录 `.env`

浏览器管理界面：<http://localhost:8080>

Adminer 登录时，服务器填写 `postgres`，不要填写 `localhost`。

## 常用命令

```powershell
# 查看数据库日志
docker compose logs -f postgres

# 在容器中打开 psql
docker compose exec postgres psql -U app_user -d quality_to_code

# 停止服务但保留数据
docker compose down

# 删除本地数据库并重新执行初始化 SQL
docker compose down -v
docker compose up -d
```

`.env` 包含本地密码，已被 Git 忽略；只有 `.env.example` 可以提交。
