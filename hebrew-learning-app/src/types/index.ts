export interface PodcastEpisode {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  transcript: string;
  audioUrl: string;
  vocabulary: VocabularyItem[];
  grammarTips?: string[];
  level: number;
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  partOfSpeech: string;
  examples: string[];
  learned: boolean;
  lastReviewed: Date;
}

export interface UserProgress {
  userId: string;
  xp: number;
  streak: number;
  currentLevel: number;
  vocabulary: Record<string, VocabularyItem>;
  completedEpisodes: string[];
  dailyGoal: number;
  streakStartDate: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}
