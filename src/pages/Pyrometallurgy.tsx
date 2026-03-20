import TechStepPage from "@/components/TechStepPage";

const steps = [
  {
    icon: "📱",
    title: "Waste Material Collection",
    description: "E-waste like circuit boards, cables, and old electronics — or mineral ores — are gathered as raw feedstock for metal recovery.",
    details: [
      "Sources include discarded phones, computers, and industrial scrap",
      "Mineral ores from mines also serve as primary feedstock",
      "Materials are sorted by type for efficient processing",
    ],
  },
  {
    icon: "⚙️",
    title: "Pre-processing",
    description: "Raw materials are crushed, ground, and sorted to increase surface area and separate valuable components from waste.",
    details: [
      "Crushing breaks large pieces into smaller fragments",
      "Grinding reduces particle size for better heat transfer",
      "Magnetic and density-based sorting separates metals from non-metals",
    ],
  },
  {
    icon: "🔥",
    title: "Smelting & Roasting",
    description: "Materials are heated to extreme temperatures (1000–1500°C) in industrial furnaces. Metals melt and separate from slag.",
    details: [
      "Roasting oxidizes sulfide ores at high temperatures",
      "Smelting melts the concentrate to separate metal from slag",
      "Flux agents help lower melting points and remove impurities",
    ],
  },
  {
    icon: "🧪",
    title: "Purification & Refining",
    description: "Crude metals undergo electrolytic refining and chemical treatments to remove remaining impurities and achieve high purity.",
    details: [
      "Electrolytic refining uses electricity to deposit pure metal",
      "Chemical treatments remove trace impurities",
      "Quality control ensures commercial-grade purity (99.9%+)",
    ],
  },
  {
    icon: "🥇",
    title: "Pure Metals Output",
    description: "The final product: high-purity gold (Au), silver (Ag), copper (Cu), and other valuable metals ready for industrial use.",
    details: [
      "Gold, silver, copper, and platinum group metals recovered",
      "Metals are cast into ingots or processed into wire/sheet",
      "Ready for electronics, jewelry, and industrial applications",
    ],
  },
];

const quizQuestions = [
  { question: "What temperature range is typically used in pyrometallurgical smelting?", options: ["100–300°C", "500–800°C", "1000–1500°C", "2000–3000°C"], correct: 2 },
  { question: "What is the primary by-product of smelting?", options: ["Acid", "Slag", "Bacteria", "Water"], correct: 1 },
  { question: "Which step comes before smelting in pyrometallurgy?", options: ["Electrowinning", "Bioleaching", "Pre-processing (Crushing)", "Precipitation"], correct: 2 },
  { question: "Pyrometallurgy is best suited for which type of ores?", options: ["Low-grade ores", "Liquid ores", "High-grade ores", "Organic ores"], correct: 2 },
];

const Pyrometallurgy = () => (
  <TechStepPage
    techId="pyro"
    techName="Pyrometallurgy"
    techEmoji="🔥"
    techColor="fire"
    steps={steps}
    videoUrl="https://www.youtube.com/embed/XJn9NRkkJqk"
    videoTitle="Pyrometallurgy Explained"
    quizQuestions={quizQuestions}
  />
);

export default Pyrometallurgy;
