import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { usePortfolioViewModel } from "@/viewmodels/usePortfolioViewModel";

const Projects = () => {
  console.log("🔍 Projects Component: Component rendered");
  const { useFeaturedProjects } = usePortfolioViewModel();
  const { data: projects, isLoading, error } = useFeaturedProjects();

  console.log("🔍 Projects Component: Hook result:", {
    projects,
    isLoading,
    error,
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-warm-gray max-w-2xl mx-auto">
                A showcase of my recent work and innovative solutions
              </p>
            </div>
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-emerald" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-warm-gray max-w-2xl mx-auto">
                A showcase of my recent work and innovative solutions
              </p>
            </div>
            <div className="text-center py-20">
              <p className="text-warm-gray mb-4">
                Failed to load projects. Please try again later.
              </p>
              <p className="text-sm text-red-500">Error: {error.message}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
                variant="outline"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              A showcase of my recent work and innovative solutions
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects?.map((project) => (
              <Card
                key={project._id}
                className="overflow-hidden border-border hover:shadow-large transition-all duration-300 group"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Project Content */}
                <div className="p-4 md:p-6 space-y-4">
                  {/* Mobile: Compact View - Project Name and Action Buttons */}
                  <div className="md:hidden">
                    {/* Project Name Section */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-emerald transition-colors duration-300 mb-3">
                        {project.title}
                      </h3>
                    </div>

                    {/* Action Buttons - Full Width */}
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-emerald text-emerald hover:bg-emerald hover:text-white transition-all duration-300 h-12 text-base font-medium"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-emerald text-emerald hover:bg-emerald hover:text-white transition-all duration-300 h-12 text-base font-medium"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="h-5 w-5 mr-2" />
                        View Code
                      </Button>
                    </div>
                  </div>

                  {/* Desktop: Full Detailed View */}
                  <div className="hidden md:block">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-emerald transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-warm-gray leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="bg-emerald/10 text-emerald border-emerald/20 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald text-emerald hover:bg-emerald hover:text-white transition-all duration-300 flex-1"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald text-emerald hover:bg-emerald hover:text-white transition-all duration-300 flex-1"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="h-5 w-5 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-emerald text-emerald hover:bg-emerald hover:text-white px-8 py-6 text-lg transition-all duration-300"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
