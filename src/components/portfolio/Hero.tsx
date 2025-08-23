import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Github, Linkedin } from "lucide-react";

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-cream to-background relative overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-emerald/5 to-transparent rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-emerald/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-large mx-auto animate-float">
                <img
                  src="/profile-pic.png"
                  alt="Jayaram Uday Marali"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-large mx-auto animate-float bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center">
                <span className="text-4xl md:text-6xl font-bold text-white">
                  J
                </span>
              </div> */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald/20 to-transparent"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              JAYARAM UDAY
              <span className="block text-emerald bg-gradient-to-r from-emerald to-emerald-light bg-clip-text">
                MARALI
              </span>
            </h1>

            <p className="text-lg md:text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed">
              Software Engineer & GCP Certified Associate Cloud Engineer with
              expertise in full-stack development, cloud infrastructure, and
              scalable applications.
            </p>

            {/* Contact Info */}
            <div className="text-sm text-warm-gray space-y-1">
              <p>+91 6302595694 | jayaramuday17@gmail.com</p>
              <p>GCP Certified: Associate Cloud Engineer</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                size="lg"
                className="bg-emerald hover:bg-emerald-dark text-white px-8 py-6 text-lg shadow-medium hover:shadow-large transition-all duration-300 transform hover:scale-105"
                onClick={scrollToProjects}
              >
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald text-emerald hover:bg-emerald hover:text-white p-6 transition-all duration-300"
                  onClick={() =>
                    window.open("mailto:jayaramuday17@gmail.com", "_blank")
                  }
                >
                  <Mail className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald text-emerald hover:bg-emerald hover:text-white p-6 transition-all duration-300"
                  onClick={() =>
                    window.open("https://github.com/Uday1772002", "_blank")
                  }
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald text-emerald hover:bg-emerald hover:text-white p-6 transition-all duration-300"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/jayaramuday-marali/",
                      "_blank"
                    )
                  }
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator removed - was overlapping on mobile */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-emerald" />
      </div> */}
    </section>
  );
};

export default Hero;
