
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { featuredProducts } from "@/data/products";
import { Product } from "@/types";
import { ProductImage } from "@/components/products/ProductImage";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductActions } from "@/components/products/ProductActions";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ProductBreadcrumbs } from "@/components/products/ProductBreadcrumbs";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Find product by ID
    const foundProduct = featuredProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category but not the same product)
      const related = featuredProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
    }
  }, [productId]);
  
  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Product Not Found</h1>
          <p className="mb-6 dark:text-gray-300">The product you're looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumbs product={product} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div>
            <ProductImage image={product.image} name={product.name} />
          </div>
          
          {/* Product Details */}
          <div>
            <ProductDetails product={product} />
            <ProductActions product={product} />
          </div>
        </div>
        
        <RelatedProducts products={relatedProducts} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
