# design.md
## Programming Decay 两个 HTML 页面统一视觉规范

适用文件：
- `D:\Downloads\claude_design_html0507\archive\programming-decay-v3.1\index.html`
- `D:\Downloads\claude_design_html0507\archive\programming-decay-v3.1\index.html`

目标：提取 Bartlett Shows 官网的视觉特征，用于统一这两个 Programming Decay 页面。  
原则：**不大幅改动现有排版、HTML 结构和文字内容，只统一背景、文字、按钮、链接、边框、面板、图像和交互质感。**

参考来源：
- Bartlett Shows 官网：https://shows.bartlettarchucl.com/
- 参考范围：首页、`Index of all works`、作品索引、子站 archive / project index / project detail 的视觉语言

---

## 0. 改造范围

### 只改这些

- 全局背景色和背景纹理
- 字体栈
- 文字颜色和层级
- 按钮、导航、segmented control
- 面板、卡片、console、metric、status pill
- 图片、canvas、iframe、media frame 的边框和底色
- 链接 hover / active 状态
- 阴影、glow、圆角、边线
- 少量 transition 质感

### 不改这些

- 不重写 HTML
- 不重排页面结构
- 不删除现有模块
- 不大幅改动文案
- 不把两个页面改成同一个版式
- 不引入 Bartlett / UCL logo 或官方身份系统
- 不新增 full-screen 3D / WebGL 展厅入口

---

## 1. 当前两个页面的样式观察

### BEFORE_PROGRAMMING_DECAY-v1

现有特征：
- 深色 console app 风格
- 左侧 sticky rail：返回、brand、view buttons
- 主工作区由 topbar + 多个 view 组成
- 大量数据面板、scanner、canvas、pipeline、metric、status pill
- 当前色彩偏生态科技：amber / green / cyan / red / violet 多色并行
- 背景有网格和淡 glow
- 按钮较多，有 pill、圆形 brand mark、发光 hover 和较明显阴影

保留：
- 左侧 rail + workspace 的产品工具感
- 多视图 console 结构
- 数据面板、pipeline、scanner、metric 的信息密度

需要统一：
- 减少霓虹和多色 UI
- 降低 glow 和 shadow
- 圆角收窄
- 使用 Bartlett-informed 的 off-black / soft-white / muted grey / thin rule
- active 状态改为更克制的 archive gold

### programming-decay-v3.1

现有特征：
- 深色长页面 product demo
- 顶部 sticky topbar + stage nav
- hero section、mission brief、GIS、selection、strategy、ML、hub 等连续章节
- 当前视觉偏 cyber / neon：cyan、blue、violet、magenta、green、yellow 多色
- 有 scanline、grid background、radial neon background
- hero 标题使用 Courier New，科技感强但和 Bartlett archive 气质不完全统一
- brief cards、panels、map overlays、classification board、iframe shell 等模块丰富

保留：
- 顶部导航和长页面结构
- product demo 的章节逻辑
- 大图、地图、iframe、策略模块
- 中英文说明

需要统一：
- 将 cyan 主导的科技感降级为单一 archive accent
- 去掉强 neon startup / sci-fi 氛围
- 保留网格但降低到纸面/展签感
- hero 字体改为几何 sans，不再以 Courier 作为主标题
- card 和 panel 变成低圆角、细边线、无厚阴影的 exhibition archive panels

---

## 2. Bartlett Shows 可借用的视觉特征

只借用视觉语法，不复制品牌。

### 可借用

- Off-black / white 高对比
- `#101112` 一类近黑背景
- `#F9F9F9` soft-white 文字和浅色面
- muted grey 作为次级文字
- thin 1px rules
- text link + underline hover
- 低装饰、低圆角、少阴影
- fixed / sticky navigation 的清晰层级
- index / archive / metadata 的信息组织感
- 大图 media plate 与小字号 caption
- dropdown / segmented / active state 的黑白反转逻辑
- 页面像“数字展览 archive”，不是普通 app dashboard

### 不借用

- Bartlett / UCL 标识
- `Bartlett Shows` 文案
- visitor count
- mute / unmute / exit
- 3D room 作为基础体验
- custom cursor
- full WebGL 首页
- 多展览渐变色作为 UI 主色
- 学校 programme / unit 结构

设计表述：**Bartlett-informed, not Bartlett-branded.**

