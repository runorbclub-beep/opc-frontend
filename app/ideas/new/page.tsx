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
import { SiteHeader } from '@/components/site-header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/use-translation';

export default function NewIdeaPage() {
  const router = useRouter();
  const { t } = useTranslation();
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
      alert(t('ideaPublishSuccess'));
      router.push('/ideas');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SiteHeader />

      {/* Page Header */}
      <div className="border-b bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/ideas">
              <Button variant="ghost" size="sm">← {t('navBack')}</Button>
            </Link>
            <h1 className="text-xl font-bold">{t('newIdeaTitle')}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t('shareYourIdea')}</CardTitle>
              <CardDescription>
                {t('newIdeaDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">{t('title')} *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder={t('titlePlaceholder')}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">{t('category')} *</Label>
                  <Select name="category" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t('selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cv">{t('categoryCV')}</SelectItem>
                      <SelectItem value="nlp">{t('categoryNLP')}</SelectItem>
                      <SelectItem value="data">{t('categoryData')}</SelectItem>
                      <SelectItem value="robotics">{t('categoryRobotics')}</SelectItem>
                      <SelectItem value="other">{t('categoryOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">{t('description')} *</Label>
                  <p className="text-sm text-slate-600 mb-2">
                    {t('descriptionHint')}
                  </p>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder={t('descriptionPlaceholder')}
                    className="mt-1 min-h-[300px] font-mono text-sm"
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <Label htmlFor="tags">{t('tags')}</Label>
                  <p className="text-sm text-slate-600 mb-2">
                    {t('tagsHint')}
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
                      placeholder={t('tagsPlaceholder')}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      {t('addTag')}
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
                    {isSubmitting ? t('submitting') : t('submitIdea')}
                  </Button>
                  <Link href="/ideas">
                    <Button type="button" variant="outline">
                      {t('cancel')}
                    </Button>
                  </Link>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">💡 {t('publishTips')}</h4>
                  <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                    <li>• {t('tip1')}</li>
                    <li>• {t('tip2')}</li>
                    <li>• {t('tip3')}</li>
                    <li>• {t('tip4')}</li>
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
