
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductList } from "@/components/products/ProductList";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { featuredProducts } from "@/data/products";

const ProductsPage = () => {
  const location = useLocation();
  const [title, setTitle] = useState("All Products");
  const [products, setProducts] = useState(featuredProducts);
  
  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      const filteredProducts = featuredProducts.filter(p => p.category === category);
      setProducts(filteredProducts);
      
      // Set title based on category
      const categoryTitles: Record<string, string> = {
        fruits: "Fruits & Vegetables",
        dairy: "Dairy & Eggs",
        bakery: "Bakery",
        meat: "Meat & Seafood",
        pantry: "Pantry Staples",
        beverages: "Beverages"
      };
      
      setTitle(categoryTitles[category] || "Products");
    } else {
      setProducts(featuredProducts);
      setTitle("All Products");
    }
  }, [location.search]);
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-2">Browse our selection of quality products</p>
        </div>
        
        <ProductList products={products} title="" />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
