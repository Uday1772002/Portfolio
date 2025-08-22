import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { useFeaturedProjects } from "@/hooks/use-api";
import { useEffect } from "react";

const Projects = () => {
  // Add debugging for the hook itself
  console.log(
    "Projects component - useFeaturedProjects hook:",
    useFeaturedProjects
  );

  const { data: projects, isLoading, error } = useFeaturedProjects();

  // Debug logging
  useEffect(() => {
    console.log("🔍 Projects component debug:");
    console.log("  - data:", projects);
    console.log("  - isLoading:", isLoading);
    console.log("  - error:", error);
    console.log("  - projects length:", projects?.length);
    console.log("  - projects type:", typeof projects);
    console.log("  - projects is array:", Array.isArray(projects));
  }, [projects, isLoading, error]);

  // Add error boundary for hook errors
  if (!useFeaturedProjects) {
    console.error("useFeaturedProjects hook is undefined!");
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
                Hook initialization error. Please check console for details.
              </p>
              <p className="text-sm text-red-500">
                Error: useFeaturedProjects hook is undefined
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    console.log("🔄 Projects component - Loading state");
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
    console.error("❌ Projects error details:", error);
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

  console.log("🎯 Projects component - Rendering with data:", projects);
  console.log("🎯 Projects component - projects type:", typeof projects);
  console.log(
    "🎯 Projects component - projects is array:",
    Array.isArray(projects)
  );
  if (projects && Array.isArray(projects)) {
    console.log("🎯 Projects component - first project:", projects[0]);
    console.log(
      "🎯 Projects component - first project keys:",
      projects[0] ? Object.keys(projects[0]) : "no projects"
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
                <div className="p-6 space-y-4">
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
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
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
