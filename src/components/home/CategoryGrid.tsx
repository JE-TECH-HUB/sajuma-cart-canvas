
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

type Category = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const categories: Category[] = [
  {
    id: "fruits",
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670",
    description: "Farm-fresh fruits and vegetables"
  },
  {
    id: "dairy",
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=2671",
    description: "Quality dairy products and eggs"
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2670",
    description: "Stylish and comfortable clothing"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?q=80&w=2670",
    description: "Fashion accessories and jewelry"
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2601",
    description: "Latest gadgets and electronics"
  },
  {
    id: "footwear",
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2625",
    description: "Comfortable and stylish footwear"
  }
];

export function CategoryGrid() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Shop by Category</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Explore our wide range of products</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`/categories/${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02] dark:bg-gray-800 dark:border-gray-700">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
