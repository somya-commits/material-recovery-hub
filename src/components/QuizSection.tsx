import { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizSectionProps {
  techId: string;
  title: string;
  questions: Question[];
}

const QuizSection = ({ techId, title, questions }: QuizSectionProps) => {
  const { completeQuiz, isQuizCompleted, addXP } = useGame();
  const completed = isQuizCompleted(techId);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  if (completed) {
    return (
      <ScrollReveal>
        <div className="glass-card glow-primary p-8 text-center max-w-2xl mx-auto">
          <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">Quiz Completed!</h3>
          <p className="text-muted-foreground">You've already aced the {title} quiz. +50 XP earned.</p>
        </div>
      </ScrollReveal>
    );
  }

  if (showResult) {
    const passed = score >= Math.ceil(questions.length * 0.6);
    if (passed) completeQuiz(techId);
    return (
      <ScrollReveal>
        <div className="glass-card p-8 text-center max-w-2xl mx-auto">
          <div className="text-5xl mb-4">{passed ? "🎉" : "😅"}</div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {passed ? "Congratulations!" : "Keep Learning!"}
          </h3>
          <p className="text-lg text-muted-foreground mb-2">
            Score: {score}/{questions.length}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {passed ? "+50 XP earned! Achievement unlocked." : "You need 60% to pass. Review the material and try again."}
          </p>
          {!passed && (
            <button
              onClick={() => { setCurrentQ(0); setScore(0); setSelected(null); setShowResult(false); setAnswered(false); }}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors active:scale-[0.97]"
            >
              Try Again
            </button>
          )}
        </div>
      </ScrollReveal>
    );
  }

  const q = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  return (
    <ScrollReveal>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 text-foreground">🎯 Knowledge Quiz</h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Answer correctly to earn XP! ({currentQ + 1}/{questions.length})
        </p>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-secondary mb-8 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentQ) / questions.length) * 100}%` }}
          />
        </div>

        <div className="glass-card p-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">{q.question}</h3>
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let borderClass = "border-border/50 hover:border-primary/50";
              if (answered) {
                if (idx === q.correct) borderClass = "border-bio bg-bio/10";
                else if (idx === selected) borderClass = "border-destructive bg-destructive/10";
              } else if (idx === selected) {
                borderClass = "border-primary";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${borderClass} ${answered ? "" : "cursor-pointer active:scale-[0.98]"}`}
                >
                  <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-mono font-semibold text-muted-foreground shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm text-foreground">{opt}</span>
                  {answered && idx === q.correct && <CheckCircle2 className="h-5 w-5 text-bio ml-auto shrink-0" />}
                  {answered && idx === selected && idx !== q.correct && <XCircle className="h-5 w-5 text-destructive ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors active:scale-[0.97]"
              >
                {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default QuizSection;
