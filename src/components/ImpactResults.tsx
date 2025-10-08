import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Trash2, Zap, TreePine, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import ecoMascot from "@/assets/eco-mascot.png";

interface ImpactResultsProps {
  co2Saved: number;
  landfillReduced: number;
  energySaved: number;
}

export const ImpactResults = ({ co2Saved, landfillReduced, energySaved }: ImpactResultsProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [co2Saved, landfillReduced, energySaved]);

  const treesEquivalent = (co2Saved / 21).toFixed(1); // Average tree absorbs ~21kg CO2/year
  const carsOffRoad = (co2Saved / 4600).toFixed(2); // Average car emits ~4.6 tons CO2/year

  const impactMetrics = [
    {
      icon: Leaf,
      title: "CO₂ Emissions Saved",
      value: co2Saved.toFixed(1),
      unit: "kg",
      description: `Equivalent to ${treesEquivalent} trees for one year`,
      tooltip: "Recycling prevents CO₂ emissions from manufacturing new products",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    {
      icon: Trash2,
      title: "Landfill Waste Reduced",
      value: landfillReduced.toFixed(2),
      unit: "kg",
      description: "Electronic waste diverted from landfills",
      tooltip: "E-waste contains toxic materials that contaminate soil and water",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      icon: Zap,
      title: "Energy Conserved",
      value: energySaved.toFixed(0),
      unit: "kWh",
      description: "Equivalent to powering a home for days",
      tooltip: "Recycling uses significantly less energy than creating from raw materials",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
      <Card className="border-2 border-primary shadow-lg relative overflow-hidden">
        <div className="absolute top-4 right-4 animate-in zoom-in duration-1000 delay-300">
          <img src={ecoMascot} alt="Eco Mascot" className="w-20 h-20 drop-shadow-lg" />
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-3">
            <TreePine className="w-8 h-8 text-primary animate-pulse" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Environmental Impact
            </span>
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
          </CardTitle>
          <CardDescription className="text-base">
            By recycling instead of discarding, here's the positive impact you'll make
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactMetrics.map((metric, index) => (
              <Tooltip key={metric.title}>
                <TooltipTrigger asChild>
                  <div
                    className={`transform transition-all duration-700 hover:scale-105 ${
                      animated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <Card className={`h-full hover:shadow-xl transition-all duration-300 border-2 ${metric.borderColor} group`}>
                      <CardContent className="p-6 text-center space-y-4">
                        <div className={`inline-flex p-4 rounded-full ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <metric.icon className={`w-8 h-8 ${metric.color}`} />
                        </div>
                        <h3 className="font-semibold text-lg">{metric.title}</h3>
                        <div className="space-y-2">
                          <p className={`text-5xl font-extrabold ${metric.color} drop-shadow-sm`}>
                            {metric.value}
                          </p>
                          <span className="text-lg font-medium text-muted-foreground">{metric.unit}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p>{metric.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="mt-8 p-8 rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-2 border-primary/30 animate-in fade-in duration-1000 delay-500">
            <div className="text-center space-y-4">
              <h4 className="text-2xl font-bold flex items-center justify-center gap-2">
                <TreePine className="w-6 h-6 text-primary" />
                Real-World Comparison
              </h4>
              <p className="text-lg text-foreground leading-relaxed">
                Your recycling effort equals taking <strong className="text-emerald-600 dark:text-emerald-400 text-2xl">{carsOffRoad} cars</strong> off
                the road for a year, or planting <strong className="text-emerald-600 dark:text-emerald-400 text-2xl">{treesEquivalent} trees</strong>!
              </p>
              <Button 
                size="lg" 
                className="mt-4 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Share Your Impact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
