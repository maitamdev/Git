import React, { useState } from 'react';
import { Quiz, QuizQuestion } from '@git-academy/shared';
import { QuizEngine, QuizGradingResult } from '@git-academy/exercise-engine';

interface QuizViewProps {
  quiz: Quiz;
  onPass?: (score: number, earnedXp: number) => void;
  earnedXp?: number;
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz, onPass, earnedXp = 50 }) => {
  const [engine] = useState<QuizEngine>(() => new QuizEngine());
  const [answers, setAnswers] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    quiz.questions.forEach((q) => {
      if (q.type === 'command_order') {
        // Initialize with default options order
        init[q.id] = q.options.map((o) => o.text);
      } else if (q.type === 'multiple_choice' || q.type === 'multiple') {
        init[q.id] = [];
      } else if (q.type === 'fill_command') {
        init[q.id] = '';
      } else {
        init[q.id] = -1;
      }
    });
    return init;
  });

  const [attempts, setAttempts] = useState<number>(0);
  const [result, setResult] = useState<QuizGradingResult | null>(null);

  const handleSingleSelect = (questionId: string, optionIndex: number) => {
    if (result) return; // Locked after submission until retry
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleMultipleSelect = (questionId: string, optionIndex: number) => {
    if (result) return;
    setAnswers((prev) => {
      const current = (prev[questionId] as number[]) || [];
      const next = current.includes(optionIndex)
        ? current.filter((i) => i !== optionIndex)
        : [...current, optionIndex];
      return { ...prev, [questionId]: next };
    });
  };

  const handleFillChange = (questionId: string, val: string) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleMoveOrder = (questionId: string, fromIndex: number, toIndex: number) => {
    if (result) return;
    setAnswers((prev) => {
      const items = [...((prev[questionId] as string[]) || [])];
      if (toIndex < 0 || toIndex >= items.length) return prev;
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...prev, [questionId]: items };
    });
  };

  const handleSubmit = () => {
    const evalResult = engine.evaluateQuiz(quiz, answers);
    setResult(evalResult);
    setAttempts((prev) => prev + 1);

    if (evalResult.passed && onPass) {
      onPass(evalResult.score, earnedXp);
    }
  };

  const handleRetry = () => {
    setResult(null);
  };

  const minScore = quiz.minimumScore ?? 75;

  return (
    <div className="quiz-container" style={{ padding: '0.5rem', overflowY: 'auto' }}>
      {/* Quiz Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          paddingBottom: '0.8rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#f8fafc' }}>{quiz.title}</h3>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            {quiz.questions.length} câu hỏi • Điểm qua môn tối thiểu: {minScore}% • Số lần làm: {attempts}
          </span>
        </div>

        {result && (
          <div
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.85rem',
              background: result.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: result.passed ? '#34d399' : '#f87171',
              border: `1px solid ${result.passed ? '#10b981' : '#ef4444'}`,
            }}
          >
            {result.score}% {result.passed ? '✓ ĐẠT' : '✕ CHƯA ĐẠT'}
          </div>
        )}
      </div>

      {/* Questions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {quiz.questions.map((q: QuizQuestion, qIdx: number) => {
          const qResult = result?.questionResults[q.id];

          return (
            <div
              key={q.id}
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: `1px solid ${
                  qResult
                    ? qResult.isCorrect
                      ? 'rgba(16, 185, 129, 0.5)'
                      : 'rgba(239, 68, 68, 0.5)'
                    : 'var(--border-subtle)'
                }`,
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              {/* Question title */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <strong style={{ color: '#e2e8f0', fontSize: '0.88rem' }}>
                  Câu {qIdx + 1}: {q.question}
                </strong>
                {qResult && (
                  <span
                    style={{
                      color: qResult.isCorrect ? '#10b981' : '#ef4444',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                    }}
                  >
                    {qResult.isCorrect ? '✓ Đúng' : '✕ Sai'}
                  </span>
                )}
              </div>

              {/* Question Types */}
              {/* 1. Single Choice, True/False, Git Graph Question */}
              {(q.type === 'single_choice' ||
                q.type === 'single' ||
                q.type === 'true_false' ||
                q.type === 'git_graph_question') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    let optBg = isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.03)';
                    let optBorder = isSelected ? '1px solid #38bdf8' : '1px solid #1e293b';

                    if (result) {
                      if (opt.correct) {
                        optBg = 'rgba(16, 185, 129, 0.2)';
                        optBorder = '1px solid #10b981';
                      } else if (isSelected && !opt.correct) {
                        optBg = 'rgba(239, 68, 68, 0.2)';
                        optBorder = '1px solid #ef4444';
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSingleSelect(q.id, optIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          background: optBg,
                          border: optBorder,
                          cursor: result ? 'default' : 'pointer',
                          fontSize: '0.82rem',
                          color: '#cbd5e1',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={isSelected}
                          onChange={() => handleSingleSelect(q.id, optIdx)}
                          disabled={!!result}
                        />
                        <span>{opt.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 2. Multiple Choice */}
              {(q.type === 'multiple_choice' || q.type === 'multiple') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
                    (Chọn tất cả các đáp án đúng)
                  </span>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = ((answers[q.id] as number[]) || []).includes(optIdx);
                    let optBg = isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.03)';
                    let optBorder = isSelected ? '1px solid #38bdf8' : '1px solid #1e293b';

                    if (result) {
                      if (opt.correct) {
                        optBg = 'rgba(16, 185, 129, 0.2)';
                        optBorder = '1px solid #10b981';
                      } else if (isSelected && !opt.correct) {
                        optBg = 'rgba(239, 68, 68, 0.2)';
                        optBorder = '1px solid #ef4444';
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleMultipleSelect(q.id, optIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          background: optBg,
                          border: optBorder,
                          cursor: result ? 'default' : 'pointer',
                          fontSize: '0.82rem',
                          color: '#cbd5e1',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleMultipleSelect(q.id, optIdx)}
                          disabled={!!result}
                        />
                        <span>{opt.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. Command Order */}
              {q.type === 'command_order' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.2rem' }}>
                    (Dùng nút ▲ / ▼ để sắp xếp các bước theo thứ tự thực hiện đúng)
                  </span>
                  {((answers[q.id] as string[]) || []).map((stepText, sIdx, all) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0.75rem',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid #1e293b',
                        fontSize: '0.82rem',
                        color: '#e2e8f0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#38bdf8', fontWeight: 700, width: '18px' }}>{sIdx + 1}.</span>
                        <span>{stepText}</span>
                      </div>
                      {!result && (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            disabled={sIdx === 0}
                            onClick={() => handleMoveOrder(q.id, sIdx, sIdx - 1)}
                            style={{
                              background: '#1e293b',
                              border: 'none',
                              color: '#cbd5e1',
                              borderRadius: '3px',
                              cursor: sIdx === 0 ? 'not-allowed' : 'pointer',
                              padding: '2px 6px',
                              fontSize: '0.75rem',
                            }}
                          >
                            ▲
                          </button>
                          <button
                            disabled={sIdx === all.length - 1}
                            onClick={() => handleMoveOrder(q.id, sIdx, sIdx + 1)}
                            style={{
                              background: '#1e293b',
                              border: 'none',
                              color: '#cbd5e1',
                              borderRadius: '3px',
                              cursor: sIdx === all.length - 1 ? 'not-allowed' : 'pointer',
                              padding: '2px 6px',
                              fontSize: '0.75rem',
                            }}
                          >
                            ▼
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 4. Fill Command */}
              {q.type === 'fill_command' && (
                <div>
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleFillChange(q.id, e.target.value)}
                    disabled={!!result}
                    placeholder="Nhập câu trả lời hoặc cờ lệnh..."
                    style={{
                      width: '100%',
                      background: '#090d16',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      padding: '0.5rem 0.75rem',
                      color: '#38bdf8',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box',
                    }}
                  />
                  {q.hint && !result && (
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem', display: 'block' }}>
                      💡 Gợi ý: {q.hint}
                    </span>
                  )}
                </div>
              )}

              {/* Feedback and explanation */}
              {qResult && (
                <div
                  style={{
                    marginTop: '0.8rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    background: qResult.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderLeft: `3px solid ${qResult.isCorrect ? '#10b981' : '#ef4444'}`,
                    fontSize: '0.8rem',
                    color: '#e2e8f0',
                    lineHeight: '1.5',
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem', color: qResult.isCorrect ? '#34d399' : '#f87171' }}>
                    {qResult.feedback}
                  </div>
                  <div style={{ color: '#cbd5e1' }}>{qResult.explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action footer */}
      <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
        {result ? (
          <button
            onClick={handleRetry}
            style={{
              background: '#334155',
              color: '#f8fafc',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🔄 Làm lại bài trắc nghiệm
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              background: '#38bdf8',
              color: '#090d16',
              border: 'none',
              padding: '0.6rem 1.4rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Nộp bài trắc nghiệm ➔
          </button>
        )}
      </div>
    </div>
  );
};
