'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, MessageSquare, ThumbsUp } from 'lucide-react';

interface User {
  id?: string;
  name: string;
  avatar_url?: string;
}

interface Comment {
  id: string;
  idea_id?: string;
  user_id?: string;
  user?: User;
  content: string;
  parent_id?: string;
  upvotes: number;
  created_at: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  ideaId: string;
  comments: Comment[];
  onCommentSubmit?: (content: string, parentId?: string) => void;
  onUpvote?: (commentId: string) => void;
}

export function CommentSection({ ideaId, comments, onCommentSubmit, onUpvote }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // TODO: 调用API提交评论
      console.log('提交评论:', { content: newComment, parentId: null });

      if (onCommentSubmit) {
        await onCommentSubmit(newComment);
      }

      setNewComment('');
    } catch (error) {
      console.error('提交评论失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    try {
      // TODO: 调用API提交回复
      console.log('提交回复:', { content: replyContent, parentId });

      if (onCommentSubmit) {
        await onCommentSubmit(replyContent, parentId);
      }

      setReplyContent('');
      setReplyTo(null);
    } catch (error) {
      console.error('提交回复失败:', error);
    }
  };

  const handleUpvote = (commentId: string) => {
    if (onUpvote) {
      onUpvote(commentId);
    }
  };

  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const renderComment = (comment: Comment, isReply = false) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedComments.has(comment.id);

    return (
      <div key={comment.id} className={`${isReply ? 'ml-12 pl-4 border-l-2 border-slate-200' : ''}`}>
        <Card className="mb-3">
          <CardContent className="pt-4">
            <div className="flex gap-3">
              {/* Avatar */}
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={comment.user?.avatar_url} />
                <AvatarFallback>{comment.user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-sm">{comment.user?.name || '匿名用户'}</span>
                  <span className="text-xs text-slate-500">{formatDate(comment.created_at)}</span>
                  {!isReply && hasReplies && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={() => toggleReplies(comment.id)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 mr-1" />
                      )}
                      {comment.replies?.length || 0} 条回复
                    </Button>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-sm mb-3 whitespace-pre-wrap">{comment.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(comment.id)}
                    className="gap-1"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {comment.upvotes || 0}
                  </Button>

                  {!isReply && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      回复
                    </Button>
                  )}
                </div>

                {/* Reply Input */}
                {replyTo === comment.id && (
                  <div className="mt-3 space-y-2">
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`回复 @${comment.user?.name}...`}
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        发表回复
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setReplyTo(null);
                          setReplyContent('');
                        }}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        {hasReplies && !isReply && (
          <div className={isExpanded ? 'space-y-3' : 'hidden'}>
            {comment.replies?.map(reply => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* New Comment Input */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="分享你的看法..."
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500">
                请保持友善和建设性的讨论
              </p>
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                {isSubmitting ? '发表中...' : '发表评论'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(comment => renderComment(comment))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <h3 className="font-semibold mb-2">还没有评论</h3>
            <p className="text-sm text-slate-600">
              成为第一个发表看法的人吧！
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
