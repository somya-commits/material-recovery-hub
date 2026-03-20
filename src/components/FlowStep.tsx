import { type ReactNode } from "react";
import { Lock, CheckCircle2 } from "lucide-react";

interface FlowStepProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  isLast?: boolean;
  stepIndex: number;
  unlocked: boolean;
  onUnlock: () => void;
}

const FlowStep = ({ icon, title, description, color, isLast, stepIndex, unlocked, onUnlock }: FlowStepProps) => (
  <div className="flex flex-col items-center">
    {unlocked ? (
      <div
        className="glass-card p-6 w-full max-w-md text-center transition-all duration-500 hover:scale-[1.02] relative"
        style={{
          borderColor: `hsl(var(--glow-${color}) / 0.3)`,
          animation: "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-bio flex items-center justify-center">
          <CheckCircle2 className="h-4 w-4 text-background" />
        </div>
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <span className="inline-block mt-3 text-xs font-mono text-primary/60">+20 XP</span>
      </div>
    ) : (
      <button
        onClick={onUnlock}
        className="glass-card p-6 w-full max-w-md text-center transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 cursor-pointer group active:scale-[0.97]"
        style={{ borderColor: "hsl(var(--border) / 0.3)" }}
      >
        <div className="text-3xl mb-3 opacity-30 group-hover:opacity-50 transition-opacity">
          <Lock className="h-8 w-8 mx-auto text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground/50">Click to unlock this step</p>
      </button>
    )}
    {!isLast && (
      <div className="flex flex-col items-center my-2">
        <div className={`h-10 w-0.5 ${unlocked ? "bg-gradient-to-b from-primary/50 to-primary/10" : "bg-border/30"}`} />
        <svg width="16" height="12" viewBox="0 0 16 12" className={unlocked ? "text-primary/50" : "text-border/30"}>
          <path d="M8 12L0 0h16z" fill="currentColor" />
        </svg>
      </div>
    )}
  </div>
);

export default FlowStep;
