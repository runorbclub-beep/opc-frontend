'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SiteHeader } from '@/components/site-header';
import { useTranslation } from '@/lib/use-translation';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SiteHeader />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8">
            {t('heroSubtitle')}
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            {t('heroDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ideas/new">
              <Button size="lg" className="w-full sm:w-auto">
                {t('publishIdea')}
              </Button>
            </Link>
            <Link href="/ideas">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t('browseIdeas')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                {t('featureIdeaTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('featureIdeaDesc')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                {t('featureValidationTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('featureValidationDesc')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤝</span>
                {t('featureCollaborationTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('featureCollaborationDesc')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example Ideas */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('examplesTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{t('example1Title')}</CardTitle>
                  <Badge>{t('example1Category')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {t('example1Desc')}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>⭐ {t('evaluation')}: 4.5/5</span>
                  <span>💬 12 {t('comments')}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{t('example2Title')}</CardTitle>
                  <Badge>{t('example2Category')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {t('example2Desc')}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>⭐ {t('evaluation')}: 4.2/5</span>
                  <span>💬 8 {t('comments')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{t('ctaTitle')}</CardTitle>
            <CardDescription className="text-slate-100">
              {t('ctaDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/ideas/new">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {t('ctaButton')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
