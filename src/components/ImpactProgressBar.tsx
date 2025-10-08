import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Leaf, Target } from "lucide-react";
import { useEffect, useState } from "react";

interface ImpactProgressBarProps {
  co2Saved: number;
  landfillReduced: number;
  energySaved: number;
}

export const ImpactProgressBar = ({ co2Saved, landfillReduced, energySaved }: ImpactProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const [animatedCO2, setAnimatedCO2] = useState(0);

  // Goals for progress calculation
  const co2Goal = 500; // kg
  const co2Progress = Math.min((co2Saved / co2Goal) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(co2Progress);
    }, 300);
    return () => clearTimeout(timer);
  }, [co2Progress]);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = co2Saved / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= co2Saved) {
        setAnimatedCO2(co2Saved);
        clearInterval(timer);
      } else {
        setAnimatedCO2(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [co2Saved]);

  if (co2Saved === 0) return null;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 animate-in slide-in-from-top duration-700">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Your Impact Progress</h3>
              <p className="text-sm text-muted-foreground">Tracking towards sustainability goals</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-primary">{animatedCO2.toFixed(0)}</span>
              <span className="text-sm text-muted-foreground">/ {co2Goal} kg CO₂</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              {progress.toFixed(0)}% to goal
            </span>
            <span>{landfillReduced.toFixed(1)}kg waste saved</span>
            <span>{energySaved.toFixed(0)}kWh conserved</span>
          </div>
        </div>
      </div>
    </Card>
  );
};