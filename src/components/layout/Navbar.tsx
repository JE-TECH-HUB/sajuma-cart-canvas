
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItemsCount } = useCart();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-sajuma">Sajuma</span>
            <span className="ml-1 text-sajuma-accent font-semibold">Market</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-sajuma font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-sajuma font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-sajuma font-medium">
              Categories
            </Link>
            <Link to="/offers" className="text-gray-700 hover:text-sajuma font-medium">
              Special Offers
            </Link>
          </nav>

          {/* Search, Cart, and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-64 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-sajuma-accent text-white">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-sajuma font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-sajuma font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-700 hover:text-sajuma font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/offers" 
                className="text-gray-700 hover:text-sajuma font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Special Offers
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
