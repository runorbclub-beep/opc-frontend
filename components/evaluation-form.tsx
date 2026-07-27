'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

interface EvaluationFormProps {
  ideaId: string;
  onSubmit?: (data: EvaluationData) => void;
}

export interface EvaluationData {
  idea_id: string;
  user_id: string;
  market_demand: number;
  user_scale: number;
  payment_willingness: number;
  tech_feasibility: number;
  resource_input: number;
  comment?: string;
}

const evaluationCriteria = [
  {
    key: 'market_demand',
    label: '市场需求',
    description: '这个问题是否值得解决？目标用户群体是否足够大？',
    color: 'bg-blue-500'
  },
  {
    key: 'user_scale',
    label: '用户规模',
    description: '潜在用户数量是否足够支撑商业化？',
    color: 'bg-green-500'
  },
  {
    key: 'payment_willingness',
    label: '付费意愿',
    description: '用户是否愿意为解决方案付费？',
    color: 'bg-purple-500'
  },
  {
    key: 'tech_feasibility',
    label: '技术可行性',
    description: '当前AI技术能否实现这个想法？',
    color: 'bg-orange-500'
  },
  {
    key: 'resource_input',
    label: '资源投入',
    description: '开发成本是否可控？团队能否实现？',
    color: 'bg-slate-500'
  }
];

export function EvaluationForm({ ideaId, onSubmit }: EvaluationFormProps) {
  const [scores, setScores] = useState<Record<string, number>>({
    market_demand: 3,
    user_scale: 3,
    payment_willingness: 3,
    tech_feasibility: 3,
    resource_input: 3
  });
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleScoreChange = (key: string, value: number[]) => {
    setScores(prev => ({ ...prev, [key]: value[0] }));
  };

  const calculateOverallScore = () => {
    const weights = {
      market_demand: 0.30,
      user_scale: 0.20,
      payment_willingness: 0.20,
      tech_feasibility: 0.20,
      resource_input: 0.10
    };

    return Object.entries(scores).reduce((sum, [key, value]) => {
      return sum + value * weights[key as keyof typeof weights];
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const evaluationData: EvaluationData = {
      idea_id: ideaId,
      user_id: 'demo-user', // TODO: 从用户上下文获取
      ...scores as any,
      comment: comment || undefined
    };

    try {
      // TODO: 调用API提交评估
      // const response = await fetch('/api/evaluations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(evaluationData),
      // });

      console.log('提交评估:', evaluationData);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (onSubmit) {
        onSubmit(evaluationData);
      }

      setSubmitted(true);
    } catch (error) {
      console.error('提交评估失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">评估已提交</h3>
            <p className="text-slate-600 mb-6">
              感谢您的参与！您的评估将帮助社区判断这个项目是否值得开发。
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-sm text-slate-700 dark:text-slate-300">
                <div className="flex justify-between mb-2">
                  <span>您的综合评分</span>
                  <span className="font-bold">{calculateOverallScore().toFixed(1)}/5</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>提交评估</CardTitle>
        <CardDescription>
          请从以下5个维度评估这个想法，您的评估将帮助社区做出更好的决策
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {evaluationCriteria.map((criterion) => (
            <div key={criterion.key} className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <Label className="text-base font-semibold">{criterion.label}</Label>
                  <p className="text-sm text-slate-600 mt-1">{criterion.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-700">
                    {scores[criterion.key]}
                  </div>
                  <div className="text-xs text-slate-500">/ 5</div>
                </div>
              </div>

              <div className="space-y-2">
                <Slider
                  value={[scores[criterion.key]]}
                  onValueChange={(value) => handleScoreChange(criterion.key, value as number[])}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>低</span>
                  <span>中</span>
                  <span>高</span>
                </div>
              </div>
            </div>
          ))}

          {/* Overall Score Preview */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">综合评分预览</span>
              <span className="text-2xl font-bold text-blue-600">
                {calculateOverallScore().toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              综合评分 = 市场需求×30% + 用户规模×20% + 付费意愿×20% + 技术可行性×20% + 资源投入×10%
            </p>
          </div>

          {/* Optional Comment */}
          <div>
            <Label htmlFor="comment" className="text-base font-semibold">
              补充说明（可选）
            </Label>
            <p className="text-sm text-slate-600 mb-2">
              分享你对这个想法的看法，或者提出改进建议
            </p>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="你的想法和建议..."
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? '提交中...' : '提交评估'}
          </Button>

          <p className="text-xs text-slate-500 text-center">
            提交后您的评估将公开显示，请客观公正地评分
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
