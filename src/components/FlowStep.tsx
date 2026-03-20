import type { ReactNode } from "react";

interface FlowStepProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  isLast?: boolean;
}

const FlowStep = ({ icon, title, description, color, isLast }: FlowStepProps) => (
  <div className="flex flex-col items-center">
    <div
      className="glass-card p-6 w-full max-w-md text-center transition-all duration-300 hover:scale-[1.02]"
      style={{ borderColor: `hsl(var(--glow-${color}) / 0.3)` }}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
    {!isLast && (
      <div className="flex flex-col items-center my-2">
        <div className="h-10 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10" />
        <svg width="16" height="12" viewBox="0 0 16 12" className="text-primary/50">
          <path d="M8 12L0 0h16z" fill="currentColor" />
        </svg>
      </div>
    )}
  </div>
);

export default FlowStep;
