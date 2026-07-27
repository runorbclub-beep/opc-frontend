export type Locale = 'zh' | 'en';

export const translations = {
  zh: {
    // Hero
    heroTitle: 'OPC - Open Problem & Collaboration',
    heroSubtitle: 'AI时代的供需对接与协同开发平台',
    heroDescription: '从想法到产品的完整闭环：市场验证 + 技术协作 + 众筹支持',
    publishIdea: '发布你的想法',
    browseIdeas: '浏览需求',

    // Features
    featureIdeaTitle: '需求发布',
    featureIdeaDesc: '提出你的想法和需求，让社区帮你评估可行性、市场需求和技术实现方案',
    featureValidationTitle: '市场验证',
    featureValidationDesc: '社区从市场需求、技术可行性、资源投入等多维度评估，确保项目成功率',
    featureCollaborationTitle: '协同开发',
    featureCollaborationDesc: '通过评估的项目可以组建团队、分配任务、设置赏金，共同协作开发',

    // Examples
    examplesTitle: '热门需求示例',
    example1Title: '旅途自动摄影系统',
    example1Desc: '旅游时自动识别最佳拍摄角度和光线，智能抓拍精彩瞬间',
    example1Category: '计算机视觉',
    example2Title: 'AI面试辅导助手',
    example2Desc: '实时分析面试对话，提供专业建议和改进方案，帮助求职者提升表现',
    example2Category: 'NLP',
    evaluation: '评估',
    comments: '评论',

    // CTA
    ctaTitle: '准备好开始了吗？',
    ctaDescription: '加入我们，一起构建AI驱动的未来',
    ctaButton: '立即发布想法',

    // Navigation
    navHome: '首页',
    navIdeas: '需求列表',
    navNewIdea: '发布需求',
    navBack: '返回列表',

    // Ideas List
    ideasTitle: '需求列表',
    ideasFilterAll: '全部',
    ideasFilterCV: '计算机视觉',
    ideasFilterNLP: '自然语言处理',
    ideasFilterData: '数据分析',
    ideasFilterRobotics: '机器人',
    ideasFilterOther: '其他',

    // Idea Detail
    ideaDetail: '需求详情',
    createdBy: '创建于',
    ideaStatus: '状态',
    tabDescription: '需求描述',
    tabEvaluation: '评估结果',
    tabDiscussion: '讨论区',
    tabProject: '项目进展',
    participateDev: '参与开发',

    // Evaluation
    overallScore: '综合评分',
    basedOn: '基于',
    evaluators: '位社区成员的评估',
    marketDemand: '市场需求',
    userScale: '用户规模',
    paymentWillingness: '付费意愿',
    techFeasibility: '技术可行性',
    resourceInput: '资源投入',
    low: '低',
    medium: '中',
    high: '高',
    submitEvaluation: '提交评估',
    evaluationNote: '提交后您的评估将公开显示，请客观公正地评分',
    evaluationSuccess: '评估已提交',
    evaluationSuccessDesc: '感谢您的参与！您的评估将帮助社区判断这个项目是否值得开发。',
    yourScore: '您的综合评分',
    optionalComment: '补充说明（可选）',
    optionalCommentDesc: '分享你对这个想法的看法，或者提出改进建议',
    yourThoughts: '你的想法和建议...',
    submitting: '提交中...',

    // Comments
    noComments: '还没有评论',
    noCommentsDesc: '成为第一个发表看法的人吧！',
    shareThoughts: '分享你的看法...',
    beFriendly: '请保持友善和建设性的讨论',
    postComment: '发表评论',
    reply: '回复',
    replies: '条回复',
    postReply: '发表回复',
    cancelReply: '取消',
    replyTo: '回复',
    anonymous: '匿名用户',
    minutesAgo: (n: number) => `${n}分钟前`,
    hoursAgo: (n: number) => `${n}小时前`,
    daysAgo: (n: number) => `${n}天前`,

    // New Idea
    newIdeaTitle: '发布新需求',
    newIdeaDesc: '分享你的想法，让社区一起评估和完善',
    titlePlaceholder: '简短描述你的想法',
    title: '标题',
    category: '分类',
    categoryCV: '计算机视觉',
    categoryNLP: '自然语言处理',
    categoryData: '数据分析',
    categoryRobotics: '机器人技术',
    categoryOther: '其他',
    description: '详细描述',
    descriptionPlaceholder: '详细描述你的想法、目标用户、市场机会等...',
    tags: '标签',
    tagsPlaceholder: '添加标签，按回车确认',
    submitIdea: '发布需求',
    cancel: '取消',

    // Common
    loading: '加载中...',
    error: '出错了',
    retry: '重试',
  },
  en: {
    // Hero
    heroTitle: 'OPC - Open Problem & Collaboration',
    heroSubtitle: 'AI-Driven Supply-Demand Exchange & Collaborative Development Platform',
    heroDescription: 'Complete loop from idea to product: Market Validation + Tech Collaboration + Crowdfunding Support',
    publishIdea: 'Publish Your Idea',
    browseIdeas: 'Browse Ideas',

    // Features
    featureIdeaTitle: 'Idea Publishing',
    featureIdeaDesc: 'Share your ideas and requirements, let the community help evaluate feasibility, market demand, and technical solutions',
    featureValidationTitle: 'Market Validation',
    featureValidationDesc: 'Community evaluates from multiple dimensions including market demand, technical feasibility, and resource investment to ensure project success',
    featureCollaborationTitle: 'Collaborative Development',
    featureCollaborationDesc: 'Approved projects can build teams, assign tasks, set bounties, and collaborate on development',

    // Examples
    examplesTitle: 'Featured Ideas',
    example1Title: 'Travel Auto-Photography System',
    example1Desc: 'Automatically identify optimal angles and lighting during travel, intelligently capture amazing moments',
    example1Category: 'Computer Vision',
    example2Title: 'AI Interview Coach',
    example2Desc: 'Real-time interview analysis with professional suggestions and improvements to help job seekers succeed',
    example2Category: 'NLP',
    evaluation: 'Eval',
    comments: 'Comments',

    // CTA
    ctaTitle: 'Ready to Start?',
    ctaDescription: 'Join us to build an AI-driven future together',
    ctaButton: 'Publish Your Idea Now',

    // Navigation
    navHome: 'Home',
    navIdeas: 'Ideas',
    navNewIdea: 'New Idea',
    navBack: 'Back to List',

    // Ideas List
    ideasTitle: 'Ideas List',
    ideasFilterAll: 'All',
    ideasFilterCV: 'Computer Vision',
    ideasFilterNLP: 'NLP',
    ideasFilterData: 'Data Analysis',
    ideasFilterRobotics: 'Robotics',
    ideasFilterOther: 'Other',

    // Idea Detail
    ideaDetail: 'Idea Details',
    createdBy: 'Created',
    ideaStatus: 'Status',
    tabDescription: 'Description',
    tabEvaluation: 'Evaluation',
    tabDiscussion: 'Discussion',
    tabProject: 'Project Progress',
    participateDev: 'Participate',

    // Evaluation
    overallScore: 'Overall Score',
    basedOn: 'Based on',
    evaluators: 'community member evaluations',
    marketDemand: 'Market Demand',
    userScale: 'User Scale',
    paymentWillingness: 'Payment Willingness',
    techFeasibility: 'Technical Feasibility',
    resourceInput: 'Resource Input',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    submitEvaluation: 'Submit Evaluation',
    evaluationNote: 'Your evaluation will be displayed publicly after submission. Please rate objectively and fairly.',
    evaluationSuccess: 'Evaluation Submitted',
    evaluationSuccessDesc: 'Thank you for participating! Your evaluation will help the community determine if this project is worth developing.',
    yourScore: 'Your Overall Score',
    optionalComment: 'Additional Comments (Optional)',
    optionalCommentDesc: 'Share your thoughts on this idea or suggest improvements',
    yourThoughts: 'Your thoughts and suggestions...',
    submitting: 'Submitting...',

    // Comments
    noComments: 'No Comments Yet',
    noCommentsDesc: 'Be the first to share your thoughts!',
    shareThoughts: 'Share your thoughts...',
    beFriendly: 'Please maintain friendly and constructive discussion',
    postComment: 'Post Comment',
    reply: 'Reply',
    replies: 'replies',
    postReply: 'Post Reply',
    cancelReply: 'Cancel',
    replyTo: 'Reply',
    anonymous: 'Anonymous',
    minutesAgo: (n: number) => `${n}m ago`,
    hoursAgo: (n: number) => `${n}h ago`,
    daysAgo: (n: number) => `${n}d ago`,

    // New Idea
    newIdeaTitle: 'Publish New Idea',
    newIdeaDesc: 'Share your idea and let the community evaluate and improve it together',
    titlePlaceholder: 'Briefly describe your idea',
    title: 'Title',
    category: 'Category',
    categoryCV: 'Computer Vision',
    categoryNLP: 'Natural Language Processing',
    categoryData: 'Data Analysis',
    categoryRobotics: 'Robotics',
    categoryOther: 'Other',
    description: 'Description',
    descriptionPlaceholder: 'Describe your idea, target users, market opportunity, etc...',
    tags: 'Tags',
    tagsPlaceholder: 'Add tags and press Enter',
    submitIdea: 'Publish Idea',
    cancel: 'Cancel',

    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
  },
};

export function t(locale: Locale, key: string, ...params: any[]): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  if (typeof value === 'function') {
    return value(...params);
  }

  return value || key;
}
