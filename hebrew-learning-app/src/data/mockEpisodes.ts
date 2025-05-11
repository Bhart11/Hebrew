import { PodcastEpisode, VocabularyItem } from '../types';

export const mockEpisodes: PodcastEpisode[] = [
  {
    id: '1',
    title: 'היום הראשון במשרד',
    difficulty: 'beginner',
    transcript: `שלום! אני כאן במשרד הראשון שלי. 
    המנהל נחמד מאוד, והוא הציג אותי לכולם. 
    יש לי מكتب גדול עם חלון יפה. 
    אני צריך ללמוד את כל הרגלים כאן.`,
    audioUrl: '/mock-audio/1.mp3',
    vocabulary: [
      {
        id: '1',
        word: 'משרד',
        translation: 'Office',
        partOfSpeech: 'noun',
        examples: ['אני עובד במשרד', 'המשרד מופת'],
        learned: false,
        lastReviewed: new Date('2025-05-10'),
      },
      {
        id: '2',
        word: 'מكتب',
        translation: 'Desk',
        partOfSpeech: 'noun',
        examples: ['יש לי מكتب גדול', 'המكتب שלי יפה'],
        learned: false,
        lastReviewed: new Date('2025-05-10'),
      },
    ],
    grammarTips: ['השימוש ב-אני עם הפועל הפעיל', 'ההבדל בין מكتب למשרד'],
    level: 2,
  },
  {
    id: '2',
    title: 'טיול בירושלים',
    difficulty: 'intermediate',
    transcript: `השבוע נסעתי לירושלים. 
    ראיתי את הקתדרלה והכיפת הסלע. 
    האנשים שם מאוד ידידותיים. 
    אוכל המiddle-east יפה מאוד.`,
    audioUrl: '/mock-audio/2.mp3',
    vocabulary: [
      {
        id: '3',
        word: 'ירושלים',
        translation: 'Jerusalem',
        partOfSpeech: 'noun',
        examples: ['אני ביקרתי בירושלים', 'ירושלים עיר יפה'],
        learned: false,
        lastReviewed: new Date('2025-05-10'),
      },
      {
        id: '4',
        word: 'הכיפת',
        translation: 'The Dome',
        partOfSpeech: 'noun',
        examples: ['הכיפת הסלע יפה', 'הכיפה לבנה'],
        learned: false,
        lastReviewed: new Date('2025-05-10'),
      },
    ],
    grammarTips: ['השימוש ב-הכיפה', 'ההבדל בין יפה ליפה'],
    level: 7,
  },
  {
    id: '3',
    title: 'היהלום של המזרח',
    difficulty: 'advanced',
    transcript: `היום אדבר על היהלום של המזרח. 
    זה כינוי לירושלים. 
    העיר מלאה היסטוריה ותרבות. 
    יש בה מונומנטים יפים וכנסיות ישנות.`,
    audioUrl: '/mock-audio/3.mp3',
    vocabulary: [
      {
        id: '5',
        word: 'יהלום',
        translation: 'Diamond',
        partOfSpeech: 'noun',
        examples: ['יהלום יקר מאוד', 'יהלום לבן'],
        learned: false,
        lastReviewed: new Date('2025-05-10'),
      },
      {
        id: '6',
        word: 'מונומנטים',
        translation: 'Monuments',
        partOfSpeech: 'noun',
        examples: ['מונומנטים יפים', 'מונומנטים ישנים'],
        learned: false,
        lastReviewed: new Date('2025-05-10'),
      },
    ],
    grammarTips: ['השימוש ב-מונומנטים', 'ההבדל בין יפה ליפה'],
    level: 12,
  },
];
