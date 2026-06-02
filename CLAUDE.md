# CLAUDE.md

本文件为在本仓库中使用 Claude Code (claude.ai/code) 的开发者提供指导。

## 仓库概述

这是一个刚刚初始化的全新仓库，目前处于初期建设阶段。它被设计为开发和文档工作的项目空间。

## 分支结构

- **main**: 生产/稳定分支。仅用于已合并和经过审查的更改。
- **claude/add-claude-documentation-RiuCx**: 用于添加 Claude 文档和建立项目结构的功能分支。

### 分支约定

1. 所有开发工作都在功能分支上进行（格式：`claude/<feature-name>`）
2. 合并到 main 时创建 Pull Request
3. 切换分支前确保所有更改已提交
4. 使用能反映工作内容的描述性分支名称

## 开发工作流程

### 快速开始

```bash
# 检查当前分支和状态
git branch -a
git status

# 获取最新更改
git fetch origin

# 切换到新功能分支
git checkout -b claude/<your-feature-name>
```

### 进行更改

1. 进行代码更改
2. 暂存更改：`git add <files>` 或 `git add .`
3. 用清晰、描述性的消息提交：`git commit -m "description"`
4. 推送到功能分支：`git push -u origin claude/<your-feature-name>`
5. 准备好时创建 Pull Request 供审查

### 提交消息约定

使用清晰的命令式提交消息：
- ✅ 好的例子："Add documentation structure"（添加文档结构）或 "Fix git configuration issue"（修复 git 配置问题）
- ❌ 避免："Updates"（更新）或 "Working on stuff"（正在处理的事情）

## 当前项目状态

本仓库已初始化，包含：
- 基本的 git 配置
- 两个分支（main 和文档功能分支）
- 最少的启动文件

## 未来开发考虑

随着项目发展，考虑添加：

1. **文档**
   - README.md（项目概述和设置说明）
   - 贡献指南
   - 架构文档

2. **配置文件**
   - .gitignore（用于语言特定的文件、依赖项等）
   - .github/workflows（用于 CI/CD，如需要）
   - 项目特定的配置文件

3. **代码结构**
   - 按功能或域组织代码
   - 建立清晰的模块边界
   - 文档化 API 契约和接口

4. **质量保证**
   - 测试套件和测试策略
   - Linting 和格式化规则
   - 用于代码质量的 Pre-commit hooks

## Git 操作

### 推送更改

```bash
# 推送到功能分支（如需要会创建远程分支）
git push -u origin claude/<your-feature-name>

# 推送到 main（仅在 PR 审查和合并后）
git push origin main
```

### 拉取最新更改

```bash
# 获取特定分支
git fetch origin <branch-name>

# 拉取并合并更改
git pull origin <branch-name>
```

## Claude Code 的常见模式

在本仓库中工作时：

1. **探索性工作**：使用功能分支进行实验和探索
2. **文档优先**：考虑文档化架构决策和模式
3. **清晰命名**：为文件、函数和分支使用清晰的描述性名称
4. **原子提交**：保持提交专注和逻辑分离
5. **定期推送**：定期推送更改以避免在短暂环境中丢失工作

## 仓库配置

本仓库配置包括：
- Remote：`origin` → 本地代理（用于开发/测试）
- 默认分支：main
- 用于协作开发的多分支设置

## 添加新内容时

1. 考虑项目的长期结构
2. 文档化主要的架构决策
3. 保持相关代码在一起
4. 使用有意义的文件和目录名称
5. 随着项目演进更新 CLAUDE.md
