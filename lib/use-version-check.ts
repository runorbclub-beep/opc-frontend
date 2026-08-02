'use client';

import { useEffect } from 'react';
import {
  APP_VERSION,
  VERSION_STORAGE_KEY,
  getStoredVersion,
  saveCurrentVersion,
  isVersionMatch,
  clearVersionCache,
} from './version';

/**
 * 清除过期登录状态和缓存数据
 */
function clearStaleData(): void {
  console.log('🧹 清除过期数据和登录状态...');

  // 清除所有可能造成矛盾的本地存储
  const keysToRemove: string[] = [];

  // 检查并清除所有 localStorage 数据
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('opc-') || key.includes('auth') || key.includes('user') || key.includes('session'))) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));

  // 清除 sessionStorage
  sessionStorage.clear();

  console.log(`✅ 已清除 ${keysToRemove.length} 个过期数据项`);
}

/**
 * 强制重新加载页面（绕过缓存）
 */
function forceReload(): void {
  console.log('🔄 强制重新加载页面...');

  // 添加时间戳参数绕过浏览器缓存
  const url = new URL(window.location.href);
  url.searchParams.set('v', APP_VERSION);
  url.searchParams.set('t', Date.now().toString());

  window.location.replace(url.toString());
}

/**
 * 版本检测Hook
 * 在应用启动时检查版本，如果版本不匹配则清除过期数据并重新加载
 */
export function useVersionCheck(): void {
  useEffect(() => {
    // 首次访问：保存当前版本
    const storedVersion = getStoredVersion();
    if (!storedVersion) {
      console.log('🎯 首次访问，保存当前版本:', APP_VERSION);
      saveCurrentVersion();
      return;
    }

    // 版本匹配：正常状态
    if (isVersionMatch()) {
      console.log('✅ 版本匹配:', APP_VERSION);
      return;
    }

    // 版本不匹配：需要更新
    console.warn('⚠️ 检测到新版本!');
    console.warn(`旧版本: ${storedVersion} → 新版本: ${APP_VERSION}`);

    // 清除过期数据
    clearStaleData();

    // 保存新版本
    saveCurrentVersion();

    // 强制重新加载
    forceReload();
  }, []);

  // 定期检查版本（可选：防止长时间未刷新）
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVersionMatch()) {
        console.log('🔄 定期检查发现版本不匹配，重新加载...');
        clearStaleData();
        saveCurrentVersion();
        forceReload();
      }
    }, 60000); // 每分钟检查一次

    return () => clearInterval(interval);
  }, []);
}

/**
 * 手动触发版本检查
 * 用于在用户执行关键操作前检查版本
 */
export function triggerVersionCheck(): void {
  if (!isVersionMatch()) {
    console.warn('⚠️ 关键操作前发现版本不匹配，重新加载...');
    clearStaleData();
    saveCurrentVersion();
    forceReload();
  }
}
