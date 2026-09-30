export interface QuizQuestionData {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: { text: string; correct: boolean }[];
  explanation: string;
}

export interface LessonAuthorData {
  id: string;
  moduleId: string;
  title: string;
  duration: number;
  xp: number;
  keywords: string[];
  prerequisites: string[];
  objectives: string[];
  definition: string;
  why: string;
  mentalModel: string;
  diagram: string;
  example: string;
  commands: string[];
  explanation: string;
  mistakes: string[];
  labSteps: string[];
  hint: string;
  validation: string;
  quizPrompt: string;
  challenge: string;
  summary: string[];
  quiz: {
    id: string;
    title: string;
    questions: QuizQuestionData[];
  };
}
