import { motion } from "framer-motion";

const analogies = [
  {
    classical: "A light switch: ON or OFF",
    quantum: "A dimmer: any brightness at once, until you look",
    icon: "💡",
  },
  {
    classical: "Reading a book page by page",
    quantum: "Reading all pages simultaneously",
    icon: "📖",
  },
  {
    classical: "Trying every key on a lock, one by one",
    quantum: "Trying all keys at the same time",
    icon: "🔑",
  },
];

const AnalogiesSection = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {analogies.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="rounded-lg glow-border p-5 gradient-quantum"
        >
          <div className="text-3xl mb-3">{a.icon}</div>
          <div className="space-y-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Classical</span>
              <p className="text-sm text-muted-foreground">{a.classical}</p>
            </div>
            <div className="border-t border-primary/20 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Quantum</span>
              <p className="text-sm text-foreground font-medium">{a.quantum}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalogiesSection;
