import { useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

type ModuleKey = 'frontend' | 'backend' | 'ai'

const modules = {
  frontend: {
    number: '01', label: 'FRONTEND', title: '前端开发', subtitle: '把测试视角，变成用户看得见的产品。',
    color: '#c8ff62', skills: ['HTML / CSS', 'JavaScript', 'React', '工程化'],
    intro: '你已经擅长发现界面的问题。现在换一个视角：从组件、状态和交互开始，亲手把需求变成可用的页面。',
    stages: [
      ['01 · 基础语法', '读懂页面的骨架与样式', 'HTML、CSS、响应式布局、浏览器 DevTools'],
      ['02 · 编程思维', '让页面真正动起来', 'JavaScript、DOM、异步请求、TypeScript'],
      ['03 · 项目开发', '掌握现代前端工作流', 'React、组件化、状态管理、Vite'],
    ],
    project: '测试用例管理台', projectDesc: '从登录、用例列表到数据看板，完成一个响应式 React 应用，并为关键交互补充组件测试。',
    outcomes: ['能从设计稿独立还原页面', '能调用 API 并处理异常状态', '能拆分可复用的业务组件', '能完成构建、部署与调试'],
  },
  backend: {
    number: '02', label: 'BACKEND', title: '后端开发', subtitle: '从验证接口，到设计可靠的服务。',
    color: '#ffb86b', skills: ['Python', 'API 设计', '数据库', '服务部署'],
    intro: '接口测试让你熟悉输入、输出和边界条件。下一步是理解数据如何流动，并构建稳定、可观测、可维护的服务。',
    stages: [
      ['01 · 编程基础', '用代码表达业务逻辑', 'Python、数据结构、异常处理、Git'],
      ['02 · 数据与接口', '构建可被前端使用的服务', 'HTTP、REST API、SQL、权限认证'],
      ['03 · 工程实践', '让服务稳定地运行', 'FastAPI、日志、缓存、Docker、CI/CD'],
    ],
    project: '缺陷追踪 API', projectDesc: '设计缺陷、用户和项目数据模型，实现鉴权、筛选、分页与操作日志，并完成容器化部署。',
    outcomes: ['能设计清晰的 REST API', '能建立合理的数据模型', '能处理鉴权、异常与并发', '能部署并定位线上问题'],
  },
  ai: {
    number: '03', label: 'AI ASSISTED', title: 'AI 辅助开发', subtitle: '让 AI 加速你，但由你掌控质量。',
    color: '#a8b8ff', skills: ['提示工程', '代码协作', 'RAG', '智能体'],
    intro: '测试工程师最懂“不能盲信”。学习把 AI 当作结对伙伴：拆解任务、提供上下文、审查结果，再把能力嵌入真实产品。',
    stages: [
      ['01 · 高效协作', '建立可靠的人机工作流', '任务拆解、上下文、提示词、代码审查'],
      ['02 · AI 应用', '把模型能力接入产品', '模型 API、结构化输出、工具调用、RAG'],
      ['03 · 质量保障', '评估并约束不确定性', '评测集、幻觉检测、护栏、成本与延迟'],
    ],
    project: 'AI 测试助手', projectDesc: '根据需求生成测试点，关联知识库回答问题，并用评测集持续衡量答案质量与稳定性。',
    outcomes: ['能用 AI 提升开发效率', '能构建基础的模型应用', '能设计 RAG 知识库流程', '能评估质量、成本与风险'],
  },
} satisfies Record<ModuleKey, object>

function Home({ onSelect }: { onSelect: (key: ModuleKey) => void }) {
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <p className="kicker"><span>TEST → DEV</span> 转型学习地图</p>
        <h1>从发现问题，<br />到<span>创造答案。</span></h1>
        <p className="hero-text">一条为测试工程师设计的开发成长路径。带上你对质量、边界与用户体验的敏感，从第一行代码出发，成为能独立交付产品的开发工程师。</p>
        <div className="hero-actions"><a className="primary" href="#modules">选择学习方向 <b>↘</b></a><span>3 个模块 · 12 项核心能力</span></div>
      </div>
      <div className="hero-map" aria-label="成长路线图">
        <span className="map-label top">你的起点<br /><b>测试工程师</b></span>
        <div className="map-orbit"><i>01</i><i>02</i><i>03</i></div>
        <div className="map-core">DEV<small>BUILD<br />SHIP<br />GROW</small></div>
        <span className="map-label bottom">你的目标<br /><b>开发工程师</b></span>
      </div>
    </section>

    <section id="modules" className="module-section">
      <div className="section-title"><p>LEARNING PATHS / 课程导航</p><h2>选择你的<br />下一站</h2><span>不必一次学完所有内容。选择一个方向，用项目驱动学习，再把三种能力组合起来。</span></div>
      <div className="module-grid">{(Object.entries(modules) as [ModuleKey, typeof modules.frontend][]).map(([key, item]) =>
        <button className="module-card" key={key} onClick={() => onSelect(key)} style={{'--accent': item.color} as React.CSSProperties}>
          <div><span>{item.number}</span><em>{item.label}</em></div><h3>{item.title}</h3><p>{item.subtitle}</p>
          <ul>{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><b className="round-arrow">↗</b>
        </button>)}
      </div>
    </section>

    <section className="advantage"><p>YOUR ADVANTAGE</p><h2>你不是从零开始。</h2><div className="advantage-grid"><div><b>01</b><h3>质量意识</h3><p>你知道“能运行”和“可交付”之间，还有很长的距离。</p></div><div><b>02</b><h3>边界思维</h3><p>异常路径、极端输入和失败恢复，本来就是你的日常。</p></div><div><b>03</b><h3>用户视角</h3><p>你习惯从真实使用者出发，而不只关注代码是否完成。</p></div></div></section>
  </main>
}

function ModulePage({ moduleKey, onHome }: { moduleKey: ModuleKey; onHome: () => void }) {
  const item = modules[moduleKey]
  return <main className="detail" style={{'--accent': item.color} as React.CSSProperties}>
    <section className="detail-hero"><button onClick={onHome}>← 返回学习地图</button><p>{item.number} / {item.label}</p><h1>{item.title}</h1><h2>{item.subtitle}</h2><p className="detail-intro">{item.intro}</p><div className="skill-row">{item.skills.map(s => <span key={s}>{s}</span>)}</div></section>
    <section className="detail-body"><div className="detail-heading"><p>ROADMAP</p><h2>三阶段<br />学习路线</h2></div><ol className="stage-list">{item.stages.map(([phase,title,desc]) => <li key={phase}><span>{phase}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol></section>
    <section className="project"><div><p>CAPSTONE PROJECT / 毕业项目</p><h2>{item.project}</h2><p>{item.projectDesc}</p></div><div className="project-mark">{item.number}<small>BUILD<br />TO LEARN</small></div></section>
    <section className="outcomes"><p>完成这个模块后，你将能够</p><div>{item.outcomes.map((o, i) => <span key={o}><b>0{i+1}</b>{o}</span>)}</div><button className="primary" onClick={onHome}>返回并选择下一模块 ↗</button></section>
  </main>
}

function App() {
  const [active, setActive] = useState<ModuleKey | null>(null)
  useEffect(() => { window.scrollTo(0, 0) }, [active])
  return <div className="app-shell"><Header onHome={() => setActive(null)} onSelect={setActive} active={active} />{active ? <ModulePage moduleKey={active} onHome={() => setActive(null)} /> : <Home onSelect={setActive} />}<Footer /></div>
}

export default App
