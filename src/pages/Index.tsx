import { Calculator } from "@/components/Calculator";
import { Recycle, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-ewaste.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Recycle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            E-Waste Carbon Impact Calculator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover the environmental impact of recycling your electronics. 
            See exactly how much CO₂ and landfill waste you can save.
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Leaf className="w-5 h-5" />
            <span className="font-semibold">Make a difference, one device at a time</span>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4">
        <Calculator />
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why Recycle E-Waste?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-background border-2 border-border hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">Reduce Pollution</h3>
              <p className="text-muted-foreground">
                Electronic waste contains toxic materials that can contaminate soil and water when improperly disposed.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border-2 border-border hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">Conserve Resources</h3>
              <p className="text-muted-foreground">
                Recycling recovers valuable materials like gold, silver, and copper, reducing the need for mining.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background border-2 border-border hover:border-primary/50 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3 text-primary">Save Energy</h3>
              <p className="text-muted-foreground">
                Manufacturing from recycled materials uses significantly less energy than creating from raw materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-muted-foreground">
        <p>Join the movement towards a sustainable future. Every device recycled makes a difference.</p>
      </footer>
    </div>
  );
};

export default Index;
