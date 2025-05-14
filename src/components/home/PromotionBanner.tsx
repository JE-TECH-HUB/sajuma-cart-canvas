
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function PromotionBanner() {
  return (
    <section className="bg-sajuma text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Download the Sajuma App
            </h2>
            <p className="text-gray-100">
              Get exclusive deals, track orders, and shop on the go!
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-white text-sajuma-dark hover:bg-gray-100">
              <Link to="#">
                <div className="flex items-center">
                  <div className="mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.0001 2H7.00006C4.23863 2 2.00006 4.23858 2.00006 7V17C2.00006 19.7614 4.23863 22 7.00006 22H17.0001C19.7615 22 22.0001 19.7614 22.0001 17V7C22.0001 4.23858 19.7615 2 17.0001 2Z" stroke="currentColor" strokeWidth="2" />
                      <path d="M15 17.27V6.73C15 5.55 13.72 4.75 12.66 5.33L8.22 7.87C7.24 8.42 7.24 9.85 8.22 10.4L12.66 12.94C13.72 13.52 15 12.72 15 11.54" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Link>
            </Button>
            
            <Button asChild className="bg-white text-sajuma-dark hover:bg-gray-100">
              <Link to="#">
                <div className="flex items-center">
                  <div className="mr-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.67554 2.37516C3.36869 2.68195 3.16663 3.14957 3.16663 3.75544V20.2441C3.16663 20.85 3.36875 21.3178 3.67554 21.6244L3.77146 21.7204L13.0429 12.4999V12.3997L3.77146 3.17938L3.67554 2.37516Z" fill="currentColor" />
                      <path d="M16.0002 15.5L13.043 12.5L16.0002 9.5L19.9145 11.7426C20.7137 12.2061 20.7137 12.9939 19.9145 13.4574L16.0002 15.5Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
