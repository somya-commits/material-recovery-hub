import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useGame } from "@/contexts/GameContext";

interface StepData {
  icon: string;
  title: string;
  description: string;
  details: string[];
  image: string;
}

interface StepPageProps {
  techId: string;
  techName: string;
  techEmoji: string;
  techColor: string;
  steps: StepData[];
  videoUrl: string;
  videoTitle: string;
  quizQuestions: { question: string; options: string[]; correct: number }[];
}

const TechStepPage = ({
  techId, techName, techEmoji, techColor,
  steps, videoUrl, videoTitle, quizQuestions,
}: StepPageProps) => {
  const { unlockStep, getUnlockedSteps, watchVideo, completeQuiz, isQuizCompleted } = useGame();
  const navigate = useNavigate();
  const unlocked = getUnlockedSteps(techId);

  // Total screens: steps + video + quiz = steps.length + 2
  const totalScreens = steps.length + 2;
  const [currentScreen, setCurrentScreen] = useState(0);

  const isStepScreen = currentScreen < steps.length;
  const isVideoScreen = currentScreen === steps.length;
  const isQuizScreen = currentScreen === steps.length + 1;

  const canAccessScreen = (screen: number) => {
    if (screen === 0) return true;
    if (screen <= steps.length) return unlocked >= screen;
    if (screen === steps.length + 1) return unlocked >= steps.length;
    return false;
  };

  const handleUnlockAndNext = () => {
    if (isStepScreen) {
      const stepNum = currentScreen + 1;
      if (unlocked < stepNum) unlockStep(techId, stepNum);
      if (currentScreen < totalScreens - 1) setCurrentScreen(currentScreen + 1);
    }
  };

  const glowClass = techColor === "fire" ? "glow-fire" : techColor === "water" ? "glow-water" : "glow-bio";
  const borderColor = `hsl(var(--glow-${techColor}) / 0.4)`;

  return (
    <div className="gradient-bg min-h-screen pt-16">
      <div className="container mx-auto px-6 py-12 md:py-20 max-w-3xl">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <span className="text-sm font-mono text-muted-foreground">
              {techEmoji} {techName}
            </span>
          </div>
        </ScrollReveal>

        {/* Progress dots */}
        <ScrollReveal delay={50}>
          <div className="flex items-center justify-center gap-2 mb-10">
            {Array.from({ length: totalScreens }).map((_, i) => {
              const accessible = canAccessScreen(i);
              const active = i === currentScreen;
              const completed = i < steps.length ? unlocked > i : i === steps.length ? false : isQuizCompleted(techId);
              return (
                <button
                  key={i}
                  onClick={() => accessible && setCurrentScreen(i)}
                  disabled={!accessible}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    active
                      ? "bg-primary scale-125 ring-2 ring-primary/30"
                      : completed
                        ? "bg-bio"
                        : accessible
                          ? "bg-secondary hover:bg-muted-foreground/40 cursor-pointer"
                          : "bg-secondary/50"
                  }`}
                  title={
                    i < steps.length ? `Step ${i + 1}` : i === steps.length ? "Video" : "Quiz"
                  }
                />
              );
            })}
          </div>
        </ScrollReveal>

        {/* Step Screen */}
        {isStepScreen && (
          <div key={currentScreen} className="animate-fade-up">
            <div
              className={`glass-card p-8 md:p-12 text-center ${canAccessScreen(currentScreen) ? glowClass : ""}`}
              style={{ borderColor: canAccessScreen(currentScreen) ? borderColor : undefined }}
            >
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 block">
                Step {currentScreen + 1} of {steps.length}
              </span>
              {/* Step Image */}
              <div className="rounded-xl overflow-hidden mb-6 max-w-md mx-auto">
                <img
                  src={steps[currentScreen].image}
                  alt={steps[currentScreen].title}
                  className="w-full h-48 md:h-56 object-cover"
                />
              </div>
              <div className="text-4xl mb-4">{steps[currentScreen].icon}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {steps[currentScreen].title}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
                {steps[currentScreen].description}
              </p>

              {/* Detail bullets */}
              <div className="text-left max-w-md mx-auto space-y-3 mb-8">
                {steps[currentScreen].details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/80">{detail}</span>
                  </div>
                ))}
              </div>

              <span className="inline-block text-xs font-mono text-primary/60 mb-2">+20 XP</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentScreen(Math.max(0, currentScreen - 1))}
                disabled={currentScreen === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground hover:bg-secondary active:scale-[0.97]"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={handleUnlockAndNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.97]"
              >
                {unlocked > currentScreen ? "Next" : "Unlock & Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Video Screen */}
        {isVideoScreen && (
          <div key="video" className="animate-fade-up">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
                Bonus Content
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">🎬 {videoTitle}</h2>
              <p className="text-sm text-muted-foreground">Watch the video to earn +15 XP</p>
            </div>
            <div
              className="glass-card overflow-hidden aspect-video cursor-pointer"
              onClick={() => watchVideo(techId)}
            >
              <iframe
                className="w-full h-full"
                src={videoUrl}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentScreen(steps.length - 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.97]"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={() => { watchVideo(techId); setCurrentScreen(steps.length + 1); }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
              >
                Take Quiz <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Quiz Screen */}
        {isQuizScreen && (
          <div key="quiz" className="animate-fade-up">
            <InlineQuiz
              techId={techId}
              questions={quizQuestions}
              onComplete={() => completeQuiz(techId)}
              isCompleted={isQuizCompleted(techId)}
              onBack={() => setCurrentScreen(steps.length)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

/* ---- Inline Quiz Component ---- */

function InlineQuiz({
  techId, questions, onComplete, isCompleted, onBack,
}: {
  techId: string;
  questions: { question: string; options: string[]; correct: number }[];
  onComplete: () => void;
  isCompleted: boolean;
  onBack: () => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  if (isCompleted) {
    return (
      <div className="glass-card glow-primary p-10 text-center">
        <div className="text-5xl mb-4">🏆</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Completed!</h3>
        <p className="text-muted-foreground mb-6">You've already passed this quiz. +50 XP earned.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (showResult) {
    const passed = score >= Math.ceil(questions.length * 0.6);
    if (passed) onComplete();
    return (
      <div className="glass-card p-10 text-center">
        <div className="text-5xl mb-4">{passed ? "🎉" : "😅"}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {passed ? "Congratulations!" : "Keep Learning!"}
        </h3>
        <p className="text-lg text-muted-foreground mb-2">Score: {score}/{questions.length}</p>
        <p className="text-sm text-muted-foreground mb-6">
          {passed ? "+50 XP earned!" : "You need 60% to pass. Review and try again."}
        </p>
        <button
          onClick={() => {
            if (passed) navigate("/");
            else { setCurrentQ(0); setScore(0); setSelected(null); setShowResult(false); setAnswered(false); }
          }}
          className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
        >
          {passed ? "Back to Home" : "Try Again"}
        </button>
      </div>
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
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">🎯 Knowledge Quiz</h2>
        <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
      </div>

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
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-6 flex justify-between">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.97]"
            >
              <ArrowLeft className="h-4 w-4 inline mr-1" /> Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
            >
              {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechStepPage;
