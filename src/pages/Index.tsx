import { motion } from "framer-motion";
import QuantumParticles from "@/components/QuantumParticles";
import LessonCard from "@/components/LessonCard";
import QubitVisual from "@/components/QubitVisual";
import AnalogiesSection from "@/components/AnalogiesSection";
import EntanglementVisual from "@/components/EntanglementVisual";
import LessonQuiz from "@/components/LessonQuiz";
import heroImg from "@/assets/quantum-hero.jpg";

const quizData = {
  lesson1: [
    {
      question: "What is the basic unit of information in a quantum computer?",
      options: ["Bit", "Byte", "Qubit", "Pixel"],
      correctIndex: 2,
      explanation: "A qubit (quantum bit) is the quantum equivalent of a classical bit, but it can exist in superposition.",
    },
    {
      question: "What happens to a qubit when you measure it?",
      options: ["It stays in superposition", "It collapses to 0 or 1", "It disappears", "It doubles"],
      correctIndex: 1,
      explanation: "Measurement forces a qubit to 'collapse' from superposition into a definite state — either 0 or 1.",
    },
  ],
  lesson2: [
    {
      question: "What is superposition?",
      options: [
        "A qubit being only 0",
        "A qubit being both 0 and 1 simultaneously",
        "Two qubits connected together",
        "A type of computer chip",
      ],
      correctIndex: 1,
      explanation: "Superposition means a qubit exists in both states at once until it's measured.",
    },
    {
      question: "The spinning coin analogy represents superposition because:",
      options: [
        "Coins are round like qubits",
        "It's neither heads nor tails until caught",
        "It always lands on heads",
        "Coins are made of quantum material",
      ],
      correctIndex: 1,
      explanation: "Just like a spinning coin is neither heads nor tails, a qubit in superposition is both 0 and 1 until measured.",
    },
  ],
  lesson3: [
    {
      question: "What is quantum entanglement?",
      options: [
        "Two qubits physically touching",
        "A qubit spinning very fast",
        "Two qubits whose states are instantly correlated",
        "A quantum computer overheating",
      ],
      correctIndex: 2,
      explanation: "Entangled qubits are correlated — measuring one instantly determines the state of the other, regardless of distance.",
    },
    {
      question: "Who called entanglement 'spooky action at a distance'?",
      options: ["Newton", "Hawking", "Einstein", "Bohr"],
      correctIndex: 2,
      explanation: "Albert Einstein famously used this phrase because he found the instant correlation between entangled particles unsettling.",
    },
  ],
  lesson4: [
    {
      question: "Quantum computers are best described as:",
      options: [
        "Faster at everything than classical computers",
        "Excellent at specific types of problems",
        "Only useful for gaming",
        "Identical to classical computers",
      ],
      correctIndex: 1,
      explanation: "Quantum computers aren't universally faster — they excel at specific tasks like molecular simulation, cryptography, and optimization.",
    },
    {
      question: "Which is NOT a typical quantum computing application?",
      options: ["Drug discovery", "Word processing", "Cryptography", "Climate modeling"],
      correctIndex: 1,
      explanation: "Word processing doesn't benefit from quantum computing. Quantum computers shine in problems involving massive parallelism and complex simulations.",
    },
  ],
  lesson5: [
    {
      question: "Why must most quantum computers be kept extremely cold?",
      options: [
        "To save electricity",
        "To prevent decoherence",
        "To make them faster",
        "Because they run on ice",
      ],
      correctIndex: 1,
      explanation: "Qubits are extremely fragile. Even tiny thermal vibrations cause decoherence, destroying their quantum properties.",
    },
    {
      question: "What is decoherence?",
      options: [
        "When qubits gain more power",
        "When qubits lose their quantum properties",
        "When two computers connect",
        "When a measurement succeeds",
      ],
      correctIndex: 1,
      explanation: "Decoherence is when environmental interference causes qubits to lose superposition and behave like ordinary bits.",
    },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Quantum visualization" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <QuantumParticles />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
              Beginner's Guide
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 glow-text text-foreground leading-tight">
              Quantum Computing
              <br />
              <span className="text-gradient-quantum">Demystified</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground max-w-2xl mx-auto leading-relaxed">
              No physics degree needed. Learn the mind-bending ideas behind quantum computers
              through simple analogies and interactive visuals.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10"
          >
            <a
              href="#lessons"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Start Learning ↓
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lessons */}
      <section id="lessons" className="max-w-3xl mx-auto px-6 py-20 space-y-12">
        <LessonCard number={1} title="What Even Is a Quantum Computer?" icon="🖥️">
          <p>
            A regular computer uses <strong className="text-foreground">bits</strong> — tiny switches that are either
            <span className="font-mono text-primary"> 0 </span> or
            <span className="font-mono text-primary"> 1</span>.
          </p>
          <p>
            A quantum computer uses <strong className="text-foreground">qubits</strong>. Thanks to a property called
            <strong className="text-primary"> superposition</strong>, a qubit can be 0, 1, or
            <em> both at the same time</em> — until you measure it.
          </p>
          <QubitVisual />
          <LessonQuiz questions={quizData.lesson1} />
        </LessonCard>

        <LessonCard number={2} title="Superposition: Being Two Things at Once" icon="🌀" delay={0.1}>
          <p>
            Imagine a coin spinning in the air — it's not heads or tails, it's <em>both</em>, simultaneously.
            That's superposition. The moment you catch it (measure it), it "collapses" into one state.
          </p>
          <p>
            This lets quantum computers explore <strong className="text-foreground">many possible answers at the same time</strong>,
            instead of checking them one by one like classical computers.
          </p>
          <AnalogiesSection />
          <LessonQuiz questions={quizData.lesson2} />
        </LessonCard>

        <LessonCard number={3} title="Entanglement: Spooky Action" icon="🔗" delay={0.1}>
          <p>
            When two qubits become <strong className="text-primary">entangled</strong>, measuring one instantly
            tells you about the other — even if they're on opposite sides of the universe.
          </p>
          <p>
            Einstein called it "spooky action at a distance." It's not magic — it's a proven quantum
            phenomenon that lets quantum computers coordinate computations in ways classical ones can't.
          </p>
          <EntanglementVisual />
          <div className="mt-4 p-4 rounded-lg bg-primary/5 glow-border">
            <p className="font-mono text-sm text-primary">
              🧪 Think of it like this: Imagine two magic dice. No matter how far apart, when you roll
              one and get a 4, the other <em>always</em> shows 4 too. That's entanglement.
            </p>
          </div>
          <LessonQuiz questions={quizData.lesson3} />
        </LessonCard>

        <LessonCard number={4} title="What Can Quantum Computers Actually Do?" icon="🚀" delay={0.1}>
          <p>
            They're <strong className="text-foreground">not</strong> just "faster computers." They excel at specific problems:
          </p>
          <ul className="space-y-2 mt-2">
            {[
              ["💊", "Drug Discovery", "Simulating molecular interactions to find new medicines"],
              ["🔐", "Cryptography", "Breaking (and building) encryption that's impossible classically"],
              ["📊", "Optimization", "Finding the best route, schedule, or allocation among billions of options"],
              ["🌍", "Climate Modeling", "Simulating complex climate systems with quantum precision"],
            ].map(([icon, title, desc]) => (
              <li key={title} className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">{icon}</span>
                <div>
                  <span className="text-foreground font-medium">{title}:</span>{" "}
                  <span className="text-secondary-foreground">{desc}</span>
                </div>
              </li>
            ))}
          </ul>
          <LessonQuiz questions={quizData.lesson4} />
        </LessonCard>

        <LessonCard number={5} title="Why Don't We All Have One Yet?" icon="❄️" delay={0.1}>
          <p>
            Qubits are incredibly fragile. Most quantum computers need to be cooled to near
            <strong className="text-primary"> absolute zero</strong> (−273°C) — colder than outer space.
          </p>
          <p>
            Even tiny vibrations or heat can cause <strong className="text-foreground">decoherence</strong> — where
            qubits lose their quantum properties and become regular bits. Building stable, large-scale
            quantum computers is one of humanity's greatest engineering challenges.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              ["50+", "Qubits", "in today's best machines"],
              ["−273°C", "Temperature", "near absolute zero"],
              ["~1000×", "Error Rate", "vs classical computers"],
            ].map(([val, label, sub]) => (
              <div key={label} className="p-3 rounded-lg bg-primary/5 glow-border">
                <div className="font-mono text-lg text-primary font-bold">{val}</div>
                <div className="text-xs text-foreground font-medium">{label}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{sub}</div>
              </div>
            ))}
          </div>
          <LessonQuiz questions={quizData.lesson5} />
        </LessonCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 text-center">
        <p className="text-muted-foreground text-sm">
          Built to make quantum computing accessible to everyone ⚛️
        </p>
      </footer>
    </div>
  );
};

export default Index;
