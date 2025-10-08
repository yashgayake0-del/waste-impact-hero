import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Trash2, Zap, TreePine } from "lucide-react";
import { useEffect, useState } from "react";

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
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Trash2,
      title: "Landfill Waste Reduced",
      value: landfillReduced.toFixed(2),
      unit: "kg",
      description: "Electronic waste diverted from landfills",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Zap,
      title: "Energy Conserved",
      value: energySaved.toFixed(0),
      unit: "kWh",
      description: "Equivalent to powering a home for days",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <Card className="border-2 border-primary shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <TreePine className="w-8 h-8 text-primary" />
            Your Environmental Impact
          </CardTitle>
          <CardDescription className="text-base">
            By recycling instead of discarding, here's the positive impact you'll make
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactMetrics.map((metric, index) => (
              <div
                key={metric.title}
                className={`transform transition-all duration-500 ${
                  animated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`inline-flex p-4 rounded-full ${metric.bgColor}`}>
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                    <h3 className="font-semibold text-lg">{metric.title}</h3>
                    <div className="space-y-1">
                      <p className="text-4xl font-bold text-primary">
                        {metric.value}
                        <span className="text-2xl ml-1">{metric.unit}</span>
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary-light/10 border-2 border-primary/20">
            <div className="text-center space-y-2">
              <h4 className="text-xl font-semibold">Real-World Comparison</h4>
              <p className="text-muted-foreground">
                Your recycling effort equals taking <strong className="text-primary">{carsOffRoad} cars</strong> off
                the road for a year, or planting <strong className="text-primary">{treesEquivalent} trees</strong>!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
