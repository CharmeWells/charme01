/**
 * 文件作用：提供注册与登录表单，并完成用户名、密码和确认密码的浏览器端校验。
 * 文件交互：由 App.tsx 渲染，通过 auth.ts 调用后端，通过回调同步登录用户并返回首页。
 * 交互方式：注册检查三个必填项及密码一致性；登录检查用户名和密码；服务端错误显示在表单底部。
 */
import { FormEvent, useState } from 'react'
import { authApi, User } from '../services/auth'

type Fields = 'username' | 'password' | 'confirmPassword'
type Errors = Partial<Record<Fields, string>>

export function LoginPage({ onBack, onAuthenticated }: { onBack: () => void; onAuthenticated: (user: User) => void }) {
  const [mode, setMode] = useState<'register' | 'login'>('register')
  const [values, setValues] = useState<Record<Fields, string>>({ username: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const update = (field: Fields, value: string) => {
    setValues(current => ({ ...current, [field]: value }))
    setErrors(current => ({ ...current, [field]: undefined }))
    setMessage('')
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Errors = {}
    if (!values.username.trim()) nextErrors.username = '请输入用户名'
    if (!values.password) nextErrors.password = '请输入密码'
    if (mode === 'register' && !values.confirmPassword) nextErrors.confirmPassword = '请再次输入密码'
    else if (mode === 'register' && values.password !== values.confirmPassword) nextErrors.confirmPassword = '两次输入的密码不一致'
    if (mode === 'register' && values.password && values.password.length < 8) nextErrors.password = '密码至少需要 8 个字符'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSubmitting(true)
    try {
      const result = mode === 'register' ? await authApi.register(values.username.trim(), values.password, values.confirmPassword) : await authApi.login(values.username.trim(), values.password)
      onAuthenticated(result.user)
      onBack()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '请求失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  return <main className="login-page">
    <section className="login-intro">
      <button onClick={onBack}>← 返回首页</button><p>ACCOUNT / GET STARTED</p>
      <h1>保存进度，<br />继续你的开发之路。</h1>
      <p>创建学习账号后，可用于记录课程进度、学习笔记与实践成果。</p>
    </section>
    <section className="login-panel">
      <form onSubmit={submit} noValidate>
        <div className="auth-tabs"><button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setErrors({}); setMessage('') }}>创建账号</button><button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setErrors({}); setMessage('') }}>已有账号登录</button></div>
        <p>{mode === 'register' ? 'CREATE ACCOUNT' : 'WELCOME BACK'}</p><h2>{mode === 'register' ? '创建账号' : '登录账号'}</h2>
        <label htmlFor="username">用户名 <span>*</span></label>
        <input id="username" name="username" autoComplete="username" value={values.username} onChange={event => update('username', event.target.value)} aria-invalid={Boolean(errors.username)} aria-describedby={errors.username ? 'username-error' : undefined} />
        {errors.username && <small id="username-error" className="field-error">{errors.username}</small>}
        <label htmlFor="password">密码 <span>*</span></label>
        <div className="password-field"><input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} value={values.password} onChange={event => update('password', event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} /><button type="button" onClick={() => setShowPassword(current => !current)} aria-label={showPassword ? '隐藏密码' : '显示密码'} aria-pressed={showPassword}>{showPassword ? '隐藏' : '显示'}</button></div>
        {errors.password && <small id="password-error" className="field-error">{errors.password}</small>}
        {mode === 'register' && <><label htmlFor="confirm-password">确认密码 <span>*</span></label><div className="password-field"><input id="confirm-password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" value={values.confirmPassword} onChange={event => update('confirmPassword', event.target.value)} aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined} /><button type="button" onClick={() => setShowConfirmPassword(current => !current)} aria-label={showConfirmPassword ? '隐藏确认密码' : '显示确认密码'} aria-pressed={showConfirmPassword}>{showConfirmPassword ? '隐藏' : '显示'}</button></div>{errors.confirmPassword && <small id="confirm-password-error" className="field-error">{errors.confirmPassword}</small>}</>}
        <button className="primary" type="submit" disabled={submitting}>{submitting ? '正在提交…' : mode === 'register' ? '创建账号 →' : '登录 →'}</button>
        {message && <p className="form-message error" role="alert">{message}</p>}
      </form>
    </section>
  </main>
}
