import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Leaf, DollarSign, Mountain, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import ParticlesBackground from "@/components/ParticlesBackground";

const techCards = [
  {
    title: "Pyrometallurgy",
    emoji: "🔥",
    description: "High-temperature processes like smelting and roasting to extract metals from ores and e-waste.",
    color: "fire",
    route: "/pyrometallurgy",
    techId: "pyro",
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    borderGlow: "hover:shadow-[0_0_40px_hsl(15_100%_55%/0.3)]",
  },
  {
    title: "Hydrometallurgy",
    emoji: "💧",
    description: "Aqueous chemistry-based extraction using leaching, solvent extraction, and electrowinning.",
    color: "water",
    route: "/hydrometallurgy",
    techId: "hydro",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderGlow: "hover:shadow-[0_0_40px_hsl(200_100%_50%/0.3)]",
  },
  {
    title: "Bioleaching",
    emoji: "🦠",
    description: "Microbial-assisted dissolution of metals using bacteria like Acidithiobacillus ferrooxidans.",
    color: "bio",
    route: "/bioleaching",
    techId: "bio",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    borderGlow: "hover:shadow-[0_0_40px_hsl(140_70%_45%/0.3)]",
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
    const stepsTotal = 15;
    const stepsDone = getUnlockedSteps("pyro") + getUnlockedSteps("hydro") + getUnlockedSteps("bio");
    const quizDone = (isQuizCompleted("pyro") ? 1 : 0) + (isQuizCompleted("hydro") ? 1 : 0) + (isQuizCompleted("bio") ? 1 : 0);
    return Math.round(((stepsDone + quizDone * 3) / (stepsTotal + 9)) * 100);
  })();

  return (
    <div className="gradient-bg min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <ParticlesBackground color="primary" count={50} />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5 animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Gamified Learning Experience
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-balance leading-[0.9] mb-8 text-foreground">
              Technologies for{" "}
              <span className="gradient-text">Material Recovery</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-pretty mb-10">
              Unlock steps, answer quizzes, earn XP, and collect achievements as you learn about metal recovery from e-waste and ores.
            </p>
          </ScrollReveal>

          {/* Stats bar */}
          <ScrollReveal delay={300}>
            <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl">
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-primary">{state.level}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Level</div>
              </div>
              <div className="w-px h-8 bg-border/40" />
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-foreground">{state.xp}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total XP</div>
              </div>
              <div className="w-px h-8 bg-border/40" />
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-28 h-2.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-1000"
                      style={{ width: `${totalProgress}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono font-bold text-primary">{totalProgress}%</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Progress</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Technology Cards */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Select a Path</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                Choose Your Technology
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Each technology has 5 unlockable levels, a bonus video, and a final quiz.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {techCards.map((card, i) => {
              const stepsComplete = getUnlockedSteps(card.techId);
              const quizDone = isQuizCompleted(card.techId);
              const isComplete = stepsComplete === 5 && quizDone;
              return (
                <ScrollReveal key={card.title} delay={i * 120}>
                  <div
                    className={`
                      relative group cursor-pointer rounded-2xl border border-border/40 
                      bg-card/50 backdrop-blur-xl overflow-hidden
                      transition-all duration-500 hover:scale-[1.04] active:scale-[0.97]
                      ${card.borderGlow}
                    `}
                    onClick={() => navigate(card.route)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && navigate(card.route)}
                  >
                    {/* Animated gradient border top */}
                    <div className={`h-1 w-full bg-gradient-to-r ${card.gradient.replace('/20', '/80').replace('/10', '/60')}`} />
                    
                    {/* Background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative p-8 text-center">
                      {/* Emoji with glow ring */}
                      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/50 border border-border/30 mb-6 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-4xl">{card.emoji}</span>
                        {isComplete && (
                          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-bio flex items-center justify-center">
                            <Shield className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-foreground">{card.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {card.description}
                      </p>

                      {/* Progress ring */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="relative w-16 h-16">
                          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--secondary))" strokeWidth="4" />
                            <circle
                              cx="32" cy="32" r="28" fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeDasharray={`${(stepsComplete / 5) * 176} 176`}
                              className="transition-all duration-700"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold font-mono text-foreground">
                            {stepsComplete}/5
                          </span>
                        </div>
                        <div className="text-left">
                          <div className="text-xs text-muted-foreground mb-1">Levels Complete</div>
                          <div className={`text-xs font-semibold ${quizDone ? "text-bio" : "text-muted-foreground"}`}>
                            Quiz: {quizDone ? "✓ Passed" : "Pending"}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                        {isComplete ? "Review Path" : stepsComplete > 0 ? "Continue" : "Start Journey"}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Analysis</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
                Technology Comparison
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30 bg-secondary/20">
                      <th className="text-left p-5 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Aspect</th>
                      <th className="p-5 font-semibold text-fire text-xs uppercase tracking-wider">🔥 Pyro</th>
                      <th className="p-5 font-semibold text-water text-xs uppercase tracking-wider">💧 Hydro</th>
                      <th className="p-5 font-semibold text-bio text-xs uppercase tracking-wider">🦠 Bio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr
                        key={row.aspect}
                        className={`${i < comparisonData.length - 1 ? "border-b border-border/20" : ""} hover:bg-secondary/10 transition-colors`}
                      >
                        <td className="p-5 font-semibold text-foreground">{row.aspect}</td>
                        <td className="p-5 text-center text-muted-foreground">{row.pyro}</td>
                        <td className="p-5 text-center text-muted-foreground">{row.hydro}</td>
                        <td className="p-5 text-center text-muted-foreground">{row.bio}</td>
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
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Benefits</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
                Why Material Recovery Matters
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: <Leaf className="h-7 w-7" />, title: "Eco-Friendly", desc: "Reduces mining waste and greenhouse emissions by recycling existing materials.", color: "bio" },
              { icon: <DollarSign className="h-7 w-7" />, title: "Cost-Effective", desc: "Recovers valuable metals at lower costs than traditional primary extraction.", color: "primary" },
              { icon: <Mountain className="h-7 w-7" />, title: "Low-Grade Ore Suitable", desc: "Bioleaching and hydrometallurgy can process ores too lean for conventional smelting.", color: "water" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="group relative rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-8 text-center hover:border-primary/30 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/20 py-10">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <Zap className="h-4 w-4 inline-block mr-2 text-primary" />
          Educational resource on material recovery technologies
        </div>
      </footer>
    </div>
  );
};

export default Index;
