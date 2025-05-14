
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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

          {/* Search, Cart, Auth and Mobile Menu Toggle */}
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

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <UserCircle className="h-6 w-6" />
                    {user?.role === "admin" && (
                      <Badge className="absolute -top-2 -right-2 bg-sajuma-dark text-white text-xs">
                        Admin
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">Welcome, {user?.name || "User"}!</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="bg-sajuma hover:bg-sajuma-dark" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

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
              {!isAuthenticated && (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-sajuma font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-gray-700 hover:text-sajuma font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-sajuma font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
