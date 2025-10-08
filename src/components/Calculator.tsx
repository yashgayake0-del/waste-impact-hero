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
  co2Saved: number; // kg of CO2 saved by recycling (base value)
  landfillReduced: number; // kg of waste diverted (base value)
  energySaved: number; // kWh saved (base value)
  sizeOptions?: number[]; // Available sizes in inches
  sizeMultiplier?: (size: number) => number; // Function to calculate multiplier based on size
}

export interface SelectedItem {
  quantity: number;
  size?: number; // Selected size in inches
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
    co2Saved: 80,
    landfillReduced: 4,
    energySaved: 120,
    sizeOptions: [21, 24, 27, 32, 34, 49],
    sizeMultiplier: (size: number) => {
      // Base is 24 inches
      return size / 24;
    },
  },
  {
    id: "tv",
    name: "Television",
    icon: Tv,
    co2Saved: 150,
    landfillReduced: 8,
    energySaved: 250,
    sizeOptions: [32, 40, 43, 50, 55, 65, 75, 85],
    sizeMultiplier: (size: number) => {
      // Base is 43 inches
      return size / 43;
    },
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
  const [selectedItems, setSelectedItems] = useState<Map<string, SelectedItem>>(new Map());
  const [showResults, setShowResults] = useState(false);

  const handleItemSelect = (itemId: string, quantity: number, size?: number) => {
    const newSelected = new Map(selectedItems);
    if (quantity > 0) {
      newSelected.set(itemId, { quantity, size });
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const calculateTotalImpact = () => {
    let totalCO2 = 0;
    let totalLandfill = 0;
    let totalEnergy = 0;

    selectedItems.forEach((selectedItem, itemId) => {
      const item = electronicItems.find((i) => i.id === itemId);
      if (item) {
        let multiplier = 1;
        
        // Apply size multiplier if item has size options and a size is selected
        if (item.sizeOptions && item.sizeMultiplier && selectedItem.size) {
          multiplier = item.sizeMultiplier(selectedItem.size);
        }
        
        totalCO2 += item.co2Saved * selectedItem.quantity * multiplier;
        totalLandfill += item.landfillReduced * selectedItem.quantity * multiplier;
        totalEnergy += item.energySaved * selectedItem.quantity * multiplier;
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
            {electronicItems.map((item) => {
              const selectedItem = selectedItems.get(item.id);
              return (
                <ItemSelector
                  key={item.id}
                  item={item}
                  quantity={selectedItem?.quantity || 0}
                  selectedSize={selectedItem?.size}
                  onQuantityChange={(quantity) => handleItemSelect(item.id, quantity, selectedItem?.size)}
                  onSizeChange={(size) => handleItemSelect(item.id, selectedItem?.quantity || 1, size)}
                />
              );
            })}
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