---

## 3. 统一后的视觉方向

两个页面统一成：

**Dark architectural archive console for spatial decision intelligence.**

中文描述：

**深色建筑学院数字档案 + 产品决策系统界面。**

具体气质：
- 比现在更少 neon
- 比 SaaS dashboard 更像展览 archive
- 保留 Programming Decay 的实验性和产品 demo 感
- 用黑白、细线、metadata、图片板块制造高级感
- 让数据和图像本身承担色彩，不让 UI 控件过度抢戏

---

## 4. 色彩系统

使用一个主系统：dark archive palette。

### 核心色

| Token | Hex | 用途 |
|---|---|---|
| `--bg` | `#101112` | 页面背景，来自 Bartlett off-black 逻辑 |
| `--bg-deep` | `#050606` | 深色底层、canvas / image fallback |
| `--panel` | `#17181A` | 面板、topbar、rail、card |
| `--panel-soft` | `#1E2022` | 次级面板、hover 前背景 |
| `--text` | `#F9F9F9` | 主文字 |
| `--muted` | `#B7B6B0` | 次级文字 |
| `--dim` | `#6F6F6F` | caption、disabled、辅助信息 |
| `--line` | `rgba(249, 249, 249, 0.12)` | 默认边线 |
| `--line-bright` | `rgba(249, 249, 249, 0.28)` | hover / active 边线 |
| `--accent` | `#B1A475` | 唯一 UI accent，来自 Bartlett institutional muted gold |

### 语义色

语义色只用于图表、状态、数据层，不用于全站 UI 主控件。

| Token | Hex | 用途 |
|---|---|---|
| `--data-green` | `#8FA07C` | 生态、growth、reuse |
| `--data-blue` | `#8EA0A8` | hydrology、GIS、sensor |
| `--data-red` | `#A56556` | risk、warning、contamination |
| `--data-violet` | `#928AA2` | ML / generative / abstract layer |

### 使用规则

- UI active / hover 只用 `--accent`。
- 不再让 cyan、magenta、violet、green 同时作为 UI 主色。
- 地图、canvas、图表内部可以保留多色，但颜色要降饱和。
- 删除或弱化大面积 radial neon glow。
- 不使用 colorful startup gradient。

---

## 5. 字体系统

Bartlett 的参考是 Wigrum-like 几何无衬线，但不要强制加载 Wigrum。

### 字体栈

```css
--font-sans: Inter, "Neue Haas Grotesk Text", Arial, Helvetica, sans-serif;
--font-mono: "IBM Plex Mono", "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
--font-cjk: "Noto Sans SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif;
```

### 使用方式

- 页面主字体：`--font-sans`
- 导航、标签、metric label、按钮小字：可用 `--font-mono`
- 代码、数据、编号、score：`--font-mono`
- 中文说明：保持 sans，不能过小，行高至少 `1.6`

### 针对 v3.1 的修正

当前 `h1` 使用 `"Courier New"`，会让首页更像 retro terminal。  
统一后建议：

- `h1` 改为 `--font-sans`
- 保留 monospace 给 label、编号、data readout
- 标题保持 uppercase 可以保留，但字重不要过重到 900

---

## 6. 背景质感

### 当前问题

两个页面都有网格、scanline、radial glow。现在的科技感偏强，容易像 cyber dashboard。

### 统一方案

保留很轻的 archive grid，但弱化：

```css
body {
  background:
    linear-gradient(rgba(249, 249, 249, 0.014) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249, 249, 249, 0.014) 1px, transparent 1px),
    radial-gradient(circle at 50% 0, rgba(177, 164, 117, 0.06), transparent 520px),
    var(--bg);
  background-size: 44px 44px, 44px 44px, auto, auto;
}
```

规则：
- grid opacity 控制在 `0.012–0.018`
- radial glow 只能用 `--accent` 的低透明度
- 不使用 cyan / blue / magenta glow 作为页面背景
- scanline 如果保留，opacity 不超过 `0.12`

---

## 7. 文字层级

### 标题

- 大标题颜色：`--text`
- 标题不要使用彩色 glow
- 行高保持紧：`1.02–1.14`
- 字重建议 `600–750`

### Eyebrow / Label

当前两个页面都大量使用 `.eyebrow` / `.label`。统一为：

