import { useState } from 'react'

const links = [
  { label: '文档结构', href: '#structure' },
  { label: '核心标签', href: '#tags' },
  { label: '学习路线', href: '#roadmap' },
  { label: '检查清单', href: '#checklist' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header docs-header">
      <a className="brand" href="#top" aria-label="North 首页">
        <span className="brand-mark" aria-hidden="true">N</span>
        <span>North Docs</span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">切换导航</span>
      </button>

      <nav id="site-navigation" className={open ? 'site-nav is-open' : 'site-nav'}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="button button-small" href="/login" onClick={() => setOpen(false)}>
          登录
        </a>
      </nav>
    </header>
  )
}
