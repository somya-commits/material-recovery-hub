import { ScrollReveal } from "@/components/ScrollReveal";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Sparkles, Atom, Cpu, Battery, Smartphone, CircuitBoard, Gem } from "lucide-react";

const metals = [
  {
    symbol: "Au",
    name: "Gold",
    icon: <Gem className="h-6 w-6" />,
    color: "from-yellow-500/30 to-amber-600/10",
    glow: "shadow-[0_0_30px_hsl(45_100%_50%/0.2)]",
    sources: ["Circuit boards", "Connector pins", "SIM cards"],
    recovery: "Hydrometallurgy (aqua regia leaching) or cyanide-based extraction. Yields ~300g per tonne of PCBs.",
    value: "$60,000+/kg",
    purity: "99.99%",
  },
  {
    symbol: "Ag",
    name: "Silver",
    icon: <Sparkles className="h-6 w-6" />,
    color: "from-slate-300/30 to-gray-400/10",
    glow: "shadow-[0_0_30px_hsl(210_10%_70%/0.2)]",
    sources: ["Solder joints", "Contacts", "Photovoltaic cells"],
    recovery: "Nitric acid leaching followed by cementation or electrolysis. ~1,000g per tonne of e-waste.",
    value: "$800+/kg",
    purity: "99.9%",
  },
  {
    symbol: "Cu",
    name: "Copper",
    icon: <CircuitBoard className="h-6 w-6" />,
    color: "from-orange-400/30 to-amber-500/10",
    glow: "shadow-[0_0_30px_hsl(25_90%_50%/0.2)]",
    sources: ["Wiring", "PCB traces", "Heat sinks", "Motors"],
    recovery: "Pyrometallurgy (smelting) or sulfuric acid leaching + electrowinning. ~200kg per tonne.",
    value: "$9/kg",
    purity: "99.95%",
  },
  {
    symbol: "Li",
    name: "Lithium",
    icon: <Battery className="h-6 w-6" />,
    color: "from-red-400/30 to-pink-500/10",
    glow: "shadow-[0_0_30px_hsl(350_80%_55%/0.2)]",
    sources: ["Li-ion batteries", "EV battery packs"],
    recovery: "Hydrometallurgical process: shredding → acid leaching → precipitation as Li₂CO₃.",
    value: "$25/kg",
    purity: "99.5%",
  },
  {
    symbol: "Pd",
    name: "Palladium",
    icon: <Cpu className="h-6 w-6" />,
    color: "from-sky-400/30 to-blue-500/10",
    glow: "shadow-[0_0_30px_hsl(200_80%_55%/0.2)]",
    sources: ["Multilayer ceramic capacitors", "Catalytic converters"],
    recovery: "Dissolution in HCl/HNO₃ followed by selective precipitation. ~100g per tonne of PCBs.",
    value: "$40,000+/kg",
    purity: "99.95%",
  },
  {
    symbol: "REE",
    name: "Rare Earth Elements",
    icon: <Atom className="h-6 w-6" />,
    color: "from-violet-400/30 to-purple-500/10",
    glow: "shadow-[0_0_30px_hsl(270_70%_55%/0.2)]",
    sources: ["Hard drives (Nd magnets)", "Speakers", "Phosphor coatings"],
    recovery: "Bioleaching using Acidithiobacillus or acid digestion + solvent extraction.",
    value: "$100–500/kg",
    purity: "99%+",
  },
  {
    symbol: "Co",
    name: "Cobalt",
    icon: <Smartphone className="h-6 w-6" />,
    color: "from-blue-500/30 to-indigo-500/10",
    glow: "shadow-[0_0_30px_hsl(230_70%_55%/0.2)]",
    sources: ["Li-ion battery cathodes", "Superalloys"],
    recovery: "Acid leaching (H₂SO₄ + H₂O₂) → solvent extraction → electrowinning.",
    value: "$33/kg",
    purity: "99.8%",
  },
];

const MetalRecovery = () => {
  return (
    <div className="gradient-bg min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <ParticlesBackground color="primary" count={35} />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[80px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <Atom className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Metal Recovery Guide
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-balance leading-[0.9] mb-6 text-foreground">
              Recovery of{" "}
              <span className="gradient-text">Important Metals</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-pretty">
              Discover the precious and critical metals recovered from e-waste, their sources, recovery methods, and market value.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Metal Cards Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {metals.map((metal, i) => (
              <ScrollReveal key={metal.symbol} delay={i * 80}>
                <div
                  className={`
                    group relative rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl 
                    overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-primary/30
                    ${metal.glow}
                  `}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${metal.color.replace('/30', '/80').replace('/10', '/60')}`} />

                  {/* Background glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metal.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative p-6">
                    {/* Symbol & Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary/60 border border-border/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="text-2xl font-black font-mono text-primary">{metal.symbol}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{metal.name}</h3>
                        <div className="flex items-center gap-1 text-primary">
                          {metal.icon}
                        </div>
                      </div>
                    </div>

                    {/* Value badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                      <span className="text-xs font-bold text-primary">{metal.value}</span>
                    </div>

                    {/* Sources */}
                    <div className="mb-3">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Sources</p>
                      <div className="flex flex-wrap gap-1.5">
                        {metal.sources.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/50 border border-border/20 text-muted-foreground">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recovery method */}
                    <div className="mb-3">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Recovery</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{metal.recovery}</p>
                    </div>

                    {/* Purity */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/20">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Purity</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            style={{ width: metal.purity }}
                          />
                        </div>
                        <span className="text-xs font-bold font-mono text-primary">{metal.purity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">🎬 Video</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                Metal Recovery in Action
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Watch how valuable metals are recovered from electronic waste.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="rounded-2xl border border-border/30 overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/MFzQr8ZQbCI"
                title="Metal Recovery Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 block">Insight</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Why Recover These Metals?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                One tonne of circuit boards contains more gold than 17 tonnes of gold ore. E-waste is the fastest-growing waste stream globally.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { stat: "50M+", label: "Tonnes of e-waste generated yearly", icon: "📱" },
              { stat: "$57B", label: "Value of recoverable materials per year", icon: "💰" },
              { stat: "17.4%", label: "Global e-waste recycling rate (2024)", icon: "♻️" },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 100}>
                <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-8 text-center hover:border-primary/30 transition-all duration-500">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <div className="text-3xl font-black font-mono text-primary mb-2">{item.stat}</div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/20 py-10">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <Atom className="h-4 w-4 inline-block mr-2 text-primary" />
          Recovery of Important Metals — Educational Resource
        </div>
      </footer>
    </div>
  );
};

export default MetalRecovery;
