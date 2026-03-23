import { Link, useLocation } from "react-router-dom";
import { Home, FlaskConical, Trophy, Sparkles, Atom } from "lucide-react";
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
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/60 backdrop-blur-2xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <FlaskConical className="h-4 w-4 text-primary transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="font-bold text-sm tracking-tight text-foreground hidden sm:block">
              Material Recovery
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* XP Display */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/40 border border-border/20">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-mono font-bold text-primary uppercase">Lvl {state.level}</span>
              </div>
              <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(xpInCurrentLevel / xpToNext) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">{state.xp}</span>
            </div>

            {/* Mobile XP */}
            <div className="sm:hidden flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/40 border border-border/20">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-mono font-bold text-primary">{state.level}</span>
              <span className="text-[10px] font-mono text-muted-foreground">· {state.xp}xp</span>
            </div>

            {/* Achievements */}
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors active:scale-[0.97]"
            >
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Badges</span>
              {unlockedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center border-2 border-background">
                  {unlockedCount}
                </span>
              )}
            </button>

            <Link
              to="/"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-200 ${
                isHome
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Achievements Panel */}
      {showAchievements && (
        <>
          <div className="fixed inset-0 z-[60] bg-background/40 backdrop-blur-sm" onClick={() => setShowAchievements(false)} />
          <div className="fixed top-14 right-4 z-[70] w-80 max-h-[70vh] overflow-y-auto rounded-2xl border border-border/30 bg-card/80 backdrop-blur-2xl p-5 animate-fade-up shadow-2xl">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-primary" /> Achievements
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">{unlockedCount}/{state.achievements.length}</span>
            </h3>
            <div className="space-y-2">
              {state.achievements.map(a => (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    a.unlocked ? "bg-primary/5 border border-primary/15" : "opacity-30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${a.unlocked ? "bg-primary/10" : "bg-secondary/50"}`}>
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground">{a.title}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{a.description}</p>
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
