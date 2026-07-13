import { useState } from 'react'
type Key = 'frontend' | 'backend' | 'ai'
export function Header({ onHome, onSelect, active }: { onHome: () => void; onSelect: (key: Key) => void; active: Key | null }) {
  const [open, setOpen] = useState(false)
  const choose = (key: Key) => { onSelect(key); setOpen(false) }
  return <header className="site-header"><button className="brand" onClick={onHome}><span>Q</span><b>Quality<br />to Code</b></button><button className="menu" onClick={() => setOpen(!open)} aria-label="切换导航">{open ? '×' : '☰'}</button><nav className={open ? 'open' : ''}><button className={!active ? 'active' : ''} onClick={onHome}>首页</button><button onClick={() => choose('frontend')}>前端</button><button onClick={() => choose('backend')}>后端</button><button onClick={() => choose('ai')}>AI 辅助</button><a href="#modules">开始学习 ↗</a></nav></header>
}
