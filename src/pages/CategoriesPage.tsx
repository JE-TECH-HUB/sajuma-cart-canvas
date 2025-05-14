
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type Category = {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
};

const categories: Category[] = [
  {
    id: "fruits",
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670",
    description: "Fresh fruits and vegetables sourced from local Nigerian farms.",
    productCount: 86
  },
  {
    id: "dairy",
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=2671",
    description: "Quality dairy products and fresh eggs from trusted Nigerian producers.",
    productCount: 38
  },
  {
    id: "bakery",
    name: "Bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2574",
    description: "Freshly baked bread, pastries, and local Nigerian baked goods.",
    productCount: 45
  },
  {
    id: "meat",
    name: "Meat & Seafood",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2670",
    description: "Premium cuts of meat and fresh seafood from Nigerian waters.",
    productCount: 52
  },
  {
    id: "pantry",
    name: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1584473457493-83e80cd4c943?q=80&w=2574",
    description: "Essential Nigerian kitchen items from spices to canned goods.",
    productCount: 93
  },
  {
    id: "beverages",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=2670",
    description: "Refreshing drinks, local juices, palm wine, and other Nigerian favorites.",
    productCount: 64
  },
  {
    id: "frozen",
    name: "Frozen Foods",
    image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=2574",
    description: "Convenient frozen meals, vegetables, and traditional Nigerian dishes.",
    productCount: 41
  },
  {
    id: "snacks",
    name: "Snacks & Candy",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=2670",
    description: "Sweet and savory snacks including Nigerian favorites like chin chin and puff puff.",
    productCount: 78
  },
  {
    id: "household",
    name: "Household",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2670",
    description: "Cleaning supplies, paper products, and other household essentials.",
    productCount: 56
  },
  {
    id: "clothing",
    name: "Clothing & Textiles",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670",
    description: "Traditional Nigerian attire, Ankara fabrics, and modern fashion.",
    productCount: 74
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1571781418606-d638235dfcc4?q=80&w=2670",
    description: "Beauty products, skincare, and personal care items with local ingredients.",
    productCount: 62
  },
  {
    id: "electronics",
    name: "Electronics & Gadgets",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2670",
    description: "Latest electronics, phones, and gadgets at competitive prices.",
    productCount: 48
  }
];

const CategoriesPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Categories</h1>
          <p className="text-gray-600 mt-2">Browse our wide selection of departments</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`/products?category=${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02] shadow-sm hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <span className="text-sm text-sajuma font-medium">{category.productCount} items</span>
                  </div>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
