import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lock, CheckCircle2, Star, Trophy, Play, Zap, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useGame } from "@/contexts/GameContext";
import ParticlesBackground from "@/components/ParticlesBackground";

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

  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const totalNodes = steps.length + 2;
  const glowVar = `--glow-${techColor}`;

  const canAccess = (i: number) => {
    if (i === 0) return true;
    if (i < steps.length) return unlocked >= i;
    if (i === steps.length) return unlocked >= steps.length;
    return unlocked >= steps.length;
  };

  const isCompleted = (i: number) => {
    if (i < steps.length) return unlocked > i;
    if (i === steps.length) return false;
    return isQuizCompleted(techId);
  };

  const handleNodeClick = (i: number) => {
    if (!canAccess(i)) return;
    if (i < steps.length) {
      setActiveNode(i);
      setShowVideo(false);
      setShowQuiz(false);
    } else if (i === steps.length) {
      setActiveNode(null);
      setShowVideo(true);
      setShowQuiz(false);
    } else {
      setActiveNode(null);
      setShowVideo(false);
      setShowQuiz(true);
    }
  };

  const handleUnlock = () => {
    if (activeNode === null) return;
    const stepNum = activeNode + 1;
    if (unlocked < stepNum) unlockStep(techId, stepNum);
  };

  const nodeLabel = (i: number) => {
    if (i < steps.length) return steps[i].title;
    if (i === steps.length) return "Bonus Video";
    return "Final Quiz";
  };

  const nodeIcon = (i: number) => {
    if (i < steps.length) return steps[i].icon;
    if (i === steps.length) return "🎬";
    return "🎯";
  };

  const completedCount = Array.from({ length: totalNodes }).filter((_, i) => isCompleted(i)).length;
  const progressPercent = Math.round((completedCount / totalNodes) * 100);

  return (
    <div className="gradient-bg min-h-screen pt-16 relative">
      <ParticlesBackground color={techColor} count={30} />

      <div className="container mx-auto px-6 py-12 md:py-16 max-w-6xl relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/50 border border-border/30 flex items-center justify-center text-xl">
                {techEmoji}
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground leading-tight">{techName}</h1>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{progressPercent}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <Star className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-mono font-bold text-primary">{unlocked}/{steps.length}</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Level Map */}
          <ScrollReveal>
            <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-5 relative overflow-hidden">
              {/* Subtle gradient at top */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary/5 to-transparent" />

              <h3 className="relative text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-5 text-center flex items-center justify-center gap-2">
                <Sparkles className="h-3 w-3 text-primary" /> Level Map
              </h3>

              <div className="relative flex flex-col items-center gap-1">
                {Array.from({ length: totalNodes }).map((_, i) => {
                  const accessible = canAccess(i);
                  const completed = isCompleted(i);
                  const isActive =
                    (i < steps.length && activeNode === i) ||
                    (i === steps.length && showVideo) ||
                    (i === steps.length + 1 && showQuiz);

                  return (
                    <div key={i} className="w-full">
                      {/* Connector */}
                      {i > 0 && (
                        <div className="flex justify-center">
                          <div className="w-px h-4 transition-colors duration-300"
                            style={{
                              background: completed || accessible
                                ? `linear-gradient(to bottom, hsl(var(${glowVar}) / 0.5), hsl(var(${glowVar}) / 0.15))`
                                : "hsl(var(--border) / 0.2)",
                            }}
                          />
                        </div>
                      )}

                      {/* Node */}
                      <button
                        onClick={() => handleNodeClick(i)}
                        disabled={!accessible}
                        className={`
                          w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 group relative
                          ${isActive
                            ? "bg-primary/10 border border-primary/30"
                            : accessible
                              ? "hover:bg-secondary/40 border border-transparent"
                              : "opacity-30 cursor-not-allowed border border-transparent"
                          }
                        `}
                        style={isActive ? { boxShadow: `0 0 24px hsl(var(${glowVar}) / 0.15)` } : {}}
                      >
                        {/* Node icon */}
                        <div className={`
                          relative w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0
                          transition-all duration-300
                          ${completed
                            ? "bg-bio/15 border-2 border-bio/40"
                            : isActive
                              ? "bg-primary/15 border-2"
                              : accessible
                                ? "bg-secondary/60 border border-border/40 group-hover:border-primary/20"
                                : "bg-secondary/30 border border-border/20"
                          }
                        `}
                          style={isActive ? { borderColor: `hsl(var(${glowVar}) / 0.5)` } : {}}
                        >
                          {!accessible ? (
                            <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />
                          ) : completed ? (
                            <CheckCircle2 className="h-4.5 w-4.5 text-bio" />
                          ) : (
                            <span>{nodeIcon(i)}</span>
                          )}

                          {/* Pulse ring for active */}
                          {isActive && (
                            <span className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-ping opacity-40" />
                          )}
                        </div>

                        {/* Label */}
                        <div className="flex-1 text-left min-w-0">
                          <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                            {i < steps.length ? `Level ${i + 1}` : i === steps.length ? "Bonus" : "Final"}
                          </div>
                          <div className="text-xs font-semibold text-foreground truncate">
                            {nodeLabel(i)}
                          </div>
                        </div>

                        {/* XP / Status */}
                        {accessible && !completed && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-primary/10 text-primary shrink-0 border border-primary/10">
                            +{i < steps.length ? "20" : i === steps.length ? "15" : "50"}
                          </span>
                        )}
                        {completed && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-bio shrink-0" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Content Panel */}
          <div className="min-h-[400px]">
            {/* No selection */}
            {activeNode === null && !showVideo && !showQuiz && (
              <ScrollReveal>
                <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-14 text-center h-full flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                  <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-secondary/50 border border-border/30 flex items-center justify-center text-5xl mx-auto mb-8">
                      {techEmoji}
                    </div>
                    <h2 className="text-3xl font-extrabold text-foreground mb-4">
                      Ready to explore {techName}?
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto mb-10">
                      Select a level from the map to begin your journey. Complete each level to unlock the next!
                    </p>
                    <button
                      onClick={() => handleNodeClick(0)}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-all active:scale-[0.97] shadow-lg shadow-primary/20"
                    >
                      <Play className="h-4 w-4" /> Start Level 1
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Step Content */}
            {activeNode !== null && (
              <div key={activeNode} className="animate-fade-up">
                <div className="rounded-2xl border overflow-hidden bg-card/40 backdrop-blur-xl" style={{
                  boxShadow: `0 0 50px hsl(var(${glowVar}) / 0.12)`,
                  borderColor: `hsl(var(${glowVar}) / 0.25)`,
                }}>
                  {/* Step image */}
                  <div className="relative">
                    <img
                      src={steps[activeNode].image}
                      alt={steps[activeNode].title}
                      className="w-full h-52 md:h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-lg bg-primary/20 backdrop-blur-md text-xs font-mono font-bold text-primary border border-primary/20">
                          Level {activeNode + 1}
                        </span>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg bg-secondary/60 backdrop-blur-md text-xs font-mono text-accent border border-accent/20">
                        +20 XP
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-secondary/50 border border-border/30 flex items-center justify-center text-3xl shrink-0">
                        {steps[activeNode].icon}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                          {steps[activeNode].title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {steps[activeNode].description}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2.5 mb-8">
                      {steps[activeNode].details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-secondary/20 border border-border/20 hover:bg-secondary/30 transition-colors">
                          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Zap className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm text-foreground/80 leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                      {activeNode > 0 ? (
                        <button
                          onClick={() => setActiveNode(activeNode - 1)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all active:scale-[0.97]"
                        >
                          <ArrowLeft className="h-4 w-4" /> Previous
                        </button>
                      ) : <div />}

                      {unlocked > activeNode ? (
                        <button
                          onClick={() => {
                            if (activeNode < steps.length - 1) setActiveNode(activeNode + 1);
                            else { setActiveNode(null); setShowVideo(true); }
                          }}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.97]"
                        >
                          Next <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleUnlock();
                            if (activeNode < steps.length - 1) {
                              setTimeout(() => setActiveNode(activeNode + 1), 300);
                            } else {
                              setTimeout(() => { setActiveNode(null); setShowVideo(true); }, 300);
                            }
                          }}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.97] shadow-lg shadow-primary/20"
                        >
                          <Sparkles className="h-4 w-4" /> Unlock & Continue
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Screen */}
            {showVideo && (
              <div key="video" className="animate-fade-up">
                <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-8 text-center mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-xs font-mono font-bold text-primary mb-4 border border-primary/20">
                    <Play className="h-3 w-3" /> Bonus Content · +15 XP
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">🎬 {videoTitle}</h2>
                  <p className="text-sm text-muted-foreground">Watch the video to deepen your understanding</p>
                </div>
                <div className="rounded-2xl border border-border/30 overflow-hidden aspect-video" onMouseEnter={() => watchVideo(techId)}>
                  <iframe
                    className="w-full h-full"
                    src={videoUrl}
                    title={videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => { setShowVideo(false); setActiveNode(steps.length - 1); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all active:scale-[0.97]"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => { watchVideo(techId); setShowVideo(false); setShowQuiz(true); }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all active:scale-[0.97] shadow-lg shadow-primary/20"
                  >
                    <Trophy className="h-4 w-4" /> Take the Quiz
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Screen */}
            {showQuiz && (
              <div key="quiz" className="animate-fade-up">
                <InlineQuiz
                  techId={techId}
                  questions={quizQuestions}
                  onComplete={() => completeQuiz(techId)}
                  isCompleted={isQuizCompleted(techId)}
                  onBack={() => { setShowQuiz(false); setShowVideo(true); }}
                  glowVar={glowVar}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- Inline Quiz Component ---- */

function InlineQuiz({
  techId, questions, onComplete, isCompleted, onBack, glowVar,
}: {
  techId: string;
  questions: { question: string; options: string[]; correct: number }[];
  onComplete: () => void;
  isCompleted: boolean;
  onBack: () => void;
  glowVar: string;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  if (isCompleted) {
    return (
      <div className="rounded-2xl border border-bio/30 bg-card/40 backdrop-blur-xl p-12 text-center" style={{ boxShadow: "0 0 50px hsl(140 70% 45% / 0.15)" }}>
        <div className="w-20 h-20 rounded-3xl bg-bio/10 border border-bio/30 flex items-center justify-center text-4xl mx-auto mb-6">🏆</div>
        <h3 className="text-3xl font-extrabold text-foreground mb-3">Quest Complete!</h3>
        <p className="text-muted-foreground mb-8">You've mastered this path. +50 XP earned.</p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.97]"
        >
          Return to Base
        </button>
      </div>
    );
  }

  if (showResult) {
    const passed = score >= Math.ceil(questions.length * 0.6);
    if (passed) onComplete();
    return (
      <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-12 text-center">
        <div className="w-20 h-20 rounded-3xl bg-secondary/50 border border-border/30 flex items-center justify-center text-4xl mx-auto mb-6">
          {passed ? "🎉" : "😅"}
        </div>
        <h3 className="text-3xl font-extrabold text-foreground mb-3">
          {passed ? "Victory!" : "Not Quite!"}
        </h3>
        <p className="text-xl font-mono text-foreground mb-2">{score}/{questions.length}</p>
        <p className="text-sm text-muted-foreground mb-8">
          {passed ? "+50 XP earned! 🌟" : "Need 60% to pass. Try again!"}
        </p>
        <button
          onClick={() => {
            if (passed) navigate("/");
            else { setCurrentQ(0); setScore(0); setSelected(null); setShowResult(false); setAnswered(false); }
          }}
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.97]"
        >
          {passed ? "Return to Base" : "Retry"}
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
      <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-6 text-center mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-xs font-mono font-bold text-primary mb-3 border border-primary/20">
          <Trophy className="h-3 w-3" /> Final Challenge · +50 XP
        </span>
        <h2 className="text-2xl font-extrabold text-foreground mb-1">🎯 Knowledge Quiz</h2>
        <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
      </div>

      <div className="h-2 rounded-full bg-secondary mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl p-8">
        <h3 className="text-lg font-bold text-foreground mb-6">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let stateClass = "border-border/30 hover:border-primary/40 hover:bg-secondary/20";
            if (answered) {
              if (idx === q.correct) stateClass = "border-bio/50 bg-bio/10";
              else if (idx === selected) stateClass = "border-destructive/50 bg-destructive/10";
              else stateClass = "border-border/20 opacity-60";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${stateClass} ${answered ? "" : "cursor-pointer active:scale-[0.98]"}`}
              >
                <span className="w-9 h-9 rounded-lg bg-secondary/60 flex items-center justify-center text-sm font-mono font-bold text-muted-foreground shrink-0 border border-border/20">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm font-medium text-foreground">{opt}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-8 flex justify-between pt-4 border-t border-border/20">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all active:scale-[0.97]"
            >
              <ArrowLeft className="h-4 w-4 inline mr-1" /> Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-[0.97]"
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
