import { Link, useLocation } from "react-router-dom";
import { Home, FlaskConical, Trophy } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { state, xpToNext, xpInCurrentLevel } = useGame();
  const [showAchievements, setShowAchievements] = useState(false);
  const unlockedCount = state.achievements.filter(a => a.unlocked).length;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <FlaskConical className="h-5 w-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-semibold text-sm tracking-tight text-foreground">
              Material Recovery
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* XP Display */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-primary">LVL {state.level}</span>
                <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(xpInCurrentLevel / xpToNext) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground">{state.xp} XP</span>
              </div>
            </div>

            {/* Mobile XP */}
            <span className="sm:hidden text-xs font-mono font-semibold text-primary">
              LVL {state.level} · {state.xp} XP
            </span>

            {/* Achievements */}
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors active:scale-[0.97]"
            >
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Badges</span>
              {unlockedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {unlockedCount}
                </span>
              )}
            </button>

            <Link
              to="/"
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isHome
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Achievements Panel */}
      {showAchievements && (
        <>
          <div className="fixed inset-0 z-[60] bg-background/50 backdrop-blur-sm" onClick={() => setShowAchievements(false)} />
          <div className="fixed top-16 right-4 z-[70] w-80 max-h-[70vh] overflow-y-auto glass-card p-5 animate-fade-up">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" /> Achievements
            </h3>
            <div className="space-y-3">
              {state.achievements.map(a => (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    a.unlocked ? "bg-primary/5 border border-primary/20" : "opacity-40"
                  }`}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.description}</p>
                  </div>
                  {a.unlocked && <CheckMark />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const CheckMark = () => (
  <svg className="h-4 w-4 text-bio ml-auto shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export default Navbar;
