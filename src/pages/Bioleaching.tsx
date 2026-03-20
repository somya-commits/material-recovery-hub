import TechStepPage from "@/components/TechStepPage";
import imgWaste from "@/assets/step-waste-material.jpg";
import imgPreprocess from "@/assets/step-preprocessing.jpg";
import imgMicrobial from "@/assets/step-bio-microbial.jpg";
import imgPurification from "@/assets/step-purification.jpg";
import imgPureMetals from "@/assets/step-pure-metals.jpg";

const steps = [
  {
    icon: "📱", title: "Waste Material Collection",
    description: "Low-grade ores or mine tailings containing trace metals are selected — materials too lean for conventional smelting.",
    details: ["Mine tailings and waste dumps are common bioleaching feedstock", "Copper, gold, and uranium ores with <1% metal content are viable", "E-waste can also be processed via bioleaching methods"],
    image: imgWaste,
  },
  {
    icon: "⚙️", title: "Pre-processing",
    description: "Minimal crushing is needed — bioleaching bacteria can work on larger particles than chemical methods require.",
    details: ["Coarse crushing to ~10cm is often sufficient", "Heap leaching uses run-of-mine ore with minimal processing", "Agitation leaching uses finer particles for faster results"],
    image: imgPreprocess,
  },
  {
    icon: "🦠", title: "Microbial Action",
    description: "Bacteria like Acidithiobacillus ferrooxidans oxidize sulfide minerals, releasing metal ions into solution over days to weeks.",
    details: ["Bacteria produce sulfuric acid and ferric iron as oxidizing agents", "Process operates at ambient temperature (20–40°C)", "Heap, dump, or stirred-tank bioreactors are used"],
    image: imgMicrobial,
  },
  {
    icon: "🧪", title: "Purification & Refining",
    description: "Metal-rich leachate is processed via solvent extraction or precipitation to concentrate target metals.",
    details: ["Solvent extraction separates copper from the pregnant solution", "Cementation precipitates gold using zinc dust", "Further electrorefining achieves final purity"],
    image: imgPurification,
  },
  {
    icon: "🥇", title: "Pure Metals Output",
    description: "Recovered copper (Cu), gold (Au), uranium (U), and other metals at commercial purity — all with minimal environmental impact.",
    details: ["~20% of world copper production uses bioleaching", "Gold recovery from refractory ores is a major application", "Uranium extraction for nuclear fuel is commercially practiced"],
    image: imgPureMetals,
  },
];

const quizQuestions = [
  { question: "Which organism is commonly used in bioleaching?", options: ["E. coli", "Yeast", "Acidithiobacillus ferrooxidans", "Lactobacillus"], correct: 2 },
  { question: "Bioleaching is most suitable for which type of ore?", options: ["High-grade ores", "Liquid ores", "Low-grade ores", "Synthetic ores"], correct: 2 },
  { question: "How long does bioleaching typically take?", options: ["Minutes", "Hours", "Days to weeks", "Years"], correct: 2 },
  { question: "What is the main environmental advantage of bioleaching?", options: ["Fastest method", "Highest recovery rate", "Low energy and low emissions", "Uses no water"], correct: 2 },
];

const Bioleaching = () => (
  <TechStepPage
    techId="bio" techName="Bioleaching" techEmoji="🦠" techColor="bio"
    steps={steps} videoUrl="https://www.youtube.com/embed/329RMsMqHOc"
    videoTitle="Bioleaching Explained" quizQuestions={quizQuestions}
  />
);

export default Bioleaching;
