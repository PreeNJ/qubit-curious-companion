import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useProgress } from "@/contexts/ProgressContext";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonQuizProps {
  lessonNumber: number;
  questions: QuizQuestion[];
}

const LessonQuiz = ({ lessonNumber, questions }: LessonQuizProps) => {
  const { markQuizCompleted } = useProgress();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];
  const isCorrect = selected === q.correctIndex;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (index === q.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
      markQuizCompleted(lessonNumber, score, questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="mt-6 p-4 rounded-lg bg-card glow-border">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-mono text-primary">🧠 Quick Quiz</span>
        {!finished && (
          <span className="text-xs text-muted-foreground ml-auto font-mono">
            {currentQ + 1}/{questions.length}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-foreground text-sm font-medium mb-3">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                let optionClass =
                  "w-full text-left text-sm px-3 py-2 rounded-md border transition-colors font-mono ";
                if (!showResult) {
                  optionClass +=
                    "border-border hover:border-primary/50 hover:bg-primary/5 text-secondary-foreground cursor-pointer";
                } else if (i === q.correctIndex) {
                  optionClass += "border-green-500/50 bg-green-500/10 text-green-400";
                } else if (i === selected) {
                  optionClass += "border-destructive/50 bg-destructive/10 text-destructive";
                } else {
                  optionClass += "border-border text-muted-foreground opacity-50";
                }

                return (
                  <button key={i} onClick={() => handleSelect(i)} className={optionClass}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3"
              >
                <p className={`text-xs ${isCorrect ? "text-green-400" : "text-destructive"}`}>
                  {isCorrect ? "✅ Correct!" : "❌ Not quite."}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>
                <button
                  onClick={handleNext}
                  className="mt-3 text-xs font-mono px-4 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {currentQ < questions.length - 1 ? "Next →" : "See Results"}
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="font-mono text-3xl text-primary font-bold mb-1">
              {score}/{questions.length}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {score === questions.length
                ? "Perfect! You've mastered this concept! 🎉"
                : score >= questions.length / 2
                  ? "Good job! Review the lesson for the ones you missed."
                  : "Keep learning — re-read the lesson and try again!"}
            </p>
            <button
              onClick={handleRetry}
              className="text-xs font-mono px-4 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              ↻ Retry Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LessonQuiz;
