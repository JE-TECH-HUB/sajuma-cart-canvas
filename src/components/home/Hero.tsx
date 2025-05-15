
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative bg-sajuma-dark text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574')] bg-cover bg-center opacity-20" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 bg-sajuma-accent text-white text-sm font-semibold rounded-full mb-4 animate-fade-in">
            Fresh Deals Every Day
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Quality Products Delivered to Your Door
          </h1>
          <p className="text-lg text-gray-200 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Sajuma brings you quality products from local providers and global brands. Shop fresh, eat healthy, dress well, and save time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button asChild className="bg-sajuma-accent hover:bg-sajuma text-white font-semibold">
              <Link to="/products">
                Shop Now
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-sajuma-dark">
              <Link to="/item/1">
                View Featured Item
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
