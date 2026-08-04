/**
 * OPC 需求投票 API (Cloudflare Pages Functions)
 *
 * POST /api/vote
 *   body: { ideaId: string, ideaTitle?: string, ideaDesc?: string }
 *   → 给需求 +1 同意票，返回最新计数
 *   → 达到 100 票时：标记启动，并异步调用 DeepSeek 生成初步方案
 *
 * GET /api/vote?ideaId=xxx
 *   → 返回 { count, target, launched, generated }
 */

interface Env {
  OPC_VOTES: Cloudflare.KVNamespace;
  DEEPSEEK_API_KEY?: string;
  VOTE_TARGET?: string;
}

const TARGET = 100;

export async function onRequest(context: {
  request: Request;
  env: Env;
  waitUntil: (p: Promise<any>) => void;
}): Promise<Response> {
  const { request, env, waitUntil } = context;
  const url = new URL(request.url);

  // ── GET: 查询状态 ──
  if (request.method === "GET") {
    const ideaId = url.searchParams.get("ideaId");
    if (!ideaId) return json({ error: "ideaId required" }, 400);

    const countStr = await env.OPC_VOTES.get(`vote:${ideaId}`);
    const launched = (await env.OPC_VOTES.get(`launch:${ideaId}`)) !== null;
    const genRaw = await env.OPC_VOTES.get(`gen:${ideaId}`);

    return json({
      ideaId,
      count: countStr ? parseInt(countStr, 10) : 0,
      target: TARGET,
      launched,
      generated: genRaw ? JSON.parse(genRaw) : null,
    });
  }

  // ── POST: 投票 ──
  if (request.method === "POST") {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return json({ error: "invalid JSON" }, 400);
    }

    const { ideaId, ideaTitle, ideaDesc } = body;
    if (!ideaId) return json({ error: "ideaId required" }, 400);

    // 已启动则不再接受投票
    const launchedKey = `launch:${ideaId}`;
    const alreadyLaunched = (await env.OPC_VOTES.get(launchedKey)) !== null;
    if (alreadyLaunched) {
      const count = await getCount(env, ideaId);
      const genRaw = await env.OPC_VOTES.get(`gen:${ideaId}`);
      return json({
        ideaId, count, target: TARGET, launched: true, alreadyVoted: true,
        generated: genRaw ? JSON.parse(genRaw) : null,
      });
    }

    // 原子递增计数（用 KV 的 read + write 简化处理；高并发场景用 D1 更稳）
    const count = await env.OPC_VOTES.get(`vote:${ideaId}`);
    const newCount = (count ? parseInt(count, 10) : 0) + 1;
    await env.OPC_VOTES.put(`vote:${ideaId}`, String(newCount));

    // 达到 100 票 → 标记启动 + 异步生成方案
    if (newCount >= TARGET) {
      await env.OPC_VOTES.put(launchedKey, new Date().toISOString());
      waitUntil(generatePlan(env, ideaId, ideaTitle || "", ideaDesc || ""));
    }

    return json({
      ideaId,
      count: newCount,
      target: TARGET,
      launched: newCount >= TARGET,
    });
  }

  return json({ error: "method not allowed" }, 405);
}

async function getCount(env: Env, ideaId: string): Promise<number> {
  const raw = await env.OPC_VOTES.get(`vote:${ideaId}`);
  return raw ? parseInt(raw, 10) : 0;
}

/** 调用 DeepSeek 生成该需求的初步方案，结果存 KV */
async function generatePlan(env: Env, ideaId: string, title: string, desc: string): Promise<void> {
  try {
    // 标记生成中
    await env.OPC_VOTES.put(`gen:${ideaId}`, JSON.stringify({ status: "generating", ts: Date.now() }));

    const apiKey = env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      await env.OPC_VOTES.put(
        `gen:${ideaId}`,
        JSON.stringify({ status: "error", error: "DEEPSEEK_API_KEY not configured", ts: Date.now() })
      );
      return;
    }

    const prompt = `你是 OPC 一人公司平台的 AI 方案工程师。请为下面的用户需求生成一份"初步实施方案"，要求：

1. 用中文回答，结构清晰，使用 Markdown
2. 包含以下部分：
   - ## 需求概述（1-2句话）
   - ## MVP 范围（最小的可用功能，不超过5项）
   - ## 技术选型（推荐具体技术栈，考虑单人可维护）
   - ## 实施步骤（分3-5步，每步给出产出物）
   - ## 预估周期（以天为单位）
   - ## 成本估算（尽量低，体现一人公司理念）

需求标题：${title || "(未提供)"}
需求描述：${desc || "(未提供)"}`;

    const resp = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是 OPC 一人公司平台的 AI 方案工程师，擅长为个人创业者生成低成本的初步实施方案。" },
          { role: "user", content: prompt },
        ],
        max_tokens: 2500,
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      await env.OPC_VOTES.put(
        `gen:${ideaId}`,
        JSON.stringify({ status: "error", error: `DeepSeek API ${resp.status}: ${errText.slice(0, 200)}`, ts: Date.now() })
      );
      return;
    }

    const data: any = await resp.json();
    const content: string = data?.choices?.[0]?.message?.content || "";

    await env.OPC_VOTES.put(
      `gen:${ideaId}`,
      JSON.stringify({ status: "done", content, ts: Date.now() })
    );
  } catch (err: any) {
    await env.OPC_VOTES.put(
      `gen:${ideaId}`,
      JSON.stringify({ status: "error", error: String(err?.message || err), ts: Date.now() })
    );
  }
}

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
