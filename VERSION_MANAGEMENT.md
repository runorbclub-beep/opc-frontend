# 版本检测系统

## 📋 概述

本系统实现了自动版本检测和更新机制，防止用户因浏览器缓存旧版JS而导致的注册/登录矛盾问题。

## 🎯 功能特性

### 1. 自动版本检测
- ✅ 每次打开页面自动检查版本号
- ✅ 检测到旧版本时自动清除过期登录状态
- ✅ 强制加载最新代码（绕过浏览器缓存）
- ✅ 每分钟定期检查一次版本

### 2. 智能缓存清理
- ✅ 自动清除所有 `opc-` 开头的本地存储
- ✅ 清除包含 `auth`、`user`、`session` 的数据
- ✅ 清除 sessionStorage

### 3. 强制刷新机制
- ✅ 使用时间戳参数绕过浏览器缓存
- ✅ 使用 `window.location.replace()` 替代 `reload()` 避免重复提交

## 📝 如何更新版本号

### 方法1：手动更新（推荐用于重要更新）

在 `lib/version.ts` 中修改版本号：

```typescript
export const APP_VERSION = '1.0.2'; // 从 1.0.1 升级到 1.0.2
```

### 版本号规则建议：

- **主版本号（Major）**：重大功能变更或不兼容更新
  - 示例：`1.0.0` → `2.0.0`

- **次版本号（Minor）**：新增功能，向后兼容
  - 示例：`1.0.0` → `1.1.0`

- **修订号（Patch）**：Bug修复或小改进
  - 示例：`1.0.0` → `1.0.1`

### 方法2：在关键操作前触发检查

在用户执行关键操作（如注册、登录、提交表单）前，可以手动触发版本检查：

```typescript
import { triggerVersionCheck } from '@/lib/use-version-check';

// 在关键操作前检查版本
function handleLogin() {
  triggerVersionCheck(); // 检查版本，不匹配会自动刷新
  // ... 继续登录逻辑
}
```

## 🔍 工作原理

### 版本检测流程

```
用户打开页面
    ↓
检查 localStorage 中的版本号
    ↓
版本不存在 → 保存当前版本 → 正常显示
    ↓
版本匹配 → 正常显示
    ↓
版本不匹配 → 清除过期数据 → 保存新版本 → 强制刷新
```

### 清除数据逻辑

系统会清除以下类型的本地数据：

1. 所有以 `opc-` 开头的键
2. 包含 `auth`、`user`、`session` 的键
3. 所有 sessionStorage 数据

### 强制刷新机制

刷新URL会添加以下参数：
- `v={APP_VERSION}` - 版本号
- `t={timestamp}` - 时间戳

示例：
```
https://opc.sbody.work/?v=1.0.1&t=1735689600000
```

## 🧪 测试方法

### 测试版本检测

1. **首次访问测试**：
   ```javascript
   // 打开浏览器控制台
   localStorage.removeItem('opc-app-version');
   // 刷新页面，应该看到 "🎯 首次访问" 日志
   ```

2. **版本更新测试**：
   ```javascript
   // 1. 手动设置旧版本
   localStorage.setItem('opc-app-version', '0.9.0');

   // 2. 刷新页面，应该看到以下日志：
   // ⚠️ 检测到新版本!
   // 🧹 清除过期数据和登录状态...
   // 🔄 强制重新加载页面...
   ```

3. **版本匹配测试**：
   ```javascript
   // 设置当前版本
   localStorage.setItem('opc-app-version', '1.0.1');
   // 刷新页面，应该看到 "✅ 版本匹配" 日志
   ```

## 📊 当前版本信息

- **当前版本**: `1.0.1`
- **存储键**: `opc-app-version`
- **检查间隔**: 60000ms (1分钟)

## 🔧 配置文件

所有配置都在 `lib/version.ts` 中：

```typescript
export const APP_VERSION = '1.0.1';                    // 当前版本号
export const VERSION_STORAGE_KEY = 'opc-app-version';   // 存储键名
export const VERSION_CHECK_INTERVAL = 60000;            // 检查间隔（毫秒）
```

## ⚠️ 注意事项

1. **版本更新时机**：
   - 修改了可能导致数据冲突的逻辑
   - 更新了认证/登录相关代码
   - 修改了localStorage数据结构
   - 修复了JS错误或Bug

2. **不需要更新版本的情况**：
   - 仅修改CSS样式
   - 添加新的页面组件
   - 非关键性的文本更新

3. **用户影响**：
   - 版本更新后用户会自动刷新页面
   - 所有登录状态会被清除
   - 用户需要重新登录（如果已登录）

## 📚 相关文件

- `lib/version.ts` - 版本配置和工具函数
- `lib/use-version-check.ts` - 版本检测Hook
- `components/version-checker.tsx` - 版本检测组件
- `app/layout.tsx` - 根布局（包含VersionChecker）

## 🚀 快速开始

1. 更新版本号：编辑 `lib/version.ts`
2. 测试版本检测：参考上面的测试方法
3. 部署新版本：`npm run build && npx wrangler pages deploy . --project-name=opc-frontend`
4. 验证：访问网站，检查浏览器控制台日志

## 💡 最佳实践

1. **定期更新版本号**：每次重要更新后递增版本号
2. **记录版本变更**：在Git commit message中说明版本变更原因
3. **测试版本检测**：在部署前使用开发者工具测试版本检测流程
4. **监控用户反馈**：关注用户是否频繁遇到强制刷新的情况

## 🔍 故障排除

### 用户反馈频繁刷新

**可能原因**：
- 版本号更新过于频繁
- 检查间隔设置过短

**解决方案**：
- 只在必要时更新版本号
- 增加 `VERSION_CHECK_INTERVAL` 值

### 版本检测不生效

**可能原因**：
- localStorage被禁用
- 浏览器隐私设置过严格

**解决方案**：
- 检查浏览器控制台是否有错误
- 建议用户启用localStorage
