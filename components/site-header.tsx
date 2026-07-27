'use client';

import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from '@/lib/use-translation';

export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OPC
            </h1>
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/ideas">
              <Button variant="ghost" size="sm">
                {t('navIdeas')}
              </Button>
            </Link>
            <Link href="/ideas/new">
              <Button size="sm">
                {t('navNewIdea')}
              </Button>
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}