```css
.eyebrow,
.label {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

### 中文说明

```css
.zh-note {
  color: rgba(249, 249, 249, 0.68);
  font-size: 0.82rem;
  line-height: 1.65;
}
```

规则：
- 中文不要用 cyan。
- 中文作为解释性 metadata，颜色低一档但保持可读。

---

## 8. 按钮与导航

### 核心原则

Bartlett 参考里按钮更像文字入口和状态切换，不像厚重科技按钮。

统一按钮规则：
- 1px 边线
- 低圆角：`4px`
- 无 glow
- 无厚阴影
- hover 时边线变亮或背景轻微反转
- active 状态使用 `--accent`
- 不用 pill，除非是小型 status

### 通用按钮样式

```css
button,
.nav-item,
.mode-btn,
.text-btn,
.icon-btn,
.stage-nav a,
.site-tabs button,
.strategy-tabs button,
.layer-controls button {
  border: 1px solid var(--line);
  border-radius: 4px;
  background: rgba(249, 249, 249, 0.024);
  color: var(--muted);
  box-shadow: none;
  transition:
    color 160ms ease,
    border-color 160ms ease,
    background 160ms ease;
}

button:hover,
.nav-item:hover,
.mode-btn:hover,
.text-btn:hover,
.icon-btn:hover,
.stage-nav a:hover {
  color: var(--text);
  border-color: var(--line-bright);
  background: rgba(249, 249, 249, 0.055);
}

button.active,
.nav-item.active,
.mode-btn.active,
.stage-nav a.is-active {
  color: var(--accent);
  border-color: rgba(177, 164, 117, 0.72);
  background: rgba(177, 164, 117, 0.10);
}
```

### Back Home / Brand Mark

当前 v1 的 `.back-home` 是 pill，v3 的 `.brand-mark` 是方形。统一建议：
- `.back-home` 可保留 pill 结构，但 radius 降到 `4px` 或 `6px`
- `.brand-mark` 不用圆形，不模拟 Bartlett logo
- v1 的 `brand-mark: B` 建议视觉上不要像 Bartlett 的 B；如果不改 HTML，可通过样式弱化为普通文字编号块

```css
.brand-mark {
  border-radius: 4px;
  background: var(--text);
  color: var(--bg);
  border: 1px solid var(--line-bright);
  font-weight: 700;
}
```

---

## 9. 面板、卡片、console

两个页面都有大量 panel/card/console。统一成 archive panels。

### Panel 规则

- 背景：`--panel`
- 边线：`1px solid var(--line)`
- 圆角：`4px` 或最多 `6px`
- 阴影：默认无；需要层级时只用非常轻的黑色深度
- 不用 colored glow

```css
.topbar,
.rail,
.scanner-stage,
.material-column,
.data-column,
.decode-main,
.control-surface,
.response-panel,
.palette-panel,
.facade-panel,
.system-panel,
.dashboard-panel,
.brief-card,
.mission-console,
.product-panel,
.control-stack,
.recommendation,
.site-inspector,
.strategy-detail,
.entropy-atlas-panel,
.entropy-frame-shell {
  background: rgba(23, 24, 26, 0.88);
  border: 1px solid var(--line);
  border-radius: 4px;
  box-shadow: none;
}
```

### Card 内部

- 用 thin rule 分隔，不用卡片套卡片的厚重层级
- 小标题用 mono label
- 数值用 text 或 accent，不用 neon glow

---

## 10. 状态标签与指标

### Status Pill

现有 status / run-status / score-pill 可以保留，但要更克制：

```css
.status-pill,
.score-pill,
.run-status,
.metric,
.logic-step-num,
.step {
  border: 1px solid rgba(177, 164, 117, 0.38);
  background: rgba(177, 164, 117, 0.08);
  color: var(--accent);
  box-shadow: none;
}
```

### Pulse Dot

可以保留，但不要强霓虹：

```css
.pulse-dot {
  background: var(--accent);
  box-shadow: 0 0 10px rgba(177, 164, 117, 0.34);
}
```

如果页面要更 archive，可以直接取消 pulse animation。

---

## 11. 链接与下划线

Bartlett 的链接重点是细下划线和 hover 收缩感。

统一规则：

```css
a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition:
    color 160ms ease,
    border-color 160ms ease;
}

