import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemSelector } from "@/components/ItemSelector";
import { ImpactResults } from "@/components/ImpactResults";
import { Smartphone, Laptop, Tablet, Monitor, Tv, Headphones } from "lucide-react";

export interface ElectronicItem {
  id: string;
  name: string;
  icon: typeof Smartphone;
  co2Saved: number; // kg of CO2 saved by recycling
  landfillReduced: number; // kg of waste diverted
  energySaved: number; // kWh saved
}

export const electronicItems: ElectronicItem[] = [
  {
    id: "smartphone",
    name: "Smartphone",
    icon: Smartphone,
    co2Saved: 35,
    landfillReduced: 0.15,
    energySaved: 45,
  },
  {
    id: "laptop",
    name: "Laptop",
    icon: Laptop,
    co2Saved: 180,
    landfillReduced: 2.5,
    energySaved: 320,
  },
  {
    id: "tablet",
    name: "Tablet",
    icon: Tablet,
    co2Saved: 65,
    landfillReduced: 0.6,
    energySaved: 95,
  },
  {
    id: "monitor",
    name: "Monitor",
    icon: Monitor,
    co2Saved: 120,
    landfillReduced: 5.5,
    energySaved: 180,
  },
  {
    id: "tv",
    name: "Television",
    icon: Tv,
    co2Saved: 250,
    landfillReduced: 12,
    energySaved: 400,
  },
  {
    id: "headphones",
    name: "Headphones",
    icon: Headphones,
    co2Saved: 8,
    landfillReduced: 0.08,
    energySaved: 15,
  },
];

export const Calculator = () => {
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());
  const [showResults, setShowResults] = useState(false);

  const handleItemSelect = (itemId: string, quantity: number) => {
    const newSelected = new Map(selectedItems);
    if (quantity > 0) {
      newSelected.set(itemId, quantity);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const calculateTotalImpact = () => {
    let totalCO2 = 0;
    let totalLandfill = 0;
    let totalEnergy = 0;

    selectedItems.forEach((quantity, itemId) => {
      const item = electronicItems.find((i) => i.id === itemId);
      if (item) {
        totalCO2 += item.co2Saved * quantity;
        totalLandfill += item.landfillReduced * quantity;
        totalEnergy += item.energySaved * quantity;
      }
    });

    return { totalCO2, totalLandfill, totalEnergy };
  };

  const handleCalculate = () => {
    if (selectedItems.size > 0) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedItems(new Map());
    setShowResults(false);
  };

  const impact = calculateTotalImpact();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Card className="border-2 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-3xl">Select Your E-Waste Items</CardTitle>
          <CardDescription className="text-base">
            Choose electronic devices you want to recycle and see their environmental impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {electronicItems.map((item) => (
              <ItemSelector
                key={item.id}
                item={item}
                quantity={selectedItems.get(item.id) || 0}
                onQuantityChange={(quantity) => handleItemSelect(item.id, quantity)}
              />
            ))}
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button 
              variant="eco" 
              size="lg" 
              onClick={handleCalculate}
              disabled={selectedItems.size === 0}
              className="min-w-[160px]"
            >
              Calculate Impact
            </Button>
            {selectedItems.size > 0 && (
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleReset}
                className="min-w-[160px]"
              >
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <ImpactResults
          co2Saved={impact.totalCO2}
          landfillReduced={impact.totalLandfill}
          energySaved={impact.totalEnergy}
        />
      )}
    </div>
  );
};
