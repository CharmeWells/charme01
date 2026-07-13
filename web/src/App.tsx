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

type TopicGuide = { intro: string; focus: string; practice: string }

const topicGuides: Record<string, TopicGuide> = {
  '语义化 HTML 与表单': { intro: '使用有含义的标签组织标题、导航、正文和表单，让浏览器与辅助技术正确理解页面。', focus: '掌握 header、main、section、form、label、input 的职责，以及输入类型和原生校验。', practice: '编写一个包含用户名、密码、记住我和错误提示的可访问登录表单。' },
  'Flexbox / Grid 布局': { intro: 'Flexbox 处理一维排列，Grid 处理二维网格；两者组合可以覆盖大多数业务页面布局。', focus: '理解主轴、交叉轴、弹性尺寸、网格轨道、gap 和 minmax()。', practice: '使用 Grid 完成仪表盘骨架，再用 Flexbox 排列卡片内部元素。' },
  '响应式与可访问性': { intro: '让页面在不同屏幕、输入设备和辅助技术下保持可读、可操作。', focus: '掌握媒体查询、流式尺寸、焦点状态、颜色对比度和键盘导航。', practice: '在 375px、768px 和 1440px 三种宽度下检查页面并完成键盘操作测试。' },
  'DevTools 定位样式问题': { intro: '利用浏览器开发者工具检查 DOM、计算样式、布局尺寸和网络资源。', focus: '熟悉 Elements、Computed、Box Model、Device Toolbar 和 Network 面板。', practice: '故意制造溢出、样式覆盖和资源 404，并使用 DevTools 分别定位原因。' },
  '现代 JavaScript 语法': { intro: '用变量、函数、数组、对象和模块表达页面中的数据与业务规则。', focus: '掌握 const/let、解构、展开、数组方法、模块和可选链。', practice: '把一组测试用例按状态筛选、排序并转换成统计结果。' },
  'DOM 与事件机制': { intro: 'DOM 是浏览器中的页面对象树，事件机制负责响应点击、输入和提交等用户行为。', focus: '理解元素查询、事件监听、冒泡、委托和默认行为。', practice: '实现一个可新增、勾选、删除并统计数量的任务列表。' },
  'Promise / async await': { intro: '异步编程用于处理网络请求、计时器等不会立即完成的任务。', focus: '掌握 Promise 状态、await、并行请求、try/catch 和取消请求。', practice: '请求用例列表，并完整展示加载、成功、空数据和失败状态。' },
  'TypeScript 类型基础': { intro: 'TypeScript 用静态类型提前发现属性拼写、参数和返回值错误。', focus: '掌握基础类型、interface、联合类型、泛型和类型收窄。', practice: '为测试用例、分页响应和筛选函数补充类型并消除 any。' },
  '组件与 Props': { intro: '组件将界面拆成独立职责单元，Props 用来从父级传入只读数据和回调。', focus: '理解组件边界、组合、children、列表 key 和单向数据流。', practice: '将用例页拆分为筛选器、统计卡片、表格与分页组件。' },
  'State 与常用 Hooks': { intro: 'State 保存会影响界面的数据，Hooks 让组件管理状态、副作用和复用逻辑。', focus: '掌握 useState、useEffect、useMemo、useRef 和自定义 Hook。', practice: '实现筛选条件持久化，并封装可复用的数据请求 Hook。' },
  '路由与表单管理': { intro: '路由负责页面之间的地址映射，表单管理负责字段、校验和提交状态。', focus: '理解动态路由、查询参数、受控字段、校验和防重复提交。', practice: '完成用例列表、详情、编辑三个页面及未保存离开提醒。' },
  'Vite 构建与组件测试': { intro: '构建工具把源码转换为浏览器资源，组件测试验证关键交互在修改后仍然可用。', focus: '掌握环境变量、生产构建、静态资源路径、测试查询和用户事件。', practice: '为登录与筛选组件编写测试，并生成可部署的 dist 目录。' },
  '数据类型与控制流': { intro: 'Python 的数据类型和控制流是编写业务判断、集合处理和状态转换的基础。', focus: '掌握字符串、列表、字典、集合、条件、循环和推导式。', practice: '读取缺陷列表并统计不同优先级、状态和负责人的数量。' },
  '函数、模块与类': { intro: '函数封装行为，模块组织代码，类适合表达具有状态和规则的业务对象。', focus: '掌握参数、返回值、类型注解、导入、数据类和职责划分。', practice: '将缺陷状态流转拆分为模型、规则服务和工具模块。' },
  '异常处理与日志': { intro: '异常负责中断错误流程，日志负责留下可检索的运行证据。', focus: '掌握自定义异常、try/except/finally、日志级别和上下文字段。', practice: '为非法状态流转记录缺陷 ID、操作者和失败原因。' },
  'pytest 单元测试': { intro: '单元测试用可重复的输入验证函数和业务规则，形成快速反馈。', focus: '掌握断言、fixture、参数化、异常测试和覆盖率。', practice: '为缺陷优先级规则编写正常、边界和异常三类测试。' },
  'HTTP 与 REST 设计': { intro: 'HTTP 定义客户端与服务端通信方式，REST 用资源和标准动作组织接口。', focus: '掌握方法、状态码、路径、查询参数、幂等性和错误响应。', practice: '设计一套缺陷资源 API，并为每个接口标出请求和响应示例。' },
  'FastAPI 路由与校验': { intro: 'FastAPI 使用类型声明快速构建接口，并自动生成可交互的 OpenAPI 文档。', focus: '掌握路由、Pydantic 模型、依赖注入、异常处理和响应模型。', practice: '实现缺陷创建与查询接口，并验证标题、优先级和状态。' },
  'SQL 与数据建模': { intro: '关系模型通过表、主外键和约束保存一致且可查询的业务数据。', focus: '掌握增删改查、JOIN、索引、事务、范式和迁移。', practice: '建立用户、项目、缺陷和操作记录四张表并编写分页查询。' },
  'JWT 身份认证': { intro: 'JWT 可携带已签名的身份声明，后端据此识别用户并检查权限。', focus: '理解登录签发、过期时间、刷新机制、密码哈希和权限校验。', practice: '实现登录接口以及只有项目成员才能修改缺陷的保护规则。' },
  '配置与环境变量': { intro: '配置将端口、数据库地址和密钥从代码中分离，便于不同环境安全运行。', focus: '掌握 .env、本地与生产配置、默认值、密钥管理和启动校验。', practice: '为开发、测试和生产环境准备独立配置，并阻止缺少密钥时启动。' },
  '结构化日志与监控': { intro: '结构化日志便于机器检索，监控通过指标和告警发现服务异常。', focus: '掌握请求 ID、JSON 日志、耗时、错误率、健康检查和告警阈值。', practice: '为每个 API 请求记录路径、状态码、耗时和追踪 ID。' },
  'Docker 容器化': { intro: 'Docker 将应用和运行依赖打包为一致的镜像，减少环境差异。', focus: '掌握 Dockerfile、镜像层、端口、卷、网络和 Compose。', practice: '容器化 FastAPI 与 PostgreSQL，并用一条命令启动完整环境。' },
  'CI/CD 基础流程': { intro: 'CI 自动验证每次提交，CD 在验证通过后把版本交付到目标环境。', focus: '掌握触发条件、依赖缓存、测试、构建、制品和部署环境。', practice: '配置 GitHub Actions，在 PR 中测试，合并 main 后执行部署。' },
  '任务拆解与上下文': { intro: 'AI 更擅长处理边界清楚的小任务，充分上下文能减少错误假设。', focus: '明确目标、输入、约束、验收标准、相关文件和禁止事项。', practice: '把“增加登录功能”拆成接口、界面、校验、测试和部署五组任务。' },
  '结构化提示模板': { intro: '结构化提示将角色、任务、上下文、约束与输出格式固定下来，提高结果稳定性。', focus: '掌握示例驱动、分隔符、输出模式、反例和自检清单。', practice: '设计一个将需求转换为测试点 JSON 的可复用提示模板。' },
  '代码生成与审查': { intro: 'AI 生成代码只是草稿，必须通过阅读、测试和安全检查才能交付。', focus: '检查正确性、边界条件、依赖、可维护性、测试和潜在漏洞。', practice: '让 AI 生成一个接口，再使用审查清单找出并修复至少三个问题。' },
  '隐私与安全边界': { intro: '发送给模型的内容可能包含敏感数据，需要在输入前分类、脱敏和限制。', focus: '识别密码、令牌、个人信息、商业代码和受限数据。', practice: '为团队编写 AI 使用红线，并设计提交提示前的脱敏检查表。' },
  '模型 API 与流式输出': { intro: '模型 API 接收消息并返回生成结果，流式输出可以降低用户感知等待时间。', focus: '掌握鉴权、消息结构、参数、流式事件、超时和重试。', practice: '实现一个逐字显示回答、支持取消并能处理失败的聊天接口。' },
  'Embedding 与向量检索': { intro: 'Embedding 把文本映射为向量，向量检索按语义相似度查找相关内容。', focus: '理解切分、向量化、余弦相似度、top-k 和元数据过滤。', practice: '把测试规范切分入库，并用五个问题检查召回内容是否相关。' },
  'RAG 引用与召回': { intro: 'RAG 先检索可信资料再生成答案，引用让用户能够核对结论来源。', focus: '掌握查询改写、混合检索、重排、上下文组装和无答案处理。', practice: '让助手回答规范问题并返回文档名、章节和原文片段。' },
  '工具调用与智能体': { intro: '工具调用让模型以结构化参数请求外部能力，智能体负责规划多步执行。', focus: '掌握工具 Schema、参数校验、权限确认、循环限制和失败恢复。', practice: '实现一个可查询缺陷、生成摘要但修改前必须确认的助手。' },
  '黄金数据集设计': { intro: '黄金数据集是一组具有代表性输入和期望结果的固定评测样本。', focus: '覆盖正常、边界、对抗、拒答和真实高频场景，并记录判定标准。', practice: '从历史需求中整理 30 条问题、参考答案和来源。' },
  '正确性与幻觉评估': { intro: '正确性评估判断答案是否符合事实，幻觉评估识别没有证据的编造。', focus: '结合规则、人工评分、模型评分和引用一致性检查。', practice: '定义 0～3 分评分规则，并比较两个提示版本的通过率。' },
  '提示注入与安全护栏': { intro: '提示注入试图让模型忽略规则或泄露数据，护栏用于限制输入、工具和输出。', focus: '掌握输入检测、权限隔离、最小工具权限、输出过滤和人工确认。', practice: '设计十条攻击提示，验证助手不会泄露系统提示或越权执行。' },
  '成本、延迟与可观测性': { intro: 'AI 应用需要同时关注回答质量、令牌成本、响应延迟和失败率。', focus: '记录模型、令牌、首字延迟、总耗时、缓存命中和错误类型。', practice: '制作一次调用追踪记录，并设置成本和延迟告警阈值。' },
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
    <section className="lesson-section"><header><p>CURRICULUM / 具体内容</p><h2>从知识点<br />到可交付成果</h2></header><div className="lesson-list">{lessons.map((lesson, index) => <article id={`${moduleKey}-${lesson.id}`} key={lesson.id}><div className="lesson-index">0{index + 1}</div><div className="lesson-copy"><p>{lesson.label}</p><h3>{lesson.title}</h3><p>{lesson.summary}</p><nav className="topic-grid" aria-label={`${lesson.title}知识点导航`}>{lesson.topics.map((topic, topicIndex) => <a key={topic} href={`#${moduleKey}-${lesson.id}-topic-${topicIndex + 1}`}>→ {topic}<b>查看 ↘</b></a>)}</nav><dl><div><dt>动手任务</dt><dd>{lesson.task}</dd></div><div><dt>完成标准</dt><dd>{lesson.done}</dd></div></dl><div className="topic-details">{lesson.topics.map((topic, topicIndex) => { const guide = topicGuides[topic]; return <section id={`${moduleKey}-${lesson.id}-topic-${topicIndex + 1}`} key={topic}><header><span>0{topicIndex + 1}</span><p>KNOWLEDGE POINT</p></header><h4>{topic}</h4><p>{guide.intro}</p><div><strong>学习重点</strong><span>{guide.focus}</span></div><div><strong>练习任务</strong><span>{guide.practice}</span></div><a href={`#${moduleKey}-${lesson.id}`}>返回本阶段 ↑</a></section> })}</div></div><a className="back-top" href="#top">回到顶部 ↑</a></article>)}</div></section>
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
