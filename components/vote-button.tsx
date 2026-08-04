'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/use-translation';

interface VoteStatus {
  ideaId: string;
  count: number;
  target: number;
  launched: boolean;
  generated?: {
    status: 'generating' | 'done' | 'error';
    content?: string;
    error?: string;
    ts?: number;
  } | null;
}

interface VoteButtonProps {
  ideaId: string;
  ideaTitle?: string;
  ideaDesc?: string;
  /** 小尺寸模式（列表卡片用） */
  compact?: boolean;
  /** 是否显示完整进度条和状态文案 */
  showProgress?: boolean;
}

const TARGET = 100;

function getVoterId(): string {
  let id = localStorage.getItem('opc_voter_id');
  if (!id) {
    id = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('opc_voter_id', id);
  }
  return id;
}

function hasVoted(ideaId: string): boolean {
  try {
    const set = new Set<string>(JSON.parse(localStorage.getItem('opc_voted') || '[]'));
    return set.has(ideaId);
  } catch {
    return false;
  }
}

function markVoted(ideaId: string) {
  try {
    const set = new Set<string>(JSON.parse(localStorage.getItem('opc_voted') || '[]'));
    set.add(ideaId);
    localStorage.setItem('opc_voted', JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

export default function VoteButton({
  ideaId,
  ideaTitle,
  ideaDesc,
  compact = false,
  showProgress = true,
}: VoteButtonProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<VoteStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState('');

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/vote?ideaId=${encodeURIComponent(ideaId)}`);
      if (!res.ok) throw new Error('fetch failed');
      const data: VoteStatus = await res.json();
      setStatus(data);
      setVoted(hasVoted(ideaId));
    } catch {
      // 静默失败，保持已有状态
    } finally {
      setLoading(false);
    }
  }, [ideaId]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // 启动后轮询生成结果
  useEffect(() => {
    if (!status?.launched) return;
    if (status.generated?.status === 'done' || status.generated?.status === 'error') return;

    const timer = setInterval(() => {
      fetchStatus();
    }, 5000);
    return () => clearInterval(timer);
  }, [status, fetchStatus]);

  const handleVote = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (voted || status?.launched) return;
    setVoting(true);
    setError('');
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ideaId,
          ideaTitle,
          ideaDesc,
          voterId: getVoterId(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(t('voteError'));
      } else {
        markVoted(ideaId);
        setVoted(true);
        setStatus((prev) => ({
          ...(prev as VoteStatus),
          count: data.count,
          launched: data.launched,
          generated: data.generated,
        }));
      }
    } catch {
      setError(t('voteError'));
    } finally {
      setVoting(false);
    }
  };

  const count = status?.count ?? 0;
  const target = status?.target ?? TARGET;
  const launched = status?.launched ?? false;
  const generated = status?.generated;
  const percent = Math.min(100, Math.round((count / target) * 100));

  if (loading) {
    return (
      <div className="text-xs text-slate-500 animate-pulse">
        {t('voteLoading')}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="xs"
          variant={voted || launched ? 'secondary' : 'default'}
          onClick={handleVote}
          disabled={voting || voted || launched}
          className={launched ? '!bg-green-600 !text-white' : ''}
        >
          {launched ? '🚀' : voted ? '✅' : '👍'}
        </Button>
        <span className="text-xs font-medium text-slate-600">
          {count}
          {launched && <span className="text-green-600 ml-1">已启动</span>}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          {launched ? t('voteLaunched') : t('voteTitle')}
        </h3>
        <span className="text-sm font-medium text-slate-500">
          {t('voteTarget', count, target)}
        </span>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        {launched ? t('voteLaunchedDesc') : t('voteDesc')}
      </p>

      {/* Progress bar */}
      <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            launched ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-slate-500">
          {launched
            ? `${percent}%`
            : t('voteProgress', count, target)}
        </span>
        <span className="text-lg font-bold text-slate-700 dark:text-slate-200">
          {count}
        </span>
      </div>

      <Button
        size="lg"
        variant={voted || launched ? 'secondary' : 'default'}
        onClick={handleVote}
        disabled={voting || voted || launched}
        className={`w-full ${launched ? '!bg-green-600 !text-white' : ''}`}
      >
        {voting
          ? '...'
          : launched
          ? t('voteLaunched')
          : voted
          ? t('votedButton')
          : t('voteButton')}
      </Button>

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

      {/* AI generation status */}
      {launched && generated?.status === 'generating' && (
        <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-sm text-amber-700 dark:text-amber-300 animate-pulse">
          ⏳ {t('voteGenerating')}
        </div>
      )}
      {launched && generated?.status === 'done' && (
        <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-sm text-green-700 dark:text-green-300">
          ✅ {t('voteGenerateDone')}
        </div>
      )}
      {launched && generated?.status === 'error' && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-xs text-red-600">
          ⚠️ {generated.error || 'error'}
        </div>
      )}
    </div>
  );
}
