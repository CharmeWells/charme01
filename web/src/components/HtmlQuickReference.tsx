import { ReactNode } from 'react'

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="docs-code"><code>{children.trim()}</code></pre>
  )
}

function Section({ id, number, title, children }: { id?: string; number?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="docs-section">
      <header className="docs-section-heading">
        {number && <span>{number}</span>}
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  )
}

const documentTags = [
  ['DOCTYPE', '声明 HTML 版本', '所有页面必须'],
  ['html', '根标签', '包裹整个页面'],
  ['head', '页面配置', 'CSS、JS、SEO'],
  ['title', '网页标题', '浏览器标签显示'],
  ['meta', '页面信息', '编码、SEO、移动端适配'],
  ['link', '引入资源', 'CSS 文件'],
  ['style', '内部 CSS', '页面样式'],
  ['script', 'JavaScript', '交互功能'],
]

const semanticTags = [
  ['header', '页面头部'], ['nav', '导航栏'], ['main', '主体'], ['section', '区域'],
  ['article', '文章'], ['aside', '侧边栏'], ['footer', '底部'],
]

export function HtmlQuickReference() {
  return (
    <main className="docs-main">
      <section className="docs-hero">
        <div>
          <p className="eyebrow"><span /> Web 前端基础</p>
          <h1>HTML<br /><em>基础速查文档</em></h1>
          <p className="docs-lead">从文档结构到业务表单，一页掌握前端开发中最常用的 HTML 标签与实践。</p>
        </div>
        <aside className="docs-hero-card" aria-label="文档概览">
          <span>QUICK REFERENCE</span>
          <strong>HTML</strong>
          <div><span>11 个章节</span><span>基础篇</span></div>
        </aside>
      </section>

      <div className="docs-layout">
        <aside className="docs-toc" aria-label="文档目录">
          <p>本页目录</p>
          <a href="#structure">HTML 文档结构</a>
          <a href="#tags">核心标签分类</a>
          <a href="#forms">表单</a>
          <a href="#semantic">语义化标签</a>
          <a href="#priority">标签优先级</a>
          <a href="#roadmap">学习路线</a>
          <a href="#checklist">开发检查清单</a>
        </aside>

        <article className="docs-content">
          <Section id="structure" number="01" title="HTML 文档结构">
            <h3>基础模板</h3>
            <CodeBlock>{`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>网页标题</title>
</head>
<body>
  页面内容
</body>
</html>`}</CodeBlock>
          </Section>

          <Section id="tags" number="02" title="HTML 核心标签分类">
            <h3>1. 文档信息标签</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>标签</th><th>作用</th><th>常用场景</th></tr></thead>
                <tbody>{documentTags.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>

            <h3>2. 文本标签</h3>
            <h4>标题</h4>
            <CodeBlock>{`<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>`}</CodeBlock>
            <ul><li>h1 最大，h6 最小</li><li>一个页面通常只使用一个 h1</li></ul>

            <h4>段落</h4>
            <CodeBlock>{`<p>网页正文内容</p>`}</CodeBlock>

            <h4>文本强调</h4>
            <CodeBlock>{`<strong>重要内容</strong>
<b>加粗文字</b>
<i>斜体文字</i>
<del>删除文字</del>`}</CodeBlock>

            <h4>换行与分割</h4>
            <CodeBlock>{`<br>
<hr>`}</CodeBlock>

            <h3>3. 页面布局标签</h3>
            <div className="docs-two-column">
              <div className="docs-note"><code>div</code><p>最常用的块级布局容器，独占一行，通常配合 CSS 使用。</p></div>
              <div className="docs-note"><code>span</code><p>常用的行内容器，不主动换行，适合修改局部样式。</p></div>
            </div>
            <CodeBlock>{`<div>内容区域</div>
<span>文字内容</span>`}</CodeBlock>

            <h3>4. 链接与图片</h3>
            <h4>超链接</h4>
            <CodeBlock>{`<a href="https://example.com">访问网站</a>

<a href="https://example.com" target="_blank">
  新窗口打开
</a>`}</CodeBlock>
            <div className="table-wrap"><table><thead><tr><th>属性</th><th>作用</th></tr></thead><tbody><tr><td>href</td><td>链接地址</td></tr><tr><td>target</td><td>打开方式</td></tr></tbody></table></div>

            <h4>图片</h4>
            <CodeBlock>{`<img src="logo.png" alt="logo">`}</CodeBlock>
            <div className="table-wrap"><table><thead><tr><th>属性</th><th>说明</th></tr></thead><tbody><tr><td>src</td><td>图片地址</td></tr><tr><td>alt</td><td>图片描述</td></tr><tr><td>width</td><td>宽度</td></tr><tr><td>height</td><td>高度</td></tr></tbody></table></div>

            <h3>5. 列表</h3>
            <div className="docs-two-column">
              <div><h4>无序列表</h4><CodeBlock>{`<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`}</CodeBlock></div>
              <div><h4>有序列表</h4><CodeBlock>{`<ol>
  <li>安装环境</li>
  <li>创建项目</li>
</ol>`}</CodeBlock></div>
            </div>

            <h3>6. 表格</h3>
            <CodeBlock>{`<table>
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>20</td>
  </tr>
</table>`}</CodeBlock>
            <div className="table-wrap"><table><thead><tr><th>标签</th><th>作用</th></tr></thead><tbody>{[['table','表格'],['tr','行'],['th','表头'],['td','单元格'],['thead','表头区域'],['tbody','主体区域'],['tfoot','底部区域']].map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td></tr>)}</tbody></table></div>
          </Section>

          <Section id="forms" number="07" title="表单（业务开发重点）">
            <h3>form 与 input</h3>
            <CodeBlock>{`<form>
  <input type="text">
  <input type="password">
  <input type="radio">
  <input type="checkbox">
  <input type="date">
  <input type="file">
</form>`}</CodeBlock>

            <div className="docs-two-column">
              <div><h4>多行输入</h4><CodeBlock>{`<textarea></textarea>`}</CodeBlock></div>
              <div><h4>下拉选择</h4><CodeBlock>{`<select>
  <option>北京</option>
  <option>上海</option>
</select>`}</CodeBlock></div>
            </div>

            <h4>按钮</h4>
            <CodeBlock>{`<button type="submit">提交</button>`}</CodeBlock>
          </Section>

          <Section id="semantic" number="08" title="HTML5 语义化标签">
            <div className="table-wrap"><table><thead><tr><th>标签</th><th>作用</th></tr></thead><tbody>{semanticTags.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td></tr>)}</tbody></table></div>
            <CodeBlock>{`<header>网站 Logo</header>
<nav>菜单</nav>
<main>
  内容
</main>
<footer>版权信息</footer>`}</CodeBlock>
          </Section>

          <Section number="09" title="多媒体标签">
            <div className="docs-two-column">
              <div><h4>音频</h4><CodeBlock>{`<audio controls>
  <source src="music.mp3">
</audio>`}</CodeBlock></div>
              <div><h4>视频</h4><CodeBlock>{`<video controls>
  <source src="video.mp4">
</video>`}</CodeBlock></div>
            </div>
          </Section>

          <Section id="priority" number="10" title="HTML 高频标签优先级">
            <div className="priority-grid">
              <div><span>★★★★★</span><h3>必须熟练</h3><p>div · span · input · button · form · a · img · table · ul · li</p></div>
              <div><span>★★★★</span><h3>工作常用</h3><p>header · nav · main · section · article · footer · select · textarea</p></div>
              <div><span>★★★</span><h3>了解即可</h3><p>audio · video · dl · figure · canvas</p></div>
            </div>
          </Section>

          <Section id="roadmap" number="11" title="测试工程师转开发学习路线">
            <ol className="roadmap-list">
              <li><span>阶段 01</span><div><h3>HTML 结构</h3><p>目标：看懂网页结构，能写简单页面。</p><code>html · head · body · div · span</code></div></li>
              <li><span>阶段 02</span><div><h3>业务页面</h3><p>目标：可以开发登录页、表单页面、管理后台页面。</p><code>form · input · button · table · select</code></div></li>
              <li><span>阶段 03</span><div><h3>企业项目</h3><p>目标：看懂 Vue / React 项目页面结构。</p><code>header · nav · main · section · footer</code></div></li>
            </ol>
          </Section>

          <Section id="checklist" title="HTML 开发检查清单">
            <ul className="checklist">
              {['页面是否有 DOCTYPE','是否设置 UTF-8 编码','是否有 title','图片是否添加 alt','表单是否有 label','button 类型是否正确','标签是否语义化','是否存在未闭合标签'].map((item) => <li key={item}><span>□</span>{item}</li>)}
            </ul>
          </Section>

          <section className="next-section">
            <p className="eyebrow eyebrow-light"><span /> 下一阶段学习</p>
            <h2>继续拓展你的<br />前端知识地图。</h2>
            <ol><li>CSS 属性速查文档</li><li>JavaScript DOM 操作文档</li><li>Vue3 页面开发速查文档</li><li>测试工程师转前端实战项目</li></ol>
          </section>
        </article>
      </div>
    </main>
  )
}
