import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { useProgress } from "@/contexts/ProgressContext";

interface LessonCardProps {
  number: number;
  title: string;
  children: ReactNode;
  icon: string;
  delay?: number;
}

const LessonCard = ({ number, title, children, icon, delay = 0 }: LessonCardProps) => {
  const { markLessonViewed } = useProgress();
  const tracked = useRef(false);

  return (
    <motion.div
      id={`lesson-${number}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => {
        if (!tracked.current) {
          tracked.current = true;
          markLessonViewed(number);
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="group relative rounded-xl glow-border glow-box gradient-quantum p-6 md:p-8 hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            Lesson {String(number).padStart(2, "0")}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mt-1 mb-3">{title}</h3>
          <div className="text-secondary-foreground leading-relaxed space-y-3">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCard;
