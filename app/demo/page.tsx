'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { VoiceItemInput } from '@/components/voice-item-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function DemoPage() {
  const [items, setItems] = useState<any[]>([]);

  const handleItemSaved = (item: any) => {
    const newItem = {
      ...item,
      timestamp: new Date().toISOString(),
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (timestamp: string) => {
    setItems(items.filter(item => item.timestamp !== timestamp));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 标题 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">功能演示</h1>
            <p className="text-slate-600 dark:text-slate-400">
              体验智能语音输入功能
            </p>
          </div>

          {/* 语音输入组件 */}
          <VoiceItemInput onItemSaved={handleItemSaved} />

          {/* 已添加的物品列表 */}
          {items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>已添加的物品</span>
                  <Badge variant="secondary">{items.length} 项</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={item.timestamp}
                      className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">
                              {item.name}
                            </span>
                            {item.category && (
                              <Badge variant="outline">{item.category}</Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                            {item.quantity && (
                              <span>数量: {item.quantity}</span>
                            )}
                            {item.detectedLanguage && (
                              <span>
                                语言: {
                                  item.detectedLanguage === 'zh-CN' ? '中文' :
                                  item.detectedLanguage === 'en-US' ? '英语' :
                                  item.detectedLanguage
                                }
                              </span>
                            )}
                            <span>
                              时间: {new Date(item.timestamp).toLocaleTimeString()}
                            </span>
                          </div>

                          {item.notes && (
                            <p className="text-sm text-slate-500 italic">
                              "{item.notes}"
                            </p>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.timestamp)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 使用说明 */}
          <Card>
            <CardHeader>
              <CardTitle>使用说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <span className="font-semibold">1.</span>
                <p>点击"开始录音"按钮，允许浏览器使用麦克风</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">2.</span>
                <p>清晰地说出物品信息，例如："我想添加一个 iPhone 手机，数量是 1 台"</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">3.</span>
                <p>系统会自动识别语言（中文、英语等）并提取物品信息</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">4.</span>
                <p>检查提取的信息是否正确，点击"确认保存"或"取消"重新录制</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">5.</span>
                <p>已添加的物品会显示在下方列表中，可以随时删除</p>
              </div>
            </CardContent>
          </Card>

          {/* 技术说明 */}
          <Card>
            <CardHeader>
              <CardTitle>技术特性</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold">✨ 语音识别</h4>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 支持多种语言自动识别</li>
                    <li>• 实时语音转文字</li>
                    <li>• 高准确率识别</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">🤖 智能提取</h4>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 自动提取物品名称</li>
                    <li>• 识别数量信息</li>
                    <li>• 智能分类物品</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
