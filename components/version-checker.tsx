'use client';

import { useVersionCheck } from '@/lib/use-version-check';

/**
 * 版本检测组件
 * 在应用启动时自动检查版本，确保用户始终使用最新版本
 */
export function VersionChecker(): null {
  useVersionCheck();
  return null;
}
