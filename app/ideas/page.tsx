'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import Link from 'next/link';
import { useTranslation } from '@/lib/use-translation';

// 模拟数据（后续会从API获取）
const mockIdeas = [
  {
    id: '1',
    title: '旅途自动摄影系统',
    description: '旅游时自动识别最佳拍摄角度和光线，智能抓拍精彩瞬间，让旅行摄影更轻松',
    category: 'cv',
    status: 'evaluating',
    evaluation_score: 4.5,
    evaluation_count: 12,
    author: {
      name: '张三',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    created_at: '2025-01-15',
    tags: ['计算机视觉', '摄影', '旅游']
  },
  {
    id: '2',
    title: 'AI面试辅导助手',
    description: '实时分析面试对话，提供专业建议和改进方案，帮助求职者提升表现',
    category: 'nlp',
    status: 'approved',
    evaluation_score: 4.2,
    evaluation_count: 8,
    author: {
      name: '李四',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
    },
    created_at: '2025-01-14',
    tags: ['NLP', '面试', '教育']
  },
  {
    id: '3',
    title: '智能家居能耗优化系统',
    description: '基于AI学习的家庭能耗管理系统，自动优化用电策略，节省30%以上电费',
    category: 'other',
    status: 'developing',
    evaluation_score: 4.8,
    evaluation_count: 20,
    author: {
      name: '王五',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    created_at: '2025-01-13',
    tags: ['IoT', '节能', 'AI']
  }
];

const categoryColors: Record<string, string> = {
  cv: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  nlp: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  data: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  robotics: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

const categoryLabels: Record<string, string> = {
  cv: 'CV',
  nlp: 'NLP',
  data: 'Data',
  robotics: 'Robotics',
  other: 'Other'
};

export default function IdeasPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const statusLabels: Record<string, { label: string; color: string }> = {
    evaluating: { label: t('statusEvaluating'), color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
    approved: { label: t('statusApproved'), color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    developing: { label: t('statusDeveloping'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    completed: { label: t('statusCompleted'), color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' }
  };

  const filteredIdeas = selectedCategory === 'all'
    ? mockIdeas
    : mockIdeas.filter((idea) => idea.category === selectedCategory);

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: t('ideasFilterAll') },
    { key: 'cv', label: t('ideasFilterCV') },
    { key: 'nlp', label: t('ideasFilterNLP') },
    { key: 'data', label: t('ideasFilterData') },
    { key: 'robotics', label: t('ideasFilterRobotics') },
    { key: 'other', label: t('ideasFilterOther') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SiteHeader />

      {/* Page Header */}
      <div className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('ideasTitle')}</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('ideasSubtitle')}
              </p>
            </div>
            <Link href="/ideas/new">
              <Button>{t('publishIdea')}</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={selectedCategory === 'all' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedCategory('all')}>{t('ideasFilterAll')}</Button>
          <Button variant={selectedCategory === 'cv' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedCategory('cv')}>{t('ideasFilterCV')}</Button>
          <Button variant={selectedCategory === 'nlp' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedCategory('nlp')}>{t('ideasFilterNLP')}</Button>
          <Button variant={selectedCategory === 'data' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedCategory('data')}>{t('ideasFilterData')}</Button>
          <Button variant={selectedCategory === 'robotics' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedCategory('robotics')}>{t('ideasFilterRobotics')}</Button>
          <Button variant={selectedCategory === 'other' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedCategory('other')}>{t('ideasFilterOther')}</Button>
        </div>

        {/* Ideas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <Link key={idea.id} href={`/ideas/${idea.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                        <img
                          src={idea.author.avatar_url}
                          alt={idea.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-slate-600">{idea.author.name}</span>
                    </div>
                    <Badge className={categoryColors[idea.category]}>
                      {categoryLabels[idea.category] || idea.category.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{idea.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">
                    {idea.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {idea.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        ⭐ {idea.evaluation_score?.toFixed(1) || '-'}/5
                      </span>
                      <span className="text-slate-500">
                        {idea.evaluation_count || 0} {t('evaluation').toLowerCase()}
                      </span>
                    </div>
                    <Badge className={statusLabels[idea.status]?.color}>
                      {statusLabels[idea.status]?.label}
                    </Badge>
                  </div>

                  <div className="mt-3 pt-3 border-t text-xs text-slate-500">
                    {t('publishedOn')} {idea.created_at}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredIdeas.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">{t('noIdeas')}</h3>
            <p className="text-slate-600 mb-6">{t('noIdeasDesc')}</p>
            <Link href="/ideas/new">
              <Button>{t('publishIdea')}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
