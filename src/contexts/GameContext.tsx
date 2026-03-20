import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface GameState {
  xp: number;
  level: number;
  stepsUnlocked: Record<string, number>; // e.g. { pyro: 3, hydro: 1 }
  quizzesCompleted: string[];
  achievements: Achievement[];
  videosWatched: string[];
}

const defaultAchievements: Achievement[] = [
  { id: "first_step", title: "First Steps", description: "Unlock your first process step", icon: "👣", unlocked: false },
  { id: "pyro_master", title: "Fire Starter", description: "Complete all Pyrometallurgy steps", icon: "🔥", unlocked: false },
  { id: "hydro_master", title: "Water Sage", description: "Complete all Hydrometallurgy steps", icon: "💧", unlocked: false },
  { id: "bio_master", title: "Bio Explorer", description: "Complete all Bioleaching steps", icon: "🦠", unlocked: false },
  { id: "quiz_ace", title: "Quiz Ace", description: "Pass your first quiz", icon: "🎯", unlocked: false },
  { id: "all_quizzes", title: "Knowledge Master", description: "Pass all three quizzes", icon: "🏆", unlocked: false },
  { id: "video_watcher", title: "Visual Learner", description: "Watch a process video", icon: "🎬", unlocked: false },
  { id: "completionist", title: "Completionist", description: "Reach level 5", icon: "⭐", unlocked: false },
];

const initialState: GameState = {
  xp: 0,
  level: 1,
  stepsUnlocked: {},
  quizzesCompleted: [],
  achievements: defaultAchievements,
  videosWatched: [],
};

function calcLevel(xp: number) {
  // 100 XP per level, increasing
  return Math.floor(xp / 100) + 1;
}

function xpForNextLevel(level: number) {
  return level * 100;
}

interface GameContextType {
  state: GameState;
  addXP: (amount: number) => void;
  unlockStep: (tech: string, step: number) => void;
  getUnlockedSteps: (tech: string) => number;
  completeQuiz: (tech: string) => void;
  isQuizCompleted: (tech: string) => boolean;
  watchVideo: (tech: string) => void;
  xpToNext: number;
  xpInCurrentLevel: number;
  newAchievement: Achievement | null;
  dismissAchievement: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem("game_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with default achievements to add any new ones
        const merged = {
          ...initialState,
          ...parsed,
          achievements: defaultAchievements.map(a => {
            const saved = parsed.achievements?.find((s: Achievement) => s.id === a.id);
            return saved ? { ...a, unlocked: saved.unlocked } : a;
          }),
        };
        return merged;
      }
    } catch {}
    return initialState;
  });

  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    localStorage.setItem("game_state", JSON.stringify(state));
  }, [state]);

  const unlockAchievement = (id: string, currentState: GameState): GameState => {
    const ach = currentState.achievements.find(a => a.id === id);
    if (!ach || ach.unlocked) return currentState;
    setNewAchievement({ ...ach, unlocked: true });
    return {
      ...currentState,
      achievements: currentState.achievements.map(a => a.id === id ? { ...a, unlocked: true } : a),
    };
  };

  const addXP = (amount: number) => {
    setState(prev => {
      const newXP = prev.xp + amount;
      let updated = { ...prev, xp: newXP, level: calcLevel(newXP) };
      if (calcLevel(newXP) >= 5) updated = unlockAchievement("completionist", updated);
      return updated;
    });
  };

  const unlockStep = (tech: string, step: number) => {
    setState(prev => {
      const current = prev.stepsUnlocked[tech] || 0;
      if (step <= current) return prev;
      const newXP = prev.xp + 20;
      let updated: GameState = {
        ...prev,
        xp: newXP,
        level: calcLevel(newXP),
        stepsUnlocked: { ...prev.stepsUnlocked, [tech]: step },
      };
      if (current === 0) updated = unlockAchievement("first_step", updated);
      if (step >= 5) {
        if (tech === "pyro") updated = unlockAchievement("pyro_master", updated);
        if (tech === "hydro") updated = unlockAchievement("hydro_master", updated);
        if (tech === "bio") updated = unlockAchievement("bio_master", updated);
      }
      if (calcLevel(newXP) >= 5) updated = unlockAchievement("completionist", updated);
      return updated;
    });
  };

  const getUnlockedSteps = (tech: string) => state.stepsUnlocked[tech] || 0;

  const completeQuiz = (tech: string) => {
    setState(prev => {
      if (prev.quizzesCompleted.includes(tech)) return prev;
      const newXP = prev.xp + 50;
      const newCompleted = [...prev.quizzesCompleted, tech];
      let updated: GameState = {
        ...prev,
        xp: newXP,
        level: calcLevel(newXP),
        quizzesCompleted: newCompleted,
      };
      updated = unlockAchievement("quiz_ace", updated);
      if (newCompleted.length >= 3) updated = unlockAchievement("all_quizzes", updated);
      if (calcLevel(newXP) >= 5) updated = unlockAchievement("completionist", updated);
      return updated;
    });
  };

  const isQuizCompleted = (tech: string) => state.quizzesCompleted.includes(tech);

  const watchVideo = (tech: string) => {
    setState(prev => {
      if (prev.videosWatched.includes(tech)) return prev;
      const newXP = prev.xp + 15;
      let updated: GameState = {
        ...prev,
        xp: newXP,
        level: calcLevel(newXP),
        videosWatched: [...prev.videosWatched, tech],
      };
      updated = unlockAchievement("video_watcher", updated);
      if (calcLevel(newXP) >= 5) updated = unlockAchievement("completionist", updated);
      return updated;
    });
  };

  const currentLevelStart = (state.level - 1) * 100;
  const xpInCurrentLevel = state.xp - currentLevelStart;
  const xpToNext = state.level * 100;

  return (
    <GameContext.Provider value={{
      state, addXP, unlockStep, getUnlockedSteps, completeQuiz, isQuizCompleted,
      watchVideo, xpToNext, xpInCurrentLevel, newAchievement,
      dismissAchievement: () => setNewAchievement(null),
    }}>
      {children}
    </GameContext.Provider>
  );
};
