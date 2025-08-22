import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-warm-gray">
              <span>© 2024 Jayaram Uday Marali. Made with</span>
              <Heart className="h-4 w-4 text-emerald fill-emerald" />
              <span>using React & Tailwind</span>
            </div>

            {/* Links */}
            <div className="flex space-x-8">
              <a 
                href="#" 
                className="text-warm-gray hover:text-emerald transition-colors duration-300"
              >
                Privacy
              </a>
              <a 
                href="#" 
                className="text-warm-gray hover:text-emerald transition-colors duration-300"
              >
                Terms
              </a>
              <a 
                href="#" 
                className="text-warm-gray hover:text-emerald transition-colors duration-300"
              >
                RSS
              </a>
            </div>
          </div>
          
          {/* Back to top */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-emerald hover:text-emerald-dark transition-colors duration-300 font-medium"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;