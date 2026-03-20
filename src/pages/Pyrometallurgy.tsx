import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FlowStep from "@/components/FlowStep";
import { ScrollReveal } from "@/components/ScrollReveal";
import QuizSection from "@/components/QuizSection";
import { useGame } from "@/contexts/GameContext";

const steps = [
  { icon: "📱", title: "Step 1: Waste Material", description: "Collection of e-waste (circuit boards, cables) or mineral ores containing target metals.", color: "fire" },
  { icon: "⚙️", title: "Step 2: Pre-processing", description: "Crushing, grinding, and sorting to increase surface area and separate components.", color: "fire" },
  { icon: "🔥", title: "Step 3: Smelting & Roasting", description: "Materials are heated to extreme temperatures (1000–1500°C) in furnaces to melt and separate metals from slag.", color: "fire" },
  { icon: "🧪", title: "Step 4: Purification & Refining", description: "Electrolytic refining and chemical treatments to achieve high-purity metal output.", color: "fire" },
  { icon: "🥇", title: "Step 5: Pure Metals", description: "Final output: high-purity gold (Au), silver (Ag), copper (Cu), and other valuable metals.", color: "fire" },
];

const quizQuestions = [
  { question: "What temperature range is typically used in pyrometallurgical smelting?", options: ["100–300°C", "500–800°C", "1000–1500°C", "2000–3000°C"], correct: 2 },
  { question: "What is the primary by-product of smelting?", options: ["Acid", "Slag", "Bacteria", "Water"], correct: 1 },
  { question: "Which step comes before smelting in pyrometallurgy?", options: ["Electrowinning", "Bioleaching", "Pre-processing (Crushing)", "Precipitation"], correct: 2 },
  { question: "Pyrometallurgy is best suited for which type of ores?", options: ["Low-grade ores", "Liquid ores", "High-grade ores", "Organic ores"], correct: 2 },
];

const Pyrometallurgy = () => {
  const { unlockStep, getUnlockedSteps, watchVideo } = useGame();
  const unlocked = getUnlockedSteps("pyro");

  return (
    <div className="gradient-bg min-h-screen pt-16">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <ScrollReveal>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={50}>
          <div className="text-center mb-16">
            <span className="text-5xl mb-4 block">🔥</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Pyrometallurgy</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              High-temperature extraction using heat, smelting, and roasting to recover metals from ores and electronic waste.
            </p>
            <p className="text-sm text-primary mt-4 font-mono">Unlock each step to earn XP!</p>
          </div>
        </ScrollReveal>

        {/* Flowchart */}
        <div className="flex flex-col items-center gap-0 mb-20">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 60}>
              <FlowStep
                {...step}
                stepIndex={i}
                unlocked={i < unlocked}
                onUnlock={() => {
                  if (i === 0 || i < unlocked + 1) unlockStep("pyro", i + 1);
                }}
                isLast={i === steps.length - 1}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Video */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Watch: Pyrometallurgy Explained</h2>
            <div
              className="glass-card overflow-hidden aspect-video cursor-pointer"
              onClick={() => watchVideo("pyro")}
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/XJn9NRkkJqk"
                title="Pyrometallurgy Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2 font-mono">+15 XP for watching</p>
          </div>
        </ScrollReveal>

        {/* Quiz */}
        <div className="mb-16">
          <QuizSection techId="pyro" title="Pyrometallurgy" questions={quizQuestions} />
        </div>
      </div>
    </div>
  );
};

export default Pyrometallurgy;
