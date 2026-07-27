import IdeaDetailPage from './idea-detail-client';

// 静态导出时预生成哪些 id 页面
export function generateStaticParams() {
  return [{ id: '1' }, { id: 'demo' }];
}

export default function Page() {
  return <IdeaDetailPage />;
}
