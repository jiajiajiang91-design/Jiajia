# AI 记忆产品详情页

静态网页按照 Figma 文件 `O6kK9c3J9vcqRxXXsjIqi9` 中的 `AI Memory Product / Desktop`（节点 `10:85`）制作。

## 文件

- `index.html`：页面结构与全部中文内容。
- `styles.css`：Figma 对应的颜色、字体、字号、间距和响应式样式。
- `app.js`：首屏三状态交互原型与窄屏等比缩放。
- `assets/screenshots/`：四张产品界面截图。
- `assets/public-notes/`：三张公开记录封面。
- `assets/fonts/`：Noto Sans SC、IBM Plex Mono 及字体许可。

## 本地查看

请通过本地 HTTP 服务打开：

```powershell
py -m http.server 4173 --directory .
```

浏览器访问 `http://127.0.0.1:4173/`。

`project.html`、`projects.js`、`language.js` 和 `project.js` 是作品集目录兼容文件；详情页主体仍由 `index.html` 独立运行。
