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

const lessonContent: Record<ModuleKey, Array<{
  id: string
  label: string
  title: string
  summary: string
  topics: string[]
  task: string
  done: string
}>> = {
  frontend: [
    { id: 'html-css', label: '01 / HTML & CSS', title: '搭建可访问的响应式页面', summary: '从语义化结构开始，理解盒模型、布局和响应式规则，把设计稿还原成不同设备都能使用的页面。', topics: ['语义化 HTML 与表单', 'Flexbox / Grid 布局', '响应式与可访问性', 'DevTools 定位样式问题'], task: '完成一个带登录、筛选和数据表格的管理页，并适配手机端。', done: '页面在 375px 与 1440px 下无横向溢出，表单可用键盘完整操作。' },
    { id: 'javascript', label: '02 / JAVASCRIPT', title: '用状态和事件驱动交互', summary: '建立变量、函数、对象和异步编程基础，理解浏览器事件与数据请求的完整过程。', topics: ['现代 JavaScript 语法', 'DOM 与事件机制', 'Promise / async await', 'TypeScript 类型基础'], task: '为用例列表实现搜索、分页、编辑和异步加载状态。', done: '能够处理加载、成功、空数据和请求失败四种界面状态。' },
    { id: 'react', label: '03 / REACT', title: '将业务拆成可复用组件', summary: '用组件和单向数据流组织复杂界面，掌握常见 Hook、路由和工程化构建方式。', topics: ['组件与 Props', 'State 与常用 Hooks', '路由与表单管理', 'Vite 构建与组件测试'], task: '把管理页重构为 React 应用，拆分导航、筛选器、表格和弹窗组件。', done: '组件职责清晰，关键交互有测试，并可生成生产构建。' },
  ],
  backend: [
    { id: 'python', label: '01 / PYTHON', title: '用 Python 表达业务规则', summary: '从数据类型、函数与类出发，写出结构清楚、异常可控并且可测试的业务代码。', topics: ['数据类型与控制流', '函数、模块与类', '异常处理与日志', 'pytest 单元测试'], task: '实现缺陷优先级计算、状态流转和数据校验模块。', done: '非法状态流转会被拒绝，核心业务规则具有自动化测试。' },
    { id: 'api-database', label: '02 / API & DATABASE', title: '设计接口与持久化数据', summary: '理解 HTTP 协议、REST 约束和关系型数据库，让前后端围绕稳定契约协作。', topics: ['HTTP 与 REST 设计', 'FastAPI 路由与校验', 'SQL 与数据建模', 'JWT 身份认证'], task: '实现缺陷的新增、查询、修改、删除、筛选与分页接口。', done: '接口状态码准确，OpenAPI 文档完整，数据库约束能够保护数据一致性。' },
    { id: 'deployment', label: '03 / DELIVERY', title: '让服务稳定运行并可定位', summary: '补齐配置、日志、容器和持续集成，使服务从本地代码变成可交付的软件。', topics: ['配置与环境变量', '结构化日志与监控', 'Docker 容器化', 'CI/CD 基础流程'], task: '为缺陷 API 编写 Dockerfile，并配置自动测试与健康检查。', done: '新环境可一条命令启动，服务异常能通过日志快速定位。' },
  ],
  ai: [
    { id: 'ai-workflow', label: '01 / AI WORKFLOW', title: '建立可靠的人机协作方式', summary: '把需求拆成可验证的小任务，为模型提供充分上下文，并用测试思维审查每一次输出。', topics: ['任务拆解与上下文', '结构化提示模板', '代码生成与审查', '隐私与安全边界'], task: '用 AI 完成一个功能，并记录需求、提示、验证和修正全过程。', done: '生成代码通过人工审查和自动化测试，且不包含敏感信息。' },
    { id: 'rag-agent', label: '02 / RAG & AGENT', title: '把模型能力接入真实产品', summary: '学习模型 API、向量检索和工具调用，构建能够依据私有知识回答并执行操作的应用。', topics: ['模型 API 与流式输出', 'Embedding 与向量检索', 'RAG 引用与召回', '工具调用与智能体'], task: '构建一个能检索测试规范、回答问题并标注来源的助手。', done: '答案包含可追溯来源，知识库无答案时不会编造结论。' },
    { id: 'ai-evaluation', label: '03 / EVALUATION', title: '用评测约束 AI 的不确定性', summary: '建立覆盖正确性、安全性、成本和延迟的评测体系，让 AI 功能可以持续迭代。', topics: ['黄金数据集设计', '正确性与幻觉评估', '提示注入与安全护栏', '成本、延迟与可观测性'], task: '建立不少于 30 条场景的评测集，并生成版本对比报告。', done: '每次提示或模型变更都能量化质量变化，并设置发布阈值。' },
  ],
}

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
  const lessons = lessonContent[moduleKey]
  return <main className="detail" style={{'--accent': item.color} as React.CSSProperties}>
    <section className="detail-hero"><button onClick={onHome}>← 返回学习地图</button><p>{item.number} / {item.label}</p><h1>{item.title}</h1><h2>{item.subtitle}</h2><p className="detail-intro">{item.intro}</p><nav className="skill-row" aria-label="本模块内容导航">{lessons.map(lesson => <a key={lesson.id} href={`#${moduleKey}-${lesson.id}`}>{lesson.label} ↘</a>)}</nav></section>
    <section className="detail-body"><div className="detail-heading"><p>ROADMAP</p><h2>三阶段<br />学习路线</h2><small>点击阶段可直接进入具体学习内容</small></div><ol className="stage-list">{item.stages.map(([phase,title,desc], index) => <li key={phase}><span>{phase}</span><h3>{title}</h3><p>{desc}</p><a href={`#${moduleKey}-${lessons[index].id}`} aria-label={`进入${title}`}>查看内容 ↘</a></li>)}</ol></section>
    <section className="lesson-section"><header><p>CURRICULUM / 具体内容</p><h2>从知识点<br />到可交付成果</h2></header><div className="lesson-list">{lessons.map((lesson, index) => <article id={`${moduleKey}-${lesson.id}`} key={lesson.id}><div className="lesson-index">0{index + 1}</div><div className="lesson-copy"><p>{lesson.label}</p><h3>{lesson.title}</h3><p>{lesson.summary}</p><div className="topic-grid">{lesson.topics.map(topic => <span key={topic}>→ {topic}</span>)}</div><dl><div><dt>动手任务</dt><dd>{lesson.task}</dd></div><div><dt>完成标准</dt><dd>{lesson.done}</dd></div></dl></div><a className="back-top" href="#top">回到顶部 ↑</a></article>)}</div></section>
    <section className="project"><div><p>CAPSTONE PROJECT / 毕业项目</p><h2>{item.project}</h2><p>{item.projectDesc}</p></div><div className="project-mark">{item.number}<small>BUILD<br />TO LEARN</small></div></section>
    <section className="outcomes"><p>完成这个模块后，你将能够</p><div>{item.outcomes.map((o, i) => <span key={o}><b>0{i+1}</b>{o}</span>)}</div><button className="primary" onClick={onHome}>返回并选择下一模块 ↗</button></section>
  </main>
}

function App() {
  const [active, setActive] = useState<ModuleKey | null>(null)
  useEffect(() => { window.scrollTo(0, 0) }, [active])
  return <div id="top" className="app-shell"><Header onHome={() => setActive(null)} onSelect={setActive} active={active} />{active ? <ModulePage moduleKey={active} onHome={() => setActive(null)} /> : <Home onSelect={setActive} />}<Footer /></div>
}

export default App
