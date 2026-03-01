import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ProgressState {
  lessonsViewed: Set<number>;
  quizzesCompleted: Map<number, { score: number; total: number }>;
}

interface ProgressContextType {
  progress: ProgressState;
  markLessonViewed: (lesson: number) => void;
  markQuizCompleted: (lesson: number, score: number, total: number) => void;
  totalLessons: number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be inside ProgressProvider");
  return ctx;
};

export const ProgressProvider = ({ totalLessons, children }: { totalLessons: number; children: ReactNode }) => {
  const [progress, setProgress] = useState<ProgressState>({
    lessonsViewed: new Set(),
    quizzesCompleted: new Map(),
  });

  const markLessonViewed = useCallback((lesson: number) => {
    setProgress((prev) => {
      const next = { ...prev, lessonsViewed: new Set(prev.lessonsViewed) };
      next.lessonsViewed.add(lesson);
      return next;
    });
  }, []);

  const markQuizCompleted = useCallback((lesson: number, score: number, total: number) => {
    setProgress((prev) => {
      const next = { ...prev, quizzesCompleted: new Map(prev.quizzesCompleted) };
      const existing = next.quizzesCompleted.get(lesson);
      if (!existing || score > existing.score) {
        next.quizzesCompleted.set(lesson, { score, total });
      }
      return next;
    });
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, markLessonViewed, markQuizCompleted, totalLessons }}>
      {children}
    </ProgressContext.Provider>
  );
};
