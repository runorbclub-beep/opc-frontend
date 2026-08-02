// 版本号：每次重大更新时递增
export const APP_VERSION = '1.0.1';
export const VERSION_STORAGE_KEY = 'opc-app-version';
export const VERSION_CHECK_INTERVAL = 60000; // 每分钟检查一次

// 获取存储的版本号
export function getStoredVersion(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(VERSION_STORAGE_KEY);
}

// 保存当前版本号
export function saveCurrentVersion(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(VERSION_STORAGE_KEY, APP_VERSION);
}

// 检查版本是否匹配
export function isVersionMatch(): boolean {
  const stored = getStoredVersion();
  return stored === APP_VERSION;
}

// 清除版本缓存
export function clearVersionCache(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(VERSION_STORAGE_KEY);
}
