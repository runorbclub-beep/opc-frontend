import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            OPC - Open Problem & Collaboration
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8">
            AI时代的供需对接与协同开发平台
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            从想法到产品的完整闭环：市场验证 + 技术协作 + 众筹支持
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ideas/new">
              <Button size="lg" className="w-full sm:w-auto">
                发布你的想法
              </Button>
            </Link>
            <Link href="/ideas">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                浏览需求
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
                需求发布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                提出你的想法和需求，让社区帮你评估可行性、市场需求和技术实现方案
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                市场验证
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                社区从市场需求、技术可行性、资源投入等多维度评估，确保项目成功率
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤝</span>
                协同开发
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                通过评估的项目可以组建团队、分配任务、设置赏金，共同协作开发
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example Ideas */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">热门需求示例</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">旅途自动摄影系统</CardTitle>
                  <Badge>计算机视觉</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  旅游时自动识别最佳拍摄角度和光线，智能抓拍精彩瞬间
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>⭐ 评估: 4.5/5</span>
                  <span>💬 12 评论</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">AI面试辅导助手</CardTitle>
                  <Badge>NLP</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  实时分析面试对话，提供专业建议和改进方案，帮助求职者提升表现
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>⭐ 评估: 4.2/5</span>
                  <span>💬 8 评论</span>
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
            <CardTitle className="text-3xl">准备好开始了吗？</CardTitle>
            <CardDescription className="text-slate-100">
              加入我们，一起构建AI驱动的未来
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/ideas/new">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                立即发布想法
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
