# M0.5 私有 GitHub 迁移与安全运行手册

**操作原则**：先只读盘点、再隔离、再预演、再经授权推送。旧工作树只读备份，不把真实密钥值贴进 Issue/PR/日志。

## 0. 手工前置条件
- Organization `YuLing-Ai-Tech` 与管理员权限已于 2026-10-17 核验；程序员加入前仍需确认 2FA、最小 Write 授权及 GitHub App 安装权限。
- DVSK 迁移目标已创建且保持空仓：[`YuLing-Ai-Tech/mini-app`](https://github.com/YuLing-Ai-Tech/mini-app)、[`YuLing-Ai-Tech/yuling-ai-ppt`](https://github.com/YuLing-Ai-Tech/yuling-ai-ppt)、[`YuLing-Ai-Tech/dvsk-platform`](https://github.com/YuLing-Ai-Tech/dvsk-platform)。
- [`YuLing-Ai-Tech/yuling-knowledge-platform`](https://github.com/YuLing-Ai-Tech/yuling-knowledge-platform) 是 Company OS 相邻知识平台；不属于本迁移手册和 DVSK 程序员授权范围。
- 确认现有代码所有权与第三方交付限制；私有仓库仍属于云端第三方存储，不等于企业数据可随意上传。
- 形成两工程目录清单、`git status`/branch/worktree/HEAD、关键文件的本地 SHA-256；不要输出敏感文件内容。

## 1. 引擎：先保全，再整理可用候选
- `git worktree list --porcelain`、`git status --porcelain=v1`、`git log --oneline --decorate -n 20`，记录 detached 与 main 的差异。确认原主线与候选版本。
- 单独备份已有历史和未提交补丁至**受控本地位置**；确认包含敏感文件的补丁不上传。备份不取代审计。
- 在新审查分支中复现候选修复，不强推 main、不删除 detached 工作树。记录每个改动对应测试和目的。
- `pnpm test:ppt` (适用 Mini-App)、Python 测试、黄金几何等运行证据需记录环境/版本；像素 5/4 不重录为通过。
- 经 Architect 审阅后生成稳定 Commit/tag，记录 SHA；Mini-App 锁定这个版本。

## 2. Mini-App：初始化前隔离
- 在原目录清点 `.env*`、`*.pem`、`*.key`、`*.p12`、`*.pfx`、`id_*`、账户/客户 CSV、日志、缓存、COS 凭证、构建产物；不要仅依赖 `.gitignore`，将秘密移到源码根目录之外且设置最小权限。
- 写 `.gitignore` 保护 `.next/`, `node_modules/`, `dist/`, `build/`, venv, `.env*`, 私钥、上传文件、临时数据。忽略规则不是防泄漏的充分条件。
- 初始 Git 提交只能使用明确审核的路径白名单 (`git add <path>...`)，先 `git diff --cached --name-status`，再进行 Gitleaks/同类扫描与人工文件审查。
- 提交前审查 Git LFS、子模块、压缩包、文档附件、历史与大文件内容；不可在公开 PR 中贴报告载荷。
- 在**私有**远端推送需用户授权；任何凭证可疑即先轮换再继续。

## 3. 一致性与可复现
- 固定 Node/pnpm、Python、OS 基础镜像、Playwright npm 包和浏览器二进制、字体校验摘要、Locale/Timezone、时间相关动画配置。
- Windows 采用 WSL2 Ubuntu，代码放 `~/projects/`，不是 `/mnt/c/`；Mac 原生调试，Linux 容器/Actions 是裁决环境。
- 为两个仓库分别保存 `BASELINE_MANIFEST.md`：应用 Commit、引擎 Commit/tag、依赖锁 SHA、Chrome build、字体 SHA、黄金基线 SHA、测试命令及 5/4 像素差异。

## 4. 推送后检查
- 只推送到任务指定的 `YuLing-Ai-Tech/<repo>`；推送前再核对 remote 和当前分支，禁止推送到个人同名仓库或 `yuling-knowledge-platform`。
- GitHub 默认分支、文件目录、敏感扫描、Actions 权限、仓库可见性均人工复核。
- 不开启自动部署；工作流最小 `contents: read` 权限，不向非可信 PR 暴露 secrets。
- 保留旧仓库与工作树直到新 CI 通过并且可回滚。

## 5. 失败及回滚
- 误上传秘密：立即冻结访问、轮换或撤销密钥、调查暴露范围；删除提交或改为 Private 不等于风险消失。
- 版本退化：恢复稳定 tag/Commit，不重写旧历史；解释根因并单开修复 Issue。
- 像素差异：停留在待裁决状态，使用统一容器重跑、留存差异图、人工批准后才能迁移 golden。
