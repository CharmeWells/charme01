export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">N</span>
        <span>North</span>
      </div>
      <p>为清晰、快速、可靠的 Web 产品而生。</p>
      <p>© {new Date().getFullYear()} North Studio</p>
    </footer>
  )
}
