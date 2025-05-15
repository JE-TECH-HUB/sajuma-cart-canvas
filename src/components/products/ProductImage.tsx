
interface ProductImageProps {
  image: string;
  name: string;
}

export function ProductImage({ image, name }: ProductImageProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
