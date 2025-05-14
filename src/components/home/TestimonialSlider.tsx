
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  avatar: string;
  role: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=32",
    role: "Regular Customer",
    content: "Sajuma Market has completely changed my grocery shopping experience. Their produce is always fresh and their prices are reasonable. The delivery is always on time and the staff is friendly and helpful."
  },
  {
    id: 2,
    name: "Michael Thompson",
    avatar: "https://i.pravatar.cc/150?img=53",
    role: "Weekly Shopper",
    content: "I've been shopping at Sajuma for over a year now and I'm consistently impressed with their quality and service. Their organic selection is better than any other market in town!"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Food Blogger",
    content: "As someone who cooks professionally, I'm very particular about my ingredients. Sajuma's selection of fresh produce and specialty items is unmatched. I recommend them to all my followers!"
  },
  {
    id: 4,
    name: "David Chen",
    avatar: "https://i.pravatar.cc/150?img=60",
    role: "Family Shopper",
    content: "With four kids, grocery shopping can be a challenge. Sajuma's online ordering and delivery service saves me so much time, and their family meal bundles are a lifesaver on busy weeknights."
  }
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 1;
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + testimonialsPerPage >= testimonials.length ? 0 : prevIndex + testimonialsPerPage
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - testimonialsPerPage < 0 ? testimonials.length - testimonialsPerPage : prevIndex - testimonialsPerPage
    );
  };
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">What Our Customers Say</h2>
          <p className="mt-2 text-gray-600">Read testimonials from our happy customers</p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <Card className="border border-gray-200">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                          <p className="text-sm text-sajuma">{testimonial.role}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
                        </div>
                        <div className="mt-4 flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className="w-5 h-5 text-yellow-400 fill-current" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-md hover:bg-gray-100"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-md hover:bg-gray-100"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${
                Math.floor(currentIndex / testimonialsPerPage) === Math.floor(index / testimonialsPerPage)
                  ? "bg-sajuma"
                  : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