a:hover,
a:focus-visible {
  color: var(--text);
  border-bottom-color: transparent;
}
```

用于 `.stage-nav a` 这种导航按钮时，不强制 underline，因为它们已经是 segmented controls。

---

## 12. 图片、Canvas、Map、Iframe 质感

### 统一规则

- 图像背景使用 `--bg-deep`
- 图片容器边框：`1px solid var(--line)`
- 圆角：`0–4px`
- 不使用 drop shadow
- 不加厚边框
- 图片不要过度滤镜化

```css
img,
canvas,
iframe,
.atlas-map,
.classification-board,
.hero-media,
.scan-window,
.entropy-frame {
  background: var(--bg-deep);
  border-color: var(--line);
}
```

### 图像颜色

项目图、地图和 ML 输出可以保留原色。  
UI 周边不要用同样的高饱和色去抢图像。

---

## 13. Motion / Interaction

### 保留

- button hover
- active state
- panel opacity / fade
- scanner 或图表的原有交互
- nav 切换
- map layer toggle

### 降低

- glow animation
- pulse animation
- scanline opacity
- transform scale hover
- box-shadow hover

### 推荐参数

```css
--ease: cubic-bezier(0.2, 0, 0, 1);
--duration-fast: 160ms;
--duration-med: 320ms;
```

不要使用 bounce / spring / large parallax。

---

## 14. 两个 CSS 文件的变量替换建议

### v1: `BEFORE_PROGRAMMING_DECAY-v1/styles.css`

把 `:root` 统一为：

```css
:root {
  color-scheme: dark;
  --bg: #101112;
  --bg-deep: #050606;
  --panel: #17181A;
  --panel-soft: #1E2022;
  --panel-warm: #191816;
  --text: #F9F9F9;
  --muted: #B7B6B0;
  --dim: #6F6F6F;
  --line: rgba(249, 249, 249, 0.12);
  --line-bright: rgba(249, 249, 249, 0.28);
  --accent: #B1A475;
  --amber: #B1A475;
  --green: #8FA07C;
  --cyan: #8EA0A8;
  --red: #A56556;
  --violet: #928AA2;
  --radius: 4px;
  --shadow: none;
  --font-sans: Inter, "Neue Haas Grotesk Text", Arial, Helvetica, sans-serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
}
```

重点覆盖：
- `body` background
- `.rail`
- `.topbar`
- `.back-home`
- `.brand-mark`
- `.nav-item`
- `.mode-btn`
- `.icon-btn`
- `.text-btn`
- `.status-pill`
- 各类 panel/card

### v3.1: `programming-decay-v3.1/styles.css`

把 `:root` 统一为：

```css
:root {
  color-scheme: dark;
  --bg: #101112;
  --bg-deep: #050606;
  --panel: rgba(23, 24, 26, 0.88);
  --panel-strong: rgba(23, 24, 26, 0.96);
  --line: rgba(249, 249, 249, 0.14);
  --line-soft: rgba(249, 249, 249, 0.08);
  --text: #F9F9F9;
  --muted: #B7B6B0;
  --faint: #6F6F6F;
  --accent: #B1A475;
  --cyan: #B1A475;
  --blue: #8EA0A8;
  --violet: #928AA2;
  --magenta: #A87886;
  --green: #8FA07C;
  --red: #A56556;
  --yellow: #B1A475;
  --section-pad: 96px;
  --font-sans: Inter, "Neue Haas Grotesk Text", Arial, Helvetica, sans-serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
  font-family: var(--font-sans);
}
```

重点覆盖：
- `body` background
- `.scanline`
- `.topbar`
- `.brand-mark`
- `.stage-nav`
- `.run-status`
- `.eyebrow`
- `.label`
- `h1`
- `.brief-card`
- `.mission-console`
- `.product-panel`
- `.control-stack`
- `.recommendation`
- `.atlas-launch`
- `.entropy-frame-shell`

---

## 15. 建议追加的统一 CSS Patch

可以在两个 `styles.css` 文件末尾追加一段类似的 patch。  
这样不用大改原 CSS，也能快速统一质感。

```css
/* Bartlett-informed archive skin patch */
body {
  font-family: var(--font-sans);
  background:
    linear-gradient(rgba(249, 249, 249, 0.014) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249, 249, 249, 0.014) 1px, transparent 1px),
    radial-gradient(circle at 50% 0, rgba(177, 164, 117, 0.06), transparent 520px),
    var(--bg);
  background-size: 44px 44px, 44px 44px, auto, auto;
}

