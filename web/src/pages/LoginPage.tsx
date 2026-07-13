import { FormEvent, useState } from 'react'

export function LoginPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="login-page">
      <section className="login-panel login-intro" aria-labelledby="login-title">
        <a className="brand login-brand" href="/" aria-label="返回 North 首页">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>North</span>
        </a>

        <div className="login-intro-copy">
          <p className="eyebrow eyebrow-light"><span /> Welcome back</p>
          <h1 id="login-title">继续构建<br /><em>更好的产品。</em></h1>
          <p>登录你的工作空间，继续管理项目、组件与团队协作。</p>
        </div>

        <div className="login-orbit" aria-hidden="true">
          <span />
          <span />
          <strong>N</strong>
        </div>

        <p className="login-copyright">© {new Date().getFullYear()} North Studio</p>
      </section>

      <section className="login-panel login-form-panel" aria-label="账户登录">
        <a className="back-link" href="/">← 返回首页</a>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-heading">
            <p className="eyebrow"><span /> 账户登录</p>
            <h2>欢迎回来</h2>
            <p>请输入你的账户信息以继续。</p>
          </div>

          <label className="form-field">
            <span>邮箱地址</span>
            <input type="email" name="email" placeholder="name@example.com" autoComplete="email" required />
          </label>

          <label className="form-field">
            <span className="field-label-row">
              <span>密码</span>
              <a href="#forgot-password">忘记密码？</a>
            </span>
            <input type="password" name="password" placeholder="请输入密码" autoComplete="current-password" minLength={6} required />
          </label>

          <label className="remember-row">
            <input type="checkbox" name="remember" />
            <span>保持登录状态</span>
          </label>

          <button className="button login-submit" type="submit">
            登录 <span>→</span>
          </button>

          {submitted && (
            <p className="form-message" role="status">
              登录界面已就绪；接入后端认证接口后即可完成真实登录。
            </p>
          )}

          <p className="signup-copy">还没有账户？ <a href="#register">创建账户</a></p>
        </form>
      </section>
    </main>
  )
}
