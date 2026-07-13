# Render 后端与 PostgreSQL 部署

仓库根目录的 `render.yaml` 是 Render Blueprint。它会自动创建：

- `quality-to-code-api`：Docker 运行的 FastAPI 服务
- `quality-to-code-db`：PostgreSQL 18 数据库
- 数据库内部连接变量和随机 JWT 密钥
- HTTPS Cookie、跨域来源和健康检查
- API 启动时的幂等数据库迁移

## 首次部署

1. 登录 Render，选择 **New → Blueprint**。
2. 连接 GitHub 仓库 `CharmeWells/charme01`，选择根目录的 `render.yaml`。
3. 确认套餐与 Region 后创建 Blueprint。
4. 部署成功后记录 API 地址，例如 `https://quality-to-code-api.onrender.com`。
5. 在 GitHub 仓库 **Settings → Secrets and variables → Actions → Variables** 新建：

   ```text
   VITE_API_URL=https://quality-to-code-api.onrender.com
   ```

6. 重新运行 GitHub Pages 工作流，或向 `main` 推送一次提交。

## 验证

访问以下地址，将示例域名替换为实际 API 地址：

```text
https://quality-to-code-api.onrender.com/api/health
https://quality-to-code-api.onrender.com/docs
```

健康检查应返回 `{"status":"ok"}`。随后在 GitHub Pages 网站注册账号，刷新页面确认登录状态仍存在，再测试退出登录。

## 自定义域名

GitHub Pages 与 `onrender.com` 属于不同站点。仓库已为这种情况设置 `SameSite=None; Secure`，但部分浏览器仍可能阻止第三方 Cookie。生产环境建议配置同一主域名：

```text
www.example.com  -> 前端
api.example.com  -> Render API
```

配置自定义域名后，将 Render 的 `CORS_ORIGINS` 改为前端完整来源，并将 GitHub 的 `VITE_API_URL` 改为 API 自定义域名。