.scanline {
  opacity: 0.12;
}

h1,
h2,
h3 {
  color: var(--text);
  text-shadow: none;
}

.eyebrow,
.label,
.section-heading span,
.stage-header p {
  color: var(--accent);
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
}

.zh-note {
  color: rgba(249, 249, 249, 0.68);
}

.topbar,
.rail,
.brief-card,
.mission-console,
.product-panel,
.scanner-stage,
.material-column,
.data-column,
.decode-main,
.control-surface,
.response-panel,
.palette-panel,
.facade-panel,
.system-panel,
.dashboard-panel,
.control-stack,
.recommendation,
.site-inspector,
.strategy-detail,
.entropy-atlas-panel,
.entropy-frame-shell {
  background: rgba(23, 24, 26, 0.88);
  border-color: var(--line);
  border-radius: 4px;
  box-shadow: none;
}

button,
.nav-item,
.mode-btn,
.text-btn,
.icon-btn,
.stage-nav a,
.site-tabs button,
.strategy-tabs button,
.layer-controls button {
  border-color: var(--line);
  border-radius: 4px;
  background: rgba(249, 249, 249, 0.024);
  color: var(--muted);
  box-shadow: none;
}

button:hover,
.nav-item:hover,
.mode-btn:hover,
.text-btn:hover,
.icon-btn:hover,
.stage-nav a:hover {
  border-color: var(--line-bright);
  background: rgba(249, 249, 249, 0.055);
  color: var(--text);
  box-shadow: none;
}

button.active,
.nav-item.active,
.mode-btn.active,
.stage-nav a.is-active {
  color: var(--accent);
  border-color: rgba(177, 164, 117, 0.72);
  background: rgba(177, 164, 117, 0.10);
}

.brand-mark {
  border-radius: 4px;
  border-color: var(--line-bright);
  background: var(--text);
  color: var(--bg);
  box-shadow: none;
}

.status-pill,
.score-pill,
.run-status,
.metric,
.logic-step-num,
.step {
  border-color: rgba(177, 164, 117, 0.38);
  background: rgba(177, 164, 117, 0.08);
  color: var(--accent);
  box-shadow: none;
}

.pulse-dot {
  background: var(--accent);
  box-shadow: 0 0 10px rgba(177, 164, 117, 0.34);
}

img,
canvas,
iframe,
.atlas-map,
.classification-board,
.hero-media,
.scan-window,
.entropy-frame {
  background-color: var(--bg-deep);
  border-color: var(--line);
}
```

---

## 16. Do / Don't

### Do

- 保留两个页面原有结构。
- 保留当前 product demo / console 逻辑。
- 用 off-black 背景统一两个页面。
- 用 `#B1A475` 作为唯一 UI accent。
- 用细线、低圆角、少阴影建立 Bartlett-informed archive 质感。
- 让地图、canvas、图片保留自己的内容色彩。
- 让按钮和导航变得更像展览 archive 的控制层。

### Don't

- 不要把页面改成 Bartlett Shows 复制版。
- 不要使用 Bartlett / UCL logo。
- 不要添加 visitor / mute / exit 等展厅控件。
- 不要大改版式。
- 不要用新的大段文案替换现有内容。
- 不要继续叠加 cyan / magenta / violet / green 作为 UI 主色。
- 不要使用大面积多色渐变。
- 不要使用 3D blob、玻璃拟态或厚重 glow。
- 不要把所有 panel 做成圆角卡片。

---

## 17. 最终效果判断

改完后两个页面应该看起来：

- 仍然是 Programming Decay 的产品/系统原型；
- 但不再像两个不同版本的 cyber dashboard；
- 更像同一个深色 architectural archive interface；
- 背景克制，文字清楚，按钮细致；
- UI 不抢地图、图像、canvas 和系统逻辑的戏；
- 能和 Bartlett Shows 的黑白、高对比、archive、metadata 气质产生关联；
- 但不会像 Bartlett 官网，也不会像学校展览站复制品。

一句话目标：

**把两个 Programming Decay 页面统一成 Bartlett-informed 的深色展览档案质感，同时只做皮肤层改造，不动核心排版和文字。**
