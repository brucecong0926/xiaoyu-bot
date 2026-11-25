# 小鱼bot（Xiaoyu Bot）

给 DeepSeek Harness（DSH）用的一支长期在线的 Bot 团队：主 Bot、Bot 之间互发消息、群聊协作。

> 本项目基于开源项目 [DS Bot](https://github.com/Fei-Craft/DS-Bot) 修改（Apache-2.0），主要改动为包名与中文界面文案。

## ⚠️ 安装前必读

**小鱼bot 与官方版 `ds-bot`（鱼鱼bot）不能同时安装！**

两者内部插件 ID 相同（都是 `ds-bot`），同时安装会导致 DSH 启动崩溃（`duplicate factory registration for "ds-bot"`）。

安装前请先在 DSH 插件页**卸载官方 ds-bot**，卸载后重启 DSH。

## 安装

### 方式一：DSH Desktop（推荐）

1. 打开 DSH Desktop，左侧栏 → **插件** → **添加插件**
2. 输入仓库地址：`github:你的用户名/xiaoyu-bot`
3. 点击 **安装** → **立即启用**
4. 重启 DSH

### 方式二：命令行

```bash
npx @deepseek-ai/dsh@0.2.2-rc.1 plugin --profile web add github:你的用户名/xiaoyu-bot
npx @deepseek-ai/dsh@0.2.2-rc.1 web
```

> 国内网络建议在 DSH 设置里把 **Registry** 切换为**中国大陆镜像**。

## 功能

- **主 Bot**：团队的管理者。首次打开会有一个叫 Chief 的主 Bot，跟它说话即可完成初始化。
- **群聊协作**：每个群聊有管理员，负责应答并按需召唤其他 Bot；支持 @ 指定 Bot、Goal 分阶段任务。
- **Bot 独立浏览器**：每个 Bot 独立登录态，可导入 cookie，网页操作需你审批。
- **连接器**：GitHub、Gmail、QQ 邮箱、163 邮箱、远程 MCP 服务等。
- **Office 文件**：Bot 可直接创建、检查、编辑 Word / PowerPoint / Excel。
- **MCP 接入**：本机其它 Agent（Claude Desktop、Cursor、Codex）可通过 MCP 与 Bot 对话。

## 数据存放

所有数据保存在本机，不上传云端。

- 插件模式：`~/.dsh` 下的 `bot/` 和 `sessions/`
- 桌面应用：`~/.ds-bot`（首次启动时可选目录）

卸载插件或应用**不会**删除这些数据。

## 目录结构

```
.
├── package.json        # 插件元信息（name/version/exports/dsh 配置）
├── index.js            # 主入口（宿主侧）
├── client.js           # 界面模块
├── link.js             # 远端连接
├── office.js           # Office 文件能力
├── web-search.js       # 网络搜索
├── cordis.patch.yml    # DSH 插件装载配置
├── locale/             # 中文文案
├── src/                # 源码
├── LICENSE             # Apache-2.0
└── NOTICE              # 第三方声明
```

## 开发

```bash
npm install          # 安装依赖
npm run build        # 构建 client.js / link.js（需要 esbuild）
npm test             # 运行测试
```

修改源码后需重新构建并重启 DSH 才生效。

## 许可证与致谢

本项目采用 **Apache License 2.0**，详见 [LICENSE](./LICENSE) 与 [NOTICE](./NOTICE)。

- 原项目：[DS Bot](https://github.com/Fei-Craft/DS-Bot)（Copyright 2026 Fei2411 and the DS Bot contributors）
- 构建于 [DeepSeek Harness](https://github.com/deepseek-ai) 插件体系之上
- 本项目的修改内容：包名更名、中文文案调整

**免责声明**：本项目为社区项目，非 DeepSeek 官方产品，与 DeepSeek 无隶属或背书关系。Bot 使用你自己的模型额度，并会在你授权时读写文件、执行命令，重要操作请自行核对。
