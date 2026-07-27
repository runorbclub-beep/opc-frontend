'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewIdeaPage() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const ideaData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      tags: tags,
    };

    console.log('提交需求:', ideaData);

    // TODO: 调用API提交需求
    // const response = await fetch('/api/ideas', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(ideaData),
    // });

    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false);
      alert('需求发布成功！（演示模式）');
      router.push('/ideas');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/ideas">
              <Button variant="ghost" size="sm">← 返回</Button>
            </Link>
            <h1 className="text-xl font-bold">发布新需求</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>分享你的想法</CardTitle>
              <CardDescription>
                详细描述你的需求，社区会帮你评估可行性、市场需求和技术实现方案
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">需求标题 *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="简明扼要地描述你的想法（如：旅途自动摄影系统）"
                    className="mt-1"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">分类 *</Label>
                  <Select name="category" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cv">计算机视觉</SelectItem>
                      <SelectItem value="nlp">自然语言处理</SelectItem>
                      <SelectItem value="data">数据分析</SelectItem>
                      <SelectItem value="robotics">机器人</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">详细描述 *</Label>
                  <p className="text-sm text-slate-600 mb-2">
                    请描述：1) 解决什么问题 2) 目标用户 3) 技术方案 4) 市场规模
                  </p>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="## 问题背景&#10;描述当前遇到的问题...&#10;&#10;## 解决方案&#10;说明你的想法和方案...&#10;&#10;## 目标用户&#10;谁是你的目标用户...&#10;&#10;## 技术方案&#10;如何实现这个想法..."
                    className="mt-1 min-h-[300px] font-mono text-sm"
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <Label htmlFor="tags">标签</Label>
                  <p className="text-sm text-slate-600 mb-2">
                    添加相关标签，帮助其他开发者快速了解你的需求
                  </p>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="输入标签后按回车添加"
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      添加
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:bg-slate-300 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '发布中...' : '发布需求'}
                  </Button>
                  <Link href="/ideas">
                    <Button type="button" variant="outline">
                      取消
                    </Button>
                  </Link>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">💡 发布小贴士</h4>
                  <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                    <li>• 标题要简洁明了，让人一眼就能理解你的想法</li>
                    <li>• 详细描述中要说明问题背景、解决方案、目标用户和技术方案</li>
                    <li>• 标签有助于其他开发者发现和参与你的项目</li>
                    <li>• 发布后，社区会从多个维度评估你的想法，请保持开放心态</li>
                  </ul>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
