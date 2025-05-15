
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
    price: 1200,
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
    price: 1500,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=2574",
    category: "dairy",
    inStock: true,
    isOrganic: false,
    discount: 0
  },
  {
    id: "3",
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 5000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080",
    category: "clothing",
    inStock: true,
    isOrganic: false,
    discount: 15
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet",
    price: 7500,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2574",
    category: "accessories",
    inStock: true,
    isOrganic: false,
    discount: 0
  },
  {
    id: "5",
    name: "Organic Strawberries",
    description: "Sweet and juicy organic strawberries",
    price: 1800,
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=2574",
    category: "fruits",
    inStock: true,
    isOrganic: true,
    discount: 10
  },
  {
    id: "6",
    name: "Smart Watch",
    description: "Water resistant smart watch with health tracking",
    price: 25000,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2672",
    category: "electronics",
    inStock: true,
    isOrganic: false,
    discount: 5
  },
  {
    id: "7",
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned soles",
    price: 18000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670",
    category: "footwear",
    inStock: true,
    isOrganic: false,
    discount: 0
  },
  {
    id: "8",
    name: "Wireless Headphones",
    description: "Noise cancelling wireless headphones",
    price: 15000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670",
    category: "electronics",
    inStock: true,
    isOrganic: false,
    discount: 20
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
  
  // Format price in Naira
  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString('en-NG')}`;
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Featured Products</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Check out our most popular products</p>
          </div>
          <Button asChild variant="outline" className="dark:border-gray-600 dark:text-gray-300">
            <Link to="/products">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col h-full animate-slide-up dark:bg-gray-800 dark:border-gray-700">
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
                    <h3 className="font-semibold text-gray-800 hover:text-sajuma transition-colors dark:text-white dark:hover:text-sajuma-accent">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2 dark:text-gray-400">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    {product.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sajuma-dark dark:text-white">
                          {formatPrice(product.price * (1 - product.discount / 100))}
                        </span>
                        <span className="text-gray-500 text-sm line-through dark:text-gray-400">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sajuma-dark dark:text-white">
                        {formatPrice(product.price)}
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
