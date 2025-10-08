import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import type { ElectronicItem } from "./Calculator";

interface ItemSelectorProps {
  item: ElectronicItem;
  quantity: number;
  selectedSize?: number;
  onQuantityChange: (quantity: number) => void;
  onSizeChange?: (size: number) => void;
}

export const ItemSelector = ({ item, quantity, selectedSize, onQuantityChange, onSizeChange }: ItemSelectorProps) => {
  const Icon = item.icon;
  const isSelected = quantity > 0;
  const hasSize = item.sizeOptions && item.sizeOptions.length > 0;

  return (
    <Card
      className={`transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-primary border-2 shadow-md bg-primary/5"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-3">
          <div
            className={`p-3 rounded-full transition-all duration-300 ${
              isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <Icon className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-center">{item.name}</h3>
          
          {hasSize && isSelected && (
            <div className="w-full">
              <Select
                value={selectedSize?.toString() || ""}
                onValueChange={(value) => onSizeChange?.(parseInt(value))}
              >
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {item.sizeOptions!.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}" inches
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {isSelected ? (
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-bold min-w-[2rem] text-center">{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onQuantityChange(quantity + 1)}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onQuantityChange(1)}
              className="w-full"
            >
              Add Item
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
