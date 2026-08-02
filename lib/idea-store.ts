/**
 * Simple localStorage-based idea storage.
 * No backend needed — user-submitted ideas persist in the browser.
 */

export interface UserIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'evaluating';
  evaluation_score: number;
  evaluation_count: number;
  author: {
    name: string;
    avatar_url: string;
    bio: string;
  };
  created_at: string;
  tags: string[];
  evaluations: any[];
  comments: any[];
}

const STORAGE_KEY = 'opc-user-ideas';

export function getUserIdeas(): UserIdea[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserIdea(idea: Omit<UserIdea, 'id' | 'status' | 'evaluation_score' | 'evaluation_count' | 'evaluations' | 'comments' | 'created_at' | 'author'>): UserIdea {
  const ideas = getUserIdeas();
  const newIdea: UserIdea = {
    ...idea,
    id: `user-${Date.now()}`,
    status: 'evaluating',
    evaluation_score: 0,
    evaluation_count: 0,
    evaluations: [],
    comments: [],
    created_at: new Date().toISOString().slice(0, 10),
    author: {
      name: '我',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
      bio: 'OPC用户',
    },
  };
  ideas.unshift(newIdea);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }
  return newIdea;
}

export function getUserIdeaById(id: string): UserIdea | null {
  const ideas = getUserIdeas();
  return ideas.find((idea) => idea.id === id) || null;
}
