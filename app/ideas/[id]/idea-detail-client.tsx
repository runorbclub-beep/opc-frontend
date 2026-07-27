'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EvaluationForm } from '@/components/evaluation-form';
import { CommentSection } from '@/components/comment-section';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 模拟数据
const mockIdea = {
  id: '1',
  title: '旅途自动摄影系统',
  description: `## 问题背景

旅游时，我们经常遇到这样的困扰：
- 错过最佳拍摄时机
- 不懂专业摄影技巧
- 忙于欣赏风景，忘记拍照
- 拍出来的照片不够理想

## 解决方案

开发一个智能摄影系统，能够：
1. **自动识别场景**：识别风景、人物、美食等不同场景
2. **智能构图建议**：基于黄金分割、三分法等规则提供构图建议
3. **最佳时机提醒**：在光线、角度最佳时提醒拍摄
4. **自动抓拍**：检测到精彩瞬间（如笑脸、美景）时自动拍摄

## 技术方案

- **计算机视觉**：使用YOLO、OpenCV进行场景识别
- **深度学习**：训练模型识别高质量照片
- **移动开发**：iOS/Android原生应用
- **云端服务**：照片存储和AI处理

## 目标用户

- 旅行爱好者
- 摄影初学者
- 内容创作者
- 社交媒体用户

## 市场规模

- 全球旅行者：12亿+
- 智能手机用户：60亿+
- 潜在市场：100亿美元+`,
  category: 'cv',
  status: 'evaluating',
  evaluation_score: 4.5,
  evaluation_count: 12,
  author: {
    id: 'user1',
    name: '张三',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    bio: 'AI产品经理 | 旅行摄影爱好者',
    skills: ['产品管理', '摄影', 'AI']
  },
  created_at: '2025-01-15',
  tags: ['计算机视觉', '摄影', '旅游', '移动应用'],
  evaluations: [
    {
      id: 'eval1',
      market_demand: 5,
      user_scale: 4,
      payment_willingness: 4,
      tech_feasibility: 5,
      resource_input: 4,
      user: {
        name: '李四',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
      },
      created_at: '2025-01-16'
    }
  ],
  comments: [
    {
      id: 'comment1',
      content: '很棒的想法！我也遇到过这样的问题。建议增加一个功能：可以学习用户的拍摄偏好。',
      user: {
        name: '王五',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      upvotes: 5,
      created_at: '2025-01-16',
      replies: [
        {
          id: 'comment2',
          content: '好建议！我们会考虑加入个性化推荐功能。',
          user: {
            name: '张三',
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
          },
          upvotes: 2,
          created_at: '2025-01-16'
        }
      ]
    }
  ]
};

const categoryColors: Record<string, string> = {
  cv: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  nlp: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  data: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  robotics: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

export default function IdeaDetailPage() {
  const idea = mockIdea;

  const handleEvaluationSubmit = (data: any) => {
    console.log('评估已提交:', data);
    // TODO: 刷新评估数据
  };

  const handleCommentSubmit = async (content: string, parentId?: string) => {
    console.log('评论已提交:', { content, parentId });
    // TODO: 刷新评论数据
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleUpvote = (commentId: string) => {
    console.log('点赞评论:', commentId);
    // TODO: 更新点赞数
  };

  const avgScores = idea.evaluations.length > 0 ? {
    market_demand: idea.evaluations.reduce((sum, e) => sum + e.market_demand, 0) / idea.evaluations.length,
    user_scale: idea.evaluations.reduce((sum, e) => sum + e.user_scale, 0) / idea.evaluations.length,
    payment_willingness: idea.evaluations.reduce((sum, e) => sum + e.payment_willingness, 0) / idea.evaluations.length,
    tech_feasibility: idea.evaluations.reduce((sum, e) => sum + e.tech_feasibility, 0) / idea.evaluations.length,
    resource_input: idea.evaluations.reduce((sum, e) => sum + e.resource_input, 0) / idea.evaluations.length,
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/ideas">
              <Button variant="ghost" size="sm">← 返回列表</Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">需求详情</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={categoryColors[idea.category]}>
                    {idea.category.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{idea.status}</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{idea.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>创建于 {idea.created_at}</span>
                  <span>{idea.evaluation_count} 评估</span>
                  <span>⭐ {idea.evaluation_score?.toFixed(1)}/5</span>
                </div>
              </div>
              <Button>参与开发</Button>
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
              <div className="flex gap-1">
                {idea.author.skills?.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {idea.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Content */}
          <Tabs defaultValue="description" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">需求描述</TabsTrigger>
              <TabsTrigger value="evaluation">评估结果</TabsTrigger>
              <TabsTrigger value="discussion">讨论区</TabsTrigger>
              <TabsTrigger value="project">项目进展</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardHeader>
                  <CardTitle>详细描述</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p style={{ whiteSpace: 'pre-line' }}>{idea.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluation">
              <div className="space-y-6">
                {/* Overall Score */}
                {avgScores && (
                  <Card>
                    <CardHeader>
                      <CardTitle>综合评分: {idea.evaluation_score?.toFixed(1)}/5</CardTitle>
                      <CardDescription>基于 {idea.evaluation_count} 位社区成员的评估</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>市场需求</span>
                            <span>{avgScores.market_demand.toFixed(1)}/5</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(avgScores.market_demand / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>用户规模</span>
                            <span>{avgScores.user_scale.toFixed(1)}/5</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(avgScores.user_scale / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>付费意愿</span>
                            <span>{avgScores.payment_willingness.toFixed(1)}/5</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${(avgScores.payment_willingness / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>技术可行性</span>
                            <span>{avgScores.tech_feasibility.toFixed(1)}/5</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: `${(avgScores.tech_feasibility / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>资源投入</span>
                            <span>{avgScores.resource_input.toFixed(1)}/5</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-slate-600 h-2 rounded-full"
                              style={{ width: `${(avgScores.resource_input / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Evaluation Form */}
                <EvaluationForm
                  ideaId={idea.id}
                  onSubmit={handleEvaluationSubmit}
                />
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
                    <h3 className="text-xl font-semibold mb-2">项目尚未启动</h3>
                    <p className="text-slate-600 mb-6">
                      这个需求还在评估阶段。一旦通过评估，就可以开始组建团队并启动开发。
                    </p>
                    <Button disabled>开始开发（需要评估通过）</Button>
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
