'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EvaluationForm } from '@/components/evaluation-form';
import { CommentSection } from '@/components/comment-section';
import { SiteHeader } from '@/components/site-header';
import { Markdown } from '@/components/markdown';
import Link from 'next/link';
import { useTranslation } from '@/lib/use-translation';
import { getUserIdeaById, type UserIdea } from '@/lib/idea-store';

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

function IdeaDetailContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get('id');
  const [idea, setIdea] = useState<UserIdea | null>(null);
  const [loading, setLoading] = useState(true);
  const [participated, setParticipated] = useState(false);

  useEffect(() => {
    if (ideaId) {
      const found = getUserIdeaById(ideaId);
      setIdea(found);
    }
    setLoading(false);
  }, [ideaId]);

  const handleEvaluationSubmit = (data: any) => {
    console.log('评估已提交:', data);
  };

  const handleCommentSubmit = async (content: string, parentId?: string) => {
    console.log('评论已提交:', { content, parentId });
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleUpvote = (commentId: string) => {
    console.log('点赞评论:', commentId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <SiteHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-slate-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <SiteHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">{t('error')}</h1>
          <p className="text-slate-600 mb-6">Idea not found</p>
          <Link href="/ideas">
            <Button>← {t('navBack')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SiteHeader />

      <div className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/ideas">
              <Button variant="ghost" size="sm">← {t('navBack')}</Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{t('ideaDetail')}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Idea Header */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge className={categoryColors[idea.category]}>
                  {categoryLabels[idea.category] || idea.category}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 ml-2">
                  {t('statusEvaluating')}
                </Badge>
              </div>
              <Button
                onClick={() => setParticipated(true)}
                disabled={participated}
                variant={participated ? 'outline' : 'default'}
              >
                {participated ? `✓ ${t('participateDev')}` : t('participateDev')}
              </Button>
            </div>
            <h1 className="text-3xl font-bold mb-2">{idea.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span>{t('publishedOn')} {idea.created_at}</span>
              <span>{idea.evaluation_count} {t('evaluation').toLowerCase()}</span>
              <span>⭐ {idea.evaluation_score?.toFixed(1)}/5</span>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
              <img
                src={idea.author.avatar_url}
                alt={idea.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{idea.author.name}</div>
              <div className="text-sm text-slate-600">{idea.author.bio}</div>
            </div>
          </div>

          {/* Tags */}
          {idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {idea.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">#{tag}</Badge>
              ))}
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">{t('tabDescription')}</TabsTrigger>
              <TabsTrigger value="evaluation">{t('tabEvaluation')}</TabsTrigger>
              <TabsTrigger value="discussion">{t('tabDiscussion')}</TabsTrigger>
              <TabsTrigger value="project">{t('tabProject')}</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardHeader>
                  <CardTitle>{t('detailedDescription')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <Markdown content={idea.description} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluation">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('overallScore')}: {idea.evaluation_score?.toFixed(1)}/5</CardTitle>
                    <CardDescription>{t('basedOn')} {idea.evaluation_count} {t('evaluators')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-center py-8">
                      {t('statusEvaluating')}
                    </p>
                  </CardContent>
                </Card>
                <EvaluationForm ideaId={idea.id} onSubmit={handleEvaluationSubmit} />
              </div>
            </TabsContent>

            <TabsContent value="discussion">
              <CommentSection
                ideaId={idea.id}
                comments={idea.comments}
                onCommentSubmit={handleCommentSubmit}
                onUpvote={handleUpvote}
              />
            </TabsContent>

            <TabsContent value="project">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold mb-2">{t('projectNotStarted')}</h3>
                    <p className="text-slate-600 mb-6">
                      {t('projectNotStartedDesc')}
                    </p>
                    <Button disabled>{t('startDevDisabled')}</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default function IdeaDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <IdeaDetailContent />
    </Suspense>
  );
}
