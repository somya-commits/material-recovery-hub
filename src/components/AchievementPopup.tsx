import { useGame } from "@/contexts/GameContext";
import { X, Star } from "lucide-react";
import { useEffect } from "react";

const AchievementPopup = () => {
  const { newAchievement, dismissAchievement } = useGame();

  useEffect(() => {
    if (newAchievement) {
      const timer = setTimeout(dismissAchievement, 4000);
      return () => clearTimeout(timer);
    }
  }, [newAchievement, dismissAchievement]);

  if (!newAchievement) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fade-up">
      <div className="glass-card glow-primary p-5 flex items-center gap-4 min-w-[280px]">
        <div className="text-3xl">{newAchievement.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Star className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Achievement Unlocked!</span>
          </div>
          <p className="font-semibold text-sm text-foreground">{newAchievement.title}</p>
          <p className="text-xs text-muted-foreground">{newAchievement.description}</p>
        </div>
        <button onClick={dismissAchievement} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AchievementPopup;
