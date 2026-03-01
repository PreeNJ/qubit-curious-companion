import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const QubitVisual = () => {
  const [measured, setMeasured] = useState(false);
  const [result, setResult] = useState<0 | 1 | null>(null);

  const measure = () => {
    setMeasured(true);
    setResult(Math.random() > 0.5 ? 1 : 0);
    setTimeout(() => {
      setMeasured(false);
      setResult(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={!measured ? { rotate: 360 } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner qubit */}
        <motion.div
          className="absolute inset-4 rounded-full bg-primary/20 flex items-center justify-center glow-box"
          animate={
            !measured
              ? { scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }
              : { scale: 1, opacity: 1 }
          }
          transition={
            !measured
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          <AnimatePresence mode="wait">
            {!measured ? (
              <motion.span
                key="super"
                className="font-mono text-lg text-primary font-bold"
                exit={{ opacity: 0, scale: 0.5 }}
              >
                |ψ⟩
              </motion.span>
            ) : (
              <motion.span
                key="result"
                className="font-mono text-3xl text-foreground font-bold"
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                |{result}⟩
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <button
        onClick={measure}
        disabled={measured}
        className="font-mono text-sm px-6 py-2 rounded-lg bg-primary/10 glow-border text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {measured ? "Collapsing..." : "⚡ Measure Qubit"}
      </button>

      <p className="text-muted-foreground text-sm text-center max-w-xs">
        {measured
          ? `The qubit collapsed to |${result}⟩ — just like real quantum measurement!`
          : "Click to measure — the qubit is in superposition (both 0 and 1 at once)"}
      </p>
    </div>
  );
};

export default QubitVisual;
