
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
    id: "bakery",
    name: "Bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2574",
    description: "Freshly baked bread and pastries"
  },
  {
    id: "meat",
    name: "Meat & Seafood",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2670",
    description: "Fresh meat and seafood options"
  },
  {
    id: "pantry",
    name: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1584473457493-83e80cd4c943?q=80&w=2574",
    description: "Essential items for your pantry"
  },
  {
    id: "beverages",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=2670",
    description: "Refreshing drinks and beverages"
  }
];

export function CategoryGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          <p className="mt-2 text-gray-600">Explore our wide range of products</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`/categories/${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02]">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
