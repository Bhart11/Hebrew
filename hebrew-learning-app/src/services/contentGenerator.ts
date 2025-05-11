import OpenAI from 'openai';
import { PodcastEpisode } from '../types';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

interface ContentGenerationOptions {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topic?: string;
  length: 'short' | 'medium' | 'long';
}

export class ContentGenerator {
  private static instance: ContentGenerator;
  private constructor() {}

  public static getInstance(): ContentGenerator {
    if (!ContentGenerator.instance) {
      ContentGenerator.instance = new ContentGenerator();
    }
    return ContentGenerator.instance;
  }

  async generateEpisode(options: ContentGenerationOptions): Promise<PodcastEpisode> {
    const difficultyLevels = {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    };

    const prompt = `Generate a Hebrew podcast episode for ${difficultyLevels[options.difficulty]} level learners.
    Topic: ${options.topic || 'Everyday life'}
    Length: ${options.length}
    
    Return the content in JSON format with the following structure:
    {
      "title": "Episode Title",
      "transcript": "Full Hebrew transcript with natural conversation",
      "vocabulary": [
        {
          "word": "Hebrew word",
          "translation": "English translation",
          "partOfSpeech": "noun/verb/adjective/etc",
          "examples": ["Example sentences in Hebrew"]
        }
      ],
      "grammarTips": ["Grammar explanations in English"]
    }
    
    The content should:
    1. Be natural and conversational
    2. Include idiomatic expressions appropriate for the level
    3. Provide cultural context
    4. Include challenging words with explanations
    5. Use proper Hebrew grammar and sentence structure`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content;
      const episodeData = JSON.parse(response);

      return {
        id: crypto.randomUUID(),
        title: episodeData.title,
        difficulty: options.difficulty,
        transcript: episodeData.transcript,
        audioUrl: '', // Will be generated later
        vocabulary: episodeData.vocabulary.map((item: any) => ({
          ...item,
          learned: false,
          lastReviewed: new Date(),
        })),
        grammarTips: episodeData.grammarTips || [],
        level: this.getEpisodeLevel(options.difficulty),
      };
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate podcast episode');
    }
  }

  private getEpisodeLevel(difficulty: 'beginner' | 'intermediate' | 'advanced'): number {
    switch (difficulty) {
      case 'beginner':
        return Math.floor(Math.random() * 5) + 1; // Levels 1-5
      case 'intermediate':
        return Math.floor(Math.random() * 5) + 6; // Levels 6-10
      case 'advanced':
        return Math.floor(Math.random() * 5) + 11; // Levels 11-15
      default:
        return 1;
    }
  }

  async generateMultipleEpisodes(
    count: number,
    options: ContentGenerationOptions
  ): Promise<PodcastEpisode[]> {
    const episodes: PodcastEpisode[] = [];
    for (let i = 0; i < count; i++) {
      const episode = await this.generateEpisode(options);
      episodes.push(episode);
    }
    return episodes;
  }
}
