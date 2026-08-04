'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Mic, StopCircle, Check, X, Loader2 } from 'lucide-react';

interface Item {
  name: string;
  quantity?: string;
  category?: string;
  notes?: string;
  detectedLanguage: string;
}

interface VoiceItemInputProps {
  onItemSaved?: (item: Item) => void;
}

export function VoiceItemInput({ onItemSaved }: VoiceItemInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');
  const [extractedItem, setExtractedItem] = useState<Item | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  const recognitionRef = useRef<any>(null);

  // 初始化语音识别
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'auto'; // 自动检测语言

      recognitionInstance.onstart = () => {
        setIsRecording(true);
        setTranscript('');
        setDetectedLanguage('');
        setExtractedItem(null);
      };

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            // 检测语言
            const lang = event.results[i][0].lang || 'unknown';
            setDetectedLanguage(lang);
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsProcessing(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
        if (transcript) {
          processTranscript(transcript, detectedLanguage);
        }
      };

      setRecognition(recognitionInstance);
      recognitionRef.current = recognitionInstance;
    } else {
      console.warn('Speech recognition not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // 处理语音转文字，提取物品信息
  const processTranscript = async (text: string, lang: string) => {
    setIsProcessing(true);

    try {
      // 模拟AI解析物品信息（实际应调用后端API）
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 简单的物品信息提取逻辑
      const item: Item = {
        name: extractItemName(text),
        quantity: extractQuantity(text),
        category: detectCategory(text),
        notes: text,
        detectedLanguage: lang || 'unknown',
      };

      setExtractedItem(item);
    } catch (error) {
      console.error('Error processing transcript:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // 提取物品名称
  const extractItemName = (text: string): string => {
    // 简单逻辑：取前几个关键词
    const words = text.split(/\s+/).slice(0, 3);
    return words.join(' ');
  };

  // 提取数量
  const extractQuantity = (text: string): string | undefined => {
    const quantityPatterns = [
      /(\d+)\s*(个|件|台|部|只|支|条|瓶|盒)/,
      /(\d+)\s*(pieces?|items?|units?)/,
      /^(\d+)/,
    ];

    for (const pattern of quantityPatterns) {
      const match = text.match(pattern);
      if (match) return match[1];
    }

    return undefined;
  };

  // 检测类别
  const detectCategory = (text: string): string | undefined => {
    const categories = {
      '电子': /手机|电脑|平板|耳机|充电器|键盘|鼠标|电子/,
      'Electronics': /phone|laptop|tablet|headphone|charger|keyboard|mouse|electronic/i,
      '食品': /食品|食物|零食|饮料|水果|蔬菜|肉/,
      'Food': /food|snack|drink|fruit|vegetable|meat/i,
      '衣物': /衣服|裤子|鞋子|帽子|衬衫|外套|裙/,
      'Clothing': /clothes|pants|shoes|hat|shirt|jacket|dress/i,
      '日用品': /牙刷|毛巾|洗发水|肥皂|纸巾|洗涤|清洁/,
      'Daily': /toothbrush|towel|shampoo|soap|tissue|detergent|cleaner/i,
    };

    for (const [category, pattern] of Object.entries(categories)) {
      if (pattern.test(text)) return category;
    }

    return undefined;
  };

  // 开始录制
  const startRecording = () => {
    if (recognition) {
      recognition.start();
    }
  };

  // 停止录制
  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
    }
  };

  // 确认保存
  const handleConfirm = () => {
    if (extractedItem && onItemSaved) {
      onItemSaved(extractedItem);
      // 重置状态
      setTranscript('');
      setDetectedLanguage('');
      setExtractedItem(null);
    }
  };

  // 取消/重新录制
  const handleCancel = () => {
    setTranscript('');
    setDetectedLanguage('');
    setExtractedItem(null);
  };

  // 获取语言显示名称
  const getLanguageDisplayName = (lang: string): string => {
    const languageNames: Record<string, string> = {
      'zh-CN': '中文（简体）',
      'zh-TW': '中文（繁体）',
      'en-US': '英语（美国）',
      'en-GB': '英语（英国）',
      'ja-JP': '日语',
      'ko-KR': '韩语',
      'es-ES': '西班牙语',
      'fr-FR': '法语',
      'de-DE': '德语',
      'unknown': '未知',
    };

    return languageNames[lang] || lang;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          语音物品输入
        </CardTitle>
        <CardDescription>
          点击麦克风按钮，说出物品信息，系统将自动识别语言并提取信息
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 录制按钮 */}
        <div className="flex items-center justify-center gap-4">
          {!isRecording && !transcript && (
            <Button
              onClick={startRecording}
              disabled={!recognition}
              size="lg"
              className="w-full"
            >
              <Mic className="h-5 w-5 mr-2" />
              开始录音
            </Button>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              variant="destructive"
              size="lg"
              className="w-full"
            >
              <StopCircle className="h-5 w-5 mr-2" />
              停止录音
            </Button>
          )}

          {!isRecording && transcript && (
            <Button
              onClick={startRecording}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <Mic className="h-5 w-5 mr-2" />
              重新录音
            </Button>
          )}
        </div>

        {/* 处理中状态 */}
        {isProcessing && (
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            正在处理...
          </div>
        )}

        {/* 识别结果 */}
        {transcript && !isProcessing && (
          <div className="space-y-4">
            {/* 语言标签 */}
            {detectedLanguage && (
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  检测到语言: {getLanguageDisplayName(detectedLanguage)}
                </Badge>
              </div>
            )}

            {/* 原始文本 */}
            <div>
              <Label className="text-sm text-slate-600">识别到的内容：</Label>
              <p className="mt-1 p-3 bg-slate-50 rounded-lg border">
                {transcript}
              </p>
            </div>

            {/* 提取的物品信息 */}
            {extractedItem && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold mb-3">提取的物品信息：</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">名称：</span>
                    <span className="font-medium">{extractedItem.name}</span>
                  </div>
                  {extractedItem.quantity && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">数量：</span>
                      <span className="font-medium">{extractedItem.quantity}</span>
                    </div>
                  )}
                  {extractedItem.category && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">类别：</span>
                      <span className="font-medium">{extractedItem.category}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 确认/取消按钮 */}
            {extractedItem && (
              <div className="flex gap-2">
                <Button
                  onClick={handleConfirm}
                  className="flex-1"
                  size="lg"
                >
                  <Check className="h-4 w-4 mr-2" />
                  确认保存
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <X className="h-4 w-4 mr-2" />
                  取消
                </Button>
              </div>
            )}
          </div>
        )}

        {/* 浏览器不支持提示 */}
        {!recognition && (
          <div className="text-center text-sm text-slate-600 p-4 bg-slate-50 rounded-lg border">
            ⚠️ 您的浏览器不支持语音识别功能。请使用 Chrome、Edge 或 Safari 浏览器。
          </div>
        )}
      </CardContent>
    </Card>
  );
}
