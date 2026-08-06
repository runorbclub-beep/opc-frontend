'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/dialog';
import { useTranslation } from '@/lib/use-translation';
import { triggerVersionCheck } from '@/lib/use-version-check';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 关键操作前检查版本
    triggerVersionCheck();

    if (!email || !password) {
      setError(t('fillAllFields'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: 实现实际的登录API调用
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });

      // 模拟登录成功
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 保存登录状态
      localStorage.setItem('opc-user', JSON.stringify({
        email,
        loginTime: new Date().toISOString(),
      }));

      alert('登录成功！');
      onClose();
    } catch (err) {
      setError('登录失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestAccess = () => {
    triggerVersionCheck();
    // 允许访客访问
    localStorage.setItem('opc-guest', 'true');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('loginTitle')}
      description={t('loginDesc')}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? t('loggingIn') : t('loginBtn')}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGuestAccess}
            disabled={isLoading}
            className="w-full"
          >
            {t('guestMode')}
          </Button>
        </div>

        <div className="text-center text-sm text-slate-600">
          {t('noAccount')}{' '}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => alert(t('signupWip'))}
          >
            {t('signupNow')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
