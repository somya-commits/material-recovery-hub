import TechStepPage from "@/components/TechStepPage";
import imgWaste from "@/assets/step-waste-material.jpg";
import imgPreprocess from "@/assets/step-preprocessing.jpg";
import imgLeaching from "@/assets/step-hydro-leaching.jpg";
import imgPurification from "@/assets/step-purification.jpg";
import imgPureMetals from "@/assets/step-pure-metals.jpg";

const steps = [
  {
    icon: "📱", title: "Waste Material Collection",
    description: "E-waste or low-grade ores are collected as feedstock for aqueous chemical processing.",
    details: ["Circuit boards, batteries, and catalytic converters are common sources", "Low-grade ores uneconomical for smelting are ideal candidates", "Materials are inventoried and categorized by metal content"],
    image: imgWaste,
  },
  {
    icon: "⚙️", title: "Pre-processing",
    description: "Mechanical crushing and grinding liberate metal-bearing particles from the bulk material.",
    details: ["Size reduction increases the surface area for chemical attack", "Screening separates particles by size for uniform processing", "De-coating removes plastic or paint layers from e-waste"],
    image: imgPreprocess,
  },
  {
    icon: "💧", title: "Leaching",
    description: "Metals are dissolved using acids (H₂SO₄, HCl) or cyanide solutions to form metal-ion complexes in aqueous solution.",
    details: ["Sulfuric acid dissolves base metals like copper and nickel", "Cyanide solutions selectively dissolve gold and silver", "Temperature and pH are carefully controlled for selectivity"],
    image: imgLeaching,
  },
  {
    icon: "🧪", title: "Purification & Refining",
    description: "Solvent extraction, ion exchange, or electrowinning isolate and purify individual metals from the leach solution.",
    details: ["Solvent extraction separates metals using organic solvents", "Electrowinning plates pure metal onto cathodes using electricity", "Ion exchange resins selectively capture target metal ions"],
    image: imgPurification,
  },
  {
    icon: "🥇", title: "Pure Metals Output",
    description: "Recovered metals include gold (Au), silver (Ag), copper (Cu), nickel (Ni), and rare earth elements at commercial purity.",
    details: ["Copper cathodes achieve 99.99% purity", "Precious metals are further refined to bullion grade", "Rare earth elements are separated into individual oxides"],
    image: imgPureMetals,
  },
];

const quizQuestions = [
  { question: "What is the primary mechanism in hydrometallurgy?", options: ["Heating to high temperatures", "Using bacteria", "Dissolving metals in aqueous solutions", "Magnetic separation"], correct: 2 },
  { question: "Which acid is commonly used in leaching?", options: ["Acetic acid", "Sulfuric acid (H₂SO₄)", "Carbonic acid", "Citric acid"], correct: 1 },
  { question: "What is electrowinning?", options: ["Melting metals in furnaces", "Using electricity to deposit metals from solution", "Bacterial oxidation", "Grinding ore"], correct: 1 },
  { question: "Hydrometallurgy operates at what temperature range?", options: ["1000–1500°C", "500–800°C", "25–100°C", "Below 0°C"], correct: 2 },
];

const Hydrometallurgy = () => (
  <TechStepPage
    techId="hydro" techName="Hydrometallurgy" techEmoji="💧" techColor="water"
    steps={steps} videoUrl="https://www.youtube.com/embed/cIATxjGugN4?start=28"
    videoTitle="Hydrometallurgy Explained" quizQuestions={quizQuestions}
  />
);

export default Hydrometallurgy;
