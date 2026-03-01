import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EntanglementVisual = () => {
  const [measured, setMeasured] = useState(false);
  const [result, setResult] = useState<0 | 1 | null>(null);

  const measure = () => {
    setMeasured(true);
    setResult(Math.random() > 0.5 ? 1 : 0);
    setTimeout(() => {
      setMeasured(false);
      setResult(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex items-center gap-4 sm:gap-10">
        {/* Qubit A */}
        <QubitOrb label="A" measured={measured} result={result} delay={0} />

        {/* Connection line */}
        <div className="relative flex items-center w-16 sm:w-24">
          <motion.div
            className="absolute inset-y-1/2 left-0 right-0 h-px bg-primary/30"
            animate={
              !measured
                ? { opacity: [0.3, 1, 0.3], scaleX: [1, 1.05, 1] }
                : { opacity: 1 }
            }
            transition={
              !measured
                ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
          />
          {/* Traveling particles */}
          {!measured &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.66,
                  ease: "easeInOut",
                }}
              />
            ))}
          {measured && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="font-mono text-xs text-primary">⚡</span>
            </motion.div>
          )}
        </div>

        {/* Qubit B */}
        <QubitOrb label="B" measured={measured} result={result} delay={0.15} />
      </div>

      <button
        onClick={measure}
        disabled={measured}
        className="font-mono text-sm px-6 py-2 rounded-lg bg-primary/10 glow-border text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {measured ? "Entangled collapse!" : "🔗 Measure Entangled Pair"}
      </button>

      <p className="text-muted-foreground text-sm text-center max-w-sm">
        {measured
          ? `Both qubits collapsed to |${result}⟩ instantly — no matter the distance!`
          : "These two qubits are entangled. Measure one, and the other instantly matches."}
      </p>
    </div>
  );
};

const QubitOrb = ({
  label,
  measured,
  result,
  delay,
}: {
  label: string;
  measured: boolean;
  result: 0 | 1 | null;
  delay: number;
}) => (
  <div className="flex flex-col items-center gap-2">
    <span className="font-mono text-xs text-muted-foreground">Qubit {label}</span>
    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/30"
        animate={!measured ? { rotate: 360 } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-primary/15 flex items-center justify-center glow-box"
        animate={
          !measured
            ? { scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }
            : { scale: [1.3, 1], opacity: 1 }
        }
        transition={
          !measured
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3, delay }
        }
      >
        <AnimatePresence mode="wait">
          {!measured ? (
            <motion.span
              key="super"
              className="font-mono text-sm text-primary font-bold"
              exit={{ opacity: 0, scale: 0.5 }}
            >
              |ψ⟩
            </motion.span>
          ) : (
            <motion.span
              key="result"
              className="font-mono text-2xl text-foreground font-bold"
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay }}
              exit={{ opacity: 0 }}
            >
              |{result}⟩
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  </div>
);

export default EntanglementVisual;
