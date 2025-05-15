
import { useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
}

export function ProductList({ products, title = "All Products", showFilters = true }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterDiscount, setFilterDiscount] = useState(false);
  
  // Apply filters and sorting
  let filteredProducts = [...products];
  
  // Apply search
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Apply filters
  if (filterOrganic) {
    filteredProducts = filteredProducts.filter(product => product.isOrganic);
  }
  
  if (filterDiscount) {
    filteredProducts = filteredProducts.filter(product => product.discount > 0);
  }
  
  // Apply sorting
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "discount") {
    filteredProducts.sort((a, b) => b.discount - a.discount);
  }
  
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold mb-6 dark:text-white">{title}</h2>
      )}
      
      {showFilters && (
        <div className="mb-8 bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 dark:text-gray-300" />
              </div>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="discount">Best Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="filter-organic" 
                checked={filterOrganic}
                onCheckedChange={(checked) => setFilterOrganic(checked === true)}
              />
              <label 
                htmlFor="filter-organic" 
                className="text-sm font-medium leading-none cursor-pointer dark:text-gray-300"
              >
                Organic Only
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="filter-discount" 
                checked={filterDiscount}
                onCheckedChange={(checked) => setFilterDiscount(checked === true)}
              />
              <label 
                htmlFor="filter-discount" 
                className="text-sm font-medium leading-none cursor-pointer dark:text-gray-300"
              >
                On Sale
              </label>
            </div>
          </div>
        </div>
      )}
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No products found matching your criteria.</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery("");
            setFilterOrganic(false);
            setFilterDiscount(false);
            setSortBy("featured");
          }}
          className="dark:border-gray-600 dark:text-gray-300">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
