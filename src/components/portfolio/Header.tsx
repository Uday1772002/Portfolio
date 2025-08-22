import { Button } from "@/components/ui/button";
import { useScrollNavigation } from "@/hooks/use-scroll-navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const { scrollToSection } = useScrollNavigation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-emerald"></div>
          <span className="text-xl font-bold text-foreground">
            Jayaram Uday
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection("about")}
            className="text-foreground hover:text-emerald transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-foreground hover:text-emerald transition-colors"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-foreground hover:text-emerald transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-foreground hover:text-emerald transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Theme Toggle & CTA */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={toggleTheme}
            className="p-2"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* CTA Button */}
          <Button
            size="sm"
            className="bg-emerald hover:bg-emerald-dark text-white"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
