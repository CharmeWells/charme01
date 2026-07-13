/**
 * 文件作用：显示全站品牌、标语和动态版权年份。
 * 文件交互：由 App.tsx 在所有页面内容之后渲染；视觉规则来自 global.css 的 footer 选择器。
 * 交互方式：无状态、无回调，第 6 行根据当前年份生成版权信息。
 */
export function Footer() { return <footer><div className="brand footer-logo"><span>Q</span><b>Quality<br />to Code</b></div><p>从测试出发，向创造前进。</p><p>© {new Date().getFullYear()} TEST → DEV</p></footer> }
