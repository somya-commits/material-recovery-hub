import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Flame, Droplets, Bug, Leaf, DollarSign, Mountain, ArrowRight, Zap, Beaker, Microscope } from "lucide-react";

const techCards = [
  {
    title: "Pyrometallurgy",
    emoji: "🔥",
    description: "High-temperature processes like smelting and roasting to extract metals from ores and e-waste.",
    cardClass: "tech-card-fire",
    route: "/pyrometallurgy",
    color: "fire",
  },
  {
    title: "Hydrometallurgy",
    emoji: "💧",
    description: "Aqueous chemistry-based extraction using leaching, solvent extraction, and electrowinning.",
    cardClass: "tech-card-water",
    route: "/hydrometallurgy",
    color: "water",
  },
  {
    title: "Bioleaching",
    emoji: "🦠",
    description: "Microbial-assisted dissolution of metals using bacteria like Acidithiobacillus ferrooxidans.",
    cardClass: "tech-card-bio",
    route: "/bioleaching",
    color: "bio",
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
              Educational Resource
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-[0.95] mb-6 text-foreground">
              Technologies for{" "}
              <span className="gradient-text">Material Recovery</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-pretty">
              Discover how metals like gold, silver, and copper are recovered from electronic waste
              and mineral ores through advanced metallurgical processes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Technology Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
              Explore the Processes
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Click on any technology to learn its step-by-step process.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {techCards.map((card, i) => (
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
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
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

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          Educational resource on material recovery technologies.
        </div>
      </footer>
    </div>
  );
};

export default Index;
