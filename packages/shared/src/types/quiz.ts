export type QuizQuestionType =
  | 'single_choice'
  | 'single'
  | 'multiple_choice'
  | 'multiple'
  | 'true_false'
  | 'command_order'
  | 'fill_command'
  | 'git_graph_question';

export interface QuizOption {
  id?: string;
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  options: QuizOption[];
  explanation: string;
  commandOrder?: string[]; // Expected order of commands for 'command_order'
  expectedCommand?: string; // Expected command string for 'fill_command'
  hint?: string;
}

export interface Quiz {
  id: string;
  title: string;
  minimumScore?: number; // Minimum passing score (e.g. 70%)
  shuffleOptions?: boolean;
  maxAttempts?: number;
  questions: QuizQuestion[];
}
