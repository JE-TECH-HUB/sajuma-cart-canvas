
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductList } from "@/components/products/ProductList";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { featuredProducts } from "@/data/products";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const ProductsPage = () => {
  const location = useLocation();
  const [title, setTitle] = useState("All Products");
  const [products, setProducts] = useState(featuredProducts);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOrganic, setShowOrganic] = useState(false);
  
  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category) {
      setSelectedCategories([category]);
      const filteredProducts = featuredProducts.filter(p => p.category === category);
      setProducts(filteredProducts);
      
      // Set title based on category
      const categoryTitles: Record<string, string> = {
        fruits: "Fruits & Vegetables",
        dairy: "Dairy & Eggs",
        bakery: "Bakery",
        meat: "Meat & Seafood",
        pantry: "Pantry Staples",
        beverages: "Beverages",
        frozen: "Frozen Foods",
        snacks: "Snacks & Candy",
        household: "Household",
        clothing: "Clothing & Textiles",
        beauty: "Beauty & Personal Care",
        electronics: "Electronics & Gadgets"
      };
      
      setTitle(categoryTitles[category] || "Products");
    } else {
      setProducts(featuredProducts);
      setTitle("All Products");
      setSelectedCategories([]);
    }
  }, [location.search]);

  // Filter products based on selected filters
  const filterProducts = () => {
    let filtered = [...featuredProducts];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Filter by price range
    const minPrice = priceRange[0] * 100; // Convert slider value to actual price
    const maxPrice = priceRange[1] * 100;
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    
    // Filter organic products
    if (showOrganic) {
      filtered = filtered.filter(product => product.isOrganic);
    }
    
    setProducts(filtered);
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Apply filters when they change
  useEffect(() => {
    filterProducts();
  }, [selectedCategories, priceRange, showOrganic]);
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-2">Browse our selection of quality products</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="categories">
                  <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["fruits", "dairy", "bakery", "meat", "pantry", "beverages", "clothing", "electronics"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label htmlFor={`category-${category}`} className="capitalize">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 pb-2">
                      <Slider 
                        defaultValue={[0, 100]} 
                        max={100} 
                        step={1}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value)}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>₦{priceRange[0] * 100}</span>
                        <span>₦{priceRange[1] * 100}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="options">
                  <AccordionTrigger className="py-2">Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="option-organic" 
                          checked={showOrganic}
                          onCheckedChange={() => setShowOrganic(!showOrganic)}
                        />
                        <Label htmlFor="option-organic">
                          Organic Only
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <ProductList products={products} title="" />
            
            {products.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-gray-600 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
