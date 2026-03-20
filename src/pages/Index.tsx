import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Leaf, DollarSign, Mountain, ArrowRight } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

const techCards = [
  {
    title: "Pyrometallurgy",
    emoji: "🔥",
    description: "High-temperature processes like smelting and roasting to extract metals from ores and e-waste.",
    cardClass: "tech-card-fire",
    route: "/pyrometallurgy",
    techId: "pyro",
  },
  {
    title: "Hydrometallurgy",
    emoji: "💧",
    description: "Aqueous chemistry-based extraction using leaching, solvent extraction, and electrowinning.",
    cardClass: "tech-card-water",
    route: "/hydrometallurgy",
    techId: "hydro",
  },
  {
    title: "Bioleaching",
    emoji: "🦠",
    description: "Microbial-assisted dissolution of metals using bacteria like Acidithiobacillus ferrooxidans.",
    cardClass: "tech-card-bio",
    route: "/bioleaching",
    techId: "bio",
  },
];

const comparisonData = [
  { aspect: "Temperature", pyro: "1000–1500°C", hydro: "25–100°C", bio: "20–40°C" },
  { aspect: "Energy Use", pyro: "Very High", hydro: "Moderate", bio: "Low" },
  { aspect: "Environmental Impact", pyro: "High (emissions)", hydro: "Moderate (chemicals)", bio: "Low" },
  { aspect: "Processing Time", pyro: "Hours", hydro: "Hours–Days", bio: "Days–Weeks" },
  { aspect: "Metal Recovery Rate", pyro: "High", hydro: "High", bio: "Moderate" },
  { aspect: "Best For", pyro: "High-grade ores", hydro: "Mixed metals", bio: "Low-grade ores" },
];

const Index = () => {
  const navigate = useNavigate();
  const { state, getUnlockedSteps, isQuizCompleted } = useGame();

  const totalProgress = (() => {
    const stepsTotal = 15; // 5 per tech × 3
    const stepsDone = (getUnlockedSteps("pyro") + getUnlockedSteps("hydro") + getUnlockedSteps("bio"));
    const quizDone = (isQuizCompleted("pyro") ? 1 : 0) + (isQuizCompleted("hydro") ? 1 : 0) + (isQuizCompleted("bio") ? 1 : 0);
    return Math.round(((stepsDone + quizDone * 3) / (stepsTotal + 9)) * 100);
  })();

  return (
    <div className="gradient-bg min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/20 blur-[80px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <p className="text-sm font-mono font-medium tracking-widest uppercase text-primary mb-4">
              🎮 Gamified Learning Experience
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-[0.95] mb-6 text-foreground">
              Technologies for{" "}
              <span className="gradient-text">Material Recovery</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-pretty mb-8">
              Unlock steps, answer quizzes, earn XP, and collect achievements as you learn about metal recovery from e-waste and ores.
            </p>
          </ScrollReveal>

          {/* Overall Progress */}
          <ScrollReveal delay={300}>
            <div className="glass-card inline-flex items-center gap-4 px-6 py-3 mx-auto">
              <span className="text-sm font-medium text-foreground">Course Progress</span>
              <div className="w-32 h-2.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              <span className="text-sm font-mono text-primary">{totalProgress}%</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Technology Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Each technology has 5 unlockable steps and a quiz. Complete them all to become a Material Recovery Master!
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {techCards.map((card, i) => {
              const stepsComplete = getUnlockedSteps(card.techId);
              const quizDone = isQuizCompleted(card.techId);
              return (
                <ScrollReveal key={card.title} delay={i * 80}>
                  <div
                    className={`${card.cardClass} p-8 text-center group`}
                    onClick={() => navigate(card.route)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && navigate(card.route)}
                  >
                    <div className="text-5xl mb-5">{card.emoji}</div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {card.description}
                    </p>

                    {/* Progress indicators */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Steps</span>
                        <span className="font-mono text-foreground">{stepsComplete}/5</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${(stepsComplete / 5) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Quiz</span>
                        <span className={`font-mono ${quizDone ? "text-bio" : "text-muted-foreground"}`}>
                          {quizDone ? "✓ Passed" : "Not taken"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {stepsComplete === 5 && quizDone ? "Review" : "Continue"} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
              Technology Comparison
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="glass-card overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-semibold text-muted-foreground">Aspect</th>
                      <th className="p-4 font-semibold text-fire">🔥 Pyro</th>
                      <th className="p-4 font-semibold text-water">💧 Hydro</th>
                      <th className="p-4 font-semibold text-bio">🦠 Bio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={row.aspect} className={i < comparisonData.length - 1 ? "border-b border-border/30" : ""}>
                        <td className="p-4 font-medium text-foreground">{row.aspect}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.pyro}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.hydro}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.bio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
              Why Material Recovery Matters
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Leaf className="h-8 w-8" />, title: "Eco-Friendly", desc: "Reduces mining waste and greenhouse emissions by recycling existing materials." },
              { icon: <DollarSign className="h-8 w-8" />, title: "Cost-Effective", desc: "Recovers valuable metals at lower costs than traditional primary extraction." },
              { icon: <Mountain className="h-8 w-8" />, title: "Low-Grade Ore Suitable", desc: "Bioleaching and hydrometallurgy can process ores too lean for conventional smelting." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="glass-card p-8 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          Educational resource on material recovery technologies.
        </div>
      </footer>
    </div>
  );
};

export default Index;
