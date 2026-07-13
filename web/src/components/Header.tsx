/**
 * 文件作用：全站顶部导航和移动端菜单。
 * 文件交互：由 App.tsx 调用，并通过 onHome/onSelect/onLogin 回调通知 App 切换页面状态。
 * 交互方式：组件维护移动端菜单开关，点击模块或登录按钮后关闭菜单并切换页面。
 */
import { useState } from 'react'
type Key = 'frontend' | 'backend' | 'ai'
export function Header({ onHome, onSelect, onLogin, onLogout, active, loginActive, username }: { onHome: () => void; onSelect: (key: Key) => void; onLogin: () => void; onLogout: () => void; active: Key | null; loginActive: boolean; username: string | null }) {
  const [open, setOpen] = useState(false)
  const choose = (key: Key) => { onSelect(key); setOpen(false) }
  const login = () => { onLogin(); setOpen(false) }
  return <header className="site-header"><button className="brand" onClick={onHome}><span>Q</span><b>Quality<br />to Code</b></button><button className="menu" onClick={() => setOpen(!open)} aria-label="切换导航">{open ? '×' : '☰'}</button><nav className={open ? 'open' : ''}><button className={!active && !loginActive ? 'active' : ''} onClick={onHome}>首页</button><button onClick={() => choose('frontend')}>前端</button><button onClick={() => choose('backend')}>后端</button><button onClick={() => choose('ai')}>AI 辅助</button>{username ? <><span className="session-user">{username}</span><button className="login-button" onClick={onLogout}>退出</button></> : <button className={loginActive ? 'login-button active' : 'login-button'} onClick={login}>登录</button>}</nav></header>
}
