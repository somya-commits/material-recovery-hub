import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lock, CheckCircle2, Star, Trophy, Play, Zap } from "lucide-react";
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

  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const totalNodes = steps.length + 2; // steps + video + quiz
  const glowVar = `--glow-${techColor}`;

  const canAccess = (i: number) => {
    if (i === 0) return true;
    if (i < steps.length) return unlocked >= i;
    if (i === steps.length) return unlocked >= steps.length; // video
    return unlocked >= steps.length; // quiz
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
    if (i === steps.length) return "Video";
    return "Quiz";
  };

  const nodeIcon = (i: number) => {
    if (i < steps.length) return steps[i].icon;
    if (i === steps.length) return "🎬";
    return "🎯";
  };

  // Path positions — zigzag pattern
  const getNodePosition = (i: number) => {
    const isLeft = i % 2 === 0;
    return { x: isLeft ? 25 : 75, y: i };
  };

  return (
    <div className="gradient-bg min-h-screen pt-16">
      <div className="container mx-auto px-6 py-12 md:py-16 max-w-5xl">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{techEmoji}</span>
              <span className="text-lg font-bold text-foreground">{techName}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-mono text-primary">
              <Star className="h-4 w-4" />
              {unlocked}/{steps.length}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Level Map */}
          <ScrollReveal>
            <div className="glass-card p-6 relative">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6 text-center">
                Level Map
              </h3>
              <div className="relative flex flex-col items-center gap-2">
                {Array.from({ length: totalNodes }).map((_, i) => {
                  const accessible = canAccess(i);
                  const completed = isCompleted(i);
                  const pos = getNodePosition(i);
                  const isActive =
                    (i < steps.length && activeNode === i) ||
                    (i === steps.length && showVideo) ||
                    (i === steps.length + 1 && showQuiz);

                  return (
                    <div key={i} className="w-full">
                      {/* Connector line */}
                      {i > 0 && (
                        <div className="flex justify-center my-1">
                          <div
                            className="w-0.5 h-6 rounded-full transition-colors duration-300"
                            style={{
                              background: completed || accessible
                                ? `linear-gradient(to bottom, hsl(var(${glowVar}) / 0.6), hsl(var(${glowVar}) / 0.2))`
                                : "hsl(var(--border) / 0.3)",
                            }}
                          />
                        </div>
                      )}

                      {/* Node */}
                      <button
                        onClick={() => handleNodeClick(i)}
                        disabled={!accessible}
                        className={`
                          w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative
                          ${isActive
                            ? "bg-primary/15 border border-primary/40 scale-[1.02]"
                            : accessible
                              ? "hover:bg-secondary/60 border border-transparent hover:border-border/50"
                              : "opacity-40 cursor-not-allowed border border-transparent"
                          }
                        `}
                        style={isActive ? {
                          boxShadow: `0 0 20px hsl(var(${glowVar}) / 0.2)`,
                        } : {}}
                      >
                        {/* Node circle */}
                        <div
                          className={`
                            relative w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0
                            transition-all duration-300
                            ${completed
                              ? "bg-bio/20 border-2 border-bio/50"
                              : isActive
                                ? "border-2 bg-primary/20"
                                : accessible
                                  ? "bg-secondary border-2 border-border/50 group-hover:border-primary/30"
                                  : "bg-secondary/50 border-2 border-border/30"
                            }
                          `}
                          style={isActive ? { borderColor: `hsl(var(${glowVar}) / 0.5)` } : {}}
                        >
                          {!accessible ? (
                            <Lock className="h-4 w-4 text-muted-foreground/50" />
                          ) : completed ? (
                            <CheckCircle2 className="h-5 w-5 text-bio" />
                          ) : (
                            <span>{nodeIcon(i)}</span>
                          )}
                        </div>

                        {/* Label */}
                        <div className="flex-1 text-left min-w-0">
                          <div className="text-xs text-muted-foreground font-mono">
                            {i < steps.length ? `Level ${i + 1}` : i === steps.length ? "Bonus" : "Final"}
                          </div>
                          <div className="text-sm font-medium text-foreground truncate">
                            {nodeLabel(i)}
                          </div>
                        </div>

                        {/* XP badge */}
                        {accessible && !completed && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                            +{i < steps.length ? "20" : i === steps.length ? "15" : "50"} XP
                          </span>
                        )}
                        {completed && (
                          <Star className="h-4 w-4 text-bio shrink-0" />
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
                <div className="glass-card p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="text-6xl mb-6">{techEmoji}</div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Ready to explore {techName}?
                  </h2>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Select a level from the map to begin your journey. Complete each level to unlock the next!
                  </p>
                  <button
                    onClick={() => handleNodeClick(0)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
                  >
                    <Play className="h-4 w-4" /> Start Level 1
                  </button>
                </div>
              </ScrollReveal>
            )}

            {/* Step Content */}
            {activeNode !== null && (
              <div key={activeNode} className="animate-fade-up">
                <div className="glass-card overflow-hidden" style={{
                  boxShadow: `0 0 40px hsl(var(${glowVar}) / 0.15)`,
                  borderColor: `hsl(var(${glowVar}) / 0.3)`,
                }}>
                  {/* Step image */}
                  <div className="relative">
                    <img
                      src={steps[activeNode].image}
                      alt={steps[activeNode].title}
                      className="w-full h-48 md:h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-primary/20 backdrop-blur-sm text-xs font-mono text-primary border border-primary/20">
                        Level {activeNode + 1}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-secondary/60 backdrop-blur-sm text-xs font-mono text-primary">
                        +20 XP
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="text-4xl mb-4">{steps[activeNode].icon}</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {steps[activeNode].title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {steps[activeNode].description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3 mb-8">
                      {steps[activeNode].details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                          <Zap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground/80">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      {activeNode > 0 ? (
                        <button
                          onClick={() => setActiveNode(activeNode - 1)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.97]"
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
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
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
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:opacity-90 transition-all active:scale-[0.97] animate-pulse"
                        >
                          <Star className="h-4 w-4" /> Unlock & Continue
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
                <div className="glass-card p-8 text-center mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-mono text-primary mb-4">
                    <Play className="h-3 w-3" /> Bonus Content · +15 XP
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">🎬 {videoTitle}</h2>
                  <p className="text-sm text-muted-foreground">Watch the video to learn more</p>
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

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => { setShowVideo(false); setActiveNode(steps.length - 1); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.97]"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => { watchVideo(techId); setShowVideo(false); setShowQuiz(true); }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
                  >
                    <Trophy className="h-4 w-4" /> Take Quiz
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
        <h3 className="text-2xl font-bold text-foreground mb-2">Quest Complete!</h3>
        <p className="text-muted-foreground mb-6">You've mastered this path. +50 XP earned.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
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
      <div className="glass-card p-10 text-center">
        <div className="text-5xl mb-4">{passed ? "🎉" : "😅"}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {passed ? "Victory!" : "Not Quite!"}
        </h3>
        <p className="text-lg text-muted-foreground mb-2">Score: {score}/{questions.length}</p>
        <p className="text-sm text-muted-foreground mb-6">
          {passed ? "+50 XP earned! 🌟" : "Need 60% to pass. Try again!"}
        </p>
        <button
          onClick={() => {
            if (passed) navigate("/");
            else { setCurrentQ(0); setScore(0); setSelected(null); setShowResult(false); setAnswered(false); }
          }}
          className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all active:scale-[0.97]"
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
      <div className="glass-card p-6 text-center mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-mono text-primary mb-3">
          <Trophy className="h-3 w-3" /> Final Challenge · +50 XP
        </span>
        <h2 className="text-2xl font-bold text-foreground mb-1">🎯 Knowledge Quiz</h2>
        <p className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
      </div>

      <div className="h-2 rounded-full bg-secondary mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        />
      </div>

      <div className="glass-card p-8">
        <h3 className="text-lg font-semibold text-foreground mb-6">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let stateClass = "border-border/50 hover:border-primary/50";
            if (answered) {
              if (idx === q.correct) stateClass = "border-bio bg-bio/10";
              else if (idx === selected) stateClass = "border-destructive bg-destructive/10";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${stateClass} ${answered ? "" : "cursor-pointer active:scale-[0.98]"}`}
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
