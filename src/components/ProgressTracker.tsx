import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";

const ProgressTracker = () => {
  const { progress, totalLessons } = useProgress();
  const lessons = Array.from({ length: totalLessons }, (_, i) => i + 1);

  const lessonsDone = progress.lessonsViewed.size;
  const quizzesDone = progress.quizzesCompleted.size;
  const totalSteps = totalLessons * 2; // lesson + quiz each
  const completedSteps = lessonsDone + quizzesDone;
  const pct = Math.round((completedSteps / totalSteps) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border px-4 py-3"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-primary tracking-wide">Progress</span>
          <span className="font-mono text-xs text-muted-foreground">{pct}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-muted mb-3">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Lesson dots */}
        <div className="flex items-center justify-between gap-1">
          {lessons.map((n) => {
            const viewed = progress.lessonsViewed.has(n);
            const quiz = progress.quizzesCompleted.get(n);
            const perfect = quiz && quiz.score === quiz.total;

            return (
              <a
                key={n}
                href={`#lesson-${n}`}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="flex items-center gap-0.5">
                  {/* Lesson dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full border transition-colors ${
                      viewed
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30 bg-transparent"
                    }`}
                  />
                  {/* Quiz dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-sm border transition-colors ${
                      quiz
                        ? perfect
                          ? "bg-green-500 border-green-500"
                          : "bg-accent border-accent"
                        : "border-muted-foreground/30 bg-transparent"
                    }`}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">
                  {n}
                </span>
              </a>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">Lesson read</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-accent" />
            <span className="text-[10px] text-muted-foreground">Quiz done</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-green-500" />
            <span className="text-[10px] text-muted-foreground">Perfect</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
