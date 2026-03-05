# 尹家韬的博客

[English](./README_en.md)

> 探索自我提升、超级个体、一人公司与产品增长的思考与实践。

---

## 技术栈

- **框架**: [Next.js](https://nextjs.org) 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui
- **国际化**: next-intl v4（中文 / 英文）
- **内容**: Markdown（gray-matter 解析）
- **邮件订阅**: Resend API
- **包管理器**: pnpm

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 生产构建
pnpm build

# 代码检查
pnpm lint
```

开发服务器默认运行在 [http://localhost:3000](http://localhost:3000)，访问后会自动跳转到 `/zh`（默认语言）。

---

## 项目结构

```
.
├── app/
│   ├── [locale]/              # 国际化页面路由
│   │   ├── page.tsx           # 首页
│   │   ├── about/             # 关于页
│   │   ├── articles/[slug]/   # 文章详情
│   │   ├── category/[category]/ # 分类页
│   │   └── subscribe/         # 订阅页
│   └── api/subscribe/         # 邮件订阅 API
├── components/
│   └── blog/                  # 博客专用组件
├── content/
│   └── posts/
│       ├── zh/                # 中文文章
│       └── en/                # 英文文章
├── messages/
│   ├── zh.json                # 中文翻译
│   └── en.json                # 英文翻译
├── lib/
│   └── posts.ts               # 文章读取逻辑
├── i18n/
│   ├── routing.ts             # 路由配置
│   └── request.ts             # 服务端 i18n
└── proxy.ts                   # 路由中间件
```

---

## 写作文章

在 `content/posts/zh/` 或 `content/posts/en/` 下创建 Markdown 文件，使用以下 frontmatter：

```yaml
---
title: '文章标题'
excerpt: '文章摘要，显示在列表页'
date: 'YYYY-MM-DD'
category: 'self-improvement'
readTime: 5
slug: 'url-slug'
---
```

**支持的分类：**

| slug                 | 显示名称   |
| -------------------- | ---------- |
| `self-improvement`   | 自我提升   |
| `super-individual`   | 超级个体   |
| `one-person-company` | 一人公司   |
| `viral-growth`       | 病毒式增长 |
| `tools`              | 工具与实战 |

> 注意：YAML 字符串中避免使用 ASCII 双引号，改用弯引号或单引号包裹整个值。

---

## 环境变量

在项目根目录创建 `.env.local`：

```env
RESEND_API_KEY=your_resend_api_key
```

---

## 部署

推荐部署到 [Vercel](https://vercel.com)，导入仓库后设置 `RESEND_API_KEY` 环境变量即可。
