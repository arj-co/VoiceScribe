import { ModeConfig, PracticeMode } from '../../types/app';

export const MODES: ModeConfig[] = [
  {
    id: 'job-interview',
    title: 'Job Interview',
    description: 'Practice common interview questions with real-time feedback',
    prompts: [
      'Tell me about yourself.',
      'Why should we hire you?',
      'Describe a challenge you overcame.',
      'Tell me about a time you worked in a team.',
      'What is your biggest weakness?'
    ]
  },
  {
    id: 'presentation',
    title: 'Class Presentation',
    description: 'Practice presenting ideas clearly and confidently',
    prompts: [
      'Explain a topic you are passionate about.',
      'Present a solution to a real-world problem.',
      'Convince your audience of an idea.',
      'Explain a complex concept in simple terms.'
    ]
  },
  {
    id: 'custom',
    title: 'Custom Practice',
    description: 'Upload your own content or write a custom prompt',
    prompts: []
  }
];
