/** 全局类型声明：Cloudflare Pages Functions 环境类型（无需安装 workers-types） */
declare namespace Cloudflare {
  interface KVNamespace {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
    list(options?: { prefix?: string; limit?: number }): Promise<{
      keys: { name: string }[];
      list_complete: boolean;
      cursor?: string;
    }>;
  }
}

declare const KVNamespace: Cloudflare.KVNamespace;
