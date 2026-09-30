export type QuizQuestionType = 'single' | 'multiple' | 'true_false' | 'command_order' | 'drag_drop';
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
}
export interface Quiz {
    id: string;
    title: string;
    questions: QuizQuestion[];
}
//# sourceMappingURL=quiz.d.ts.map