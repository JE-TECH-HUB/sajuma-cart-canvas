
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Organic Avocado",
    description: "Fresh organic avocados from local farms",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=2676",
    category: "fruits",
    inStock: true,
    isOrganic: true,
    discount: 0
  },
  {
    id: "2",
    name: "Fresh Milk",
    description: "Grade A fresh whole milk (1 gallon)",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=2574",
    category: "dairy",
    inStock: true,
    isOrganic: false,
    discount: 0
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    description: "Freshly baked whole wheat bread",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=2670",
    category: "bakery",
    inStock: true,
    isOrganic: false,
    discount: 0
  },
  {
    id: "4",
    name: "Organic Chicken",
    description: "Organic free-range chicken (per lb)",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1610515451813-5b9164165c49?q=80&w=2670",
    category: "meat",
    inStock: true,
    isOrganic: true,
    discount: 10
  },
  {
    id: "5",
    name: "Organic Strawberries",
    description: "Sweet and juicy organic strawberries",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=2574",
    category: "fruits",
    inStock: true,
    isOrganic: true,
    discount: 15
  },
  {
    id: "6",
    name: "Pasta Sauce",
    description: "Authentic Italian tomato pasta sauce",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1595033861445-197b4d8ef9ff?q=80&w=2670",
    category: "pantry",
    inStock: true,
    isOrganic: false,
    discount: 5
  },
  {
    id: "7",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice (1L)",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=2574",
    category: "beverages",
    inStock: true,
    isOrganic: true,
    discount: 0
  },
  {
    id: "8",
    name: "Assorted Bell Peppers",
    description: "Colorful bell peppers (pack of 3)",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=2574",
    category: "fruits",
    inStock: true,
    isOrganic: false,
    discount: 0
  }
];

export function FeaturedProducts() {
  const { addToCart } = useCart();
  
  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      quantity: 1
    });
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <p className="mt-2 text-gray-600">Check out our most popular products</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/products">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col h-full animate-slide-up">
              <Link to={`/products/${product.id}`} className="relative block">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                {product.discount > 0 && (
                  <Badge className="absolute top-2 right-2 bg-sajuma-accent">
                    {product.discount}% OFF
                  </Badge>
                )}
                {product.isOrganic && (
                  <Badge className="absolute top-2 left-2 bg-green-600">
                    Organic
                  </Badge>
                )}
              </Link>
              
              <div className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-sajuma transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    {product.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sajuma-dark">
                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                        <span className="text-gray-500 text-sm line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sajuma-dark">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Button 
                    size="sm"
                    className="bg-sajuma hover:bg-sajuma-dark"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
