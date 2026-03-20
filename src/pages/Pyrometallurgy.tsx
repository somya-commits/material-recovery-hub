import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FlowStep from "@/components/FlowStep";
import { ScrollReveal } from "@/components/ScrollReveal";

const steps = [
  { icon: "📱", title: "Step 1: Waste Material", description: "Collection of e-waste (circuit boards, cables) or mineral ores containing target metals.", color: "fire" },
  { icon: "⚙️", title: "Step 2: Pre-processing", description: "Crushing, grinding, and sorting to increase surface area and separate components.", color: "fire" },
  { icon: "🔥", title: "Step 3: Smelting & Roasting", description: "Materials are heated to extreme temperatures (1000–1500°C) in furnaces to melt and separate metals from slag.", color: "fire" },
  { icon: "🧪", title: "Step 4: Purification & Refining", description: "Electrolytic refining and chemical treatments to achieve high-purity metal output.", color: "fire" },
  { icon: "🥇", title: "Step 5: Pure Metals", description: "Final output: high-purity gold (Au), silver (Ag), copper (Cu), and other valuable metals.", color: "fire" },
];

const Pyrometallurgy = () => (
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
        </div>
      </ScrollReveal>

      {/* Flowchart */}
      <div className="flex flex-col items-center gap-0 mb-20">
        {steps.map((step, i) => (
          <ScrollReveal key={step.title} delay={i * 100}>
            <FlowStep {...step} isLast={i === steps.length - 1} />
          </ScrollReveal>
        ))}
      </div>

      {/* Video */}
      <ScrollReveal>
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Watch: Pyrometallurgy Explained</h2>
          <div className="glass-card overflow-hidden aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/XJn9NRkkJqk"
              title="Pyrometallurgy Process"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
);

export default Pyrometallurgy;
