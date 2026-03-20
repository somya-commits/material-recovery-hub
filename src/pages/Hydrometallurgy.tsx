import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FlowStep from "@/components/FlowStep";
import { ScrollReveal } from "@/components/ScrollReveal";

const steps = [
  { icon: "📱", title: "Step 1: Waste Material", description: "E-waste or low-grade ores are collected as feedstock for aqueous processing.", color: "water" },
  { icon: "⚙️", title: "Step 2: Pre-processing", description: "Mechanical crushing and grinding to liberate metal-bearing particles.", color: "water" },
  { icon: "💧", title: "Step 3: Leaching", description: "Metals are dissolved using acids (H₂SO₄, HCl) or cyanide solutions to form metal-ion complexes in solution.", color: "water" },
  { icon: "🧪", title: "Step 4: Purification & Refining", description: "Solvent extraction, ion exchange, or electrowinning to isolate and purify individual metals.", color: "water" },
  { icon: "🥇", title: "Step 5: Pure Metals", description: "Recovered metals: gold (Au), silver (Ag), copper (Cu), nickel (Ni), and rare earth elements.", color: "water" },
];

const Hydrometallurgy = () => (
  <div className="gradient-bg min-h-screen pt-16">
    <div className="container mx-auto px-6 py-16 md:py-24">
      <ScrollReveal>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <div className="text-center mb-16">
          <span className="text-5xl mb-4 block">💧</span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Hydrometallurgy</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Aqueous-based metal extraction using chemical leaching, solvent extraction, and electrowinning processes.
          </p>
        </div>
      </ScrollReveal>

      <div className="flex flex-col items-center gap-0 mb-20">
        {steps.map((step, i) => (
          <ScrollReveal key={step.title} delay={i * 100}>
            <FlowStep {...step} isLast={i === steps.length - 1} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Watch: Hydrometallurgy Explained</h2>
          <div className="glass-card overflow-hidden aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Kv8knVosXsg"
              title="Hydrometallurgy Process"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
);

export default Hydrometallurgy;
