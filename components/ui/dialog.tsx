'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Modal({ isOpen, onClose, children, title, description }: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹窗内容 */}
      <div className="relative z-50 w-full max-w-md p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border">
          {/* 标题栏 */}
          {(title || description) && (
            <div className="flex items-start justify-between p-6 pb-4">
              <div>
                {title && (
                  <h2 className="text-lg font-semibold">{title}</h2>
                )}
                {description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* 内容 */}
          <div className="p-6 pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm', className)} {...props} />;
}

export function ModalHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />;
}

export function ModalTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />;
}

export function ModalDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-slate-600 dark:text-slate-400', className)} {...props} />;
}
