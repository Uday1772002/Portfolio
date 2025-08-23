import {
  Calendar,
  Building,
  MapPin,
  Award,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { usePortfolioViewModel } from "@/viewmodels/usePortfolioViewModel";
import { useScrollStacking } from "@/hooks/use-scroll-stacking";

const Experience = () => {
  console.log("🔍 Experience Component: Component rendered");
  const { useExperiences, toggleCardExpansion, isCardExpanded } =
    usePortfolioViewModel();
  const { data: experiences, isLoading, error } = useExperiences();

  console.log("🔍 Experience Component: Hook result:", {
    experiences,
    isLoading,
    error,
  });
  const { containerRef, registerItem, getStackStyle, activeIndex } =
    useScrollStacking({
      threshold: 150,
      slideOffset: 60,
    });

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Work Experience
              </h2>
              <p className="text-lg text-warm-gray max-w-2xl mx-auto">
                My professional journey in software engineering and cloud
                development
              </p>
            </div>

            {/* Loading Skeleton */}
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-emerald" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Work Experience
              </h2>
              <p className="text-lg text-warm-gray max-w-2xl mx-auto">
                My professional journey in software engineering and cloud
                development
              </p>
            </div>

            {/* Error Display */}
            <div className="text-center">
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-800 max-w-md mx-auto">
                <p className="font-semibold mb-2">
                  Failed to load experience data. Please try again later.
                </p>
                <p className="text-sm text-red-600 mt-2">
                  Error: {error.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Work Experience
            </h2>
            <p className="text-base md:text-lg text-warm-gray max-w-2xl mx-auto">
              My professional journey in software engineering and cloud
              development
            </p>
          </div>

          {/* Experience Timeline with Sliding/Covering Effect */}
          <div
            ref={containerRef}
            className="relative space-y-8"
            style={{ perspective: "1000px" }}
          >
            {experiences?.map((exp, index) => (
              <div
                key={exp._id}
                ref={(el) => registerItem(index, el)}
                className="relative"
                style={getStackStyle(index)}
              >
                <div className="border border-border rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm bg-background/80">
                  <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center space-x-3 mb-3 md:mb-4">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-emerald/10 flex items-center justify-center">
                          <Building className="h-5 w-5 md:h-6 md:w-6 text-emerald" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-emerald transition-colors">
                          {exp.company}
                        </h3>
                      </div>

                      <div className="space-y-2 md:space-y-3 text-sm">
                        <div className="flex items-center space-x-2 text-warm-gray">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {exp.duration.startDate &&
                              new Date(
                                exp.duration.startDate
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                            {exp.duration.endDate &&
                              !exp.duration.isCurrent && (
                                <>
                                  {" "}
                                  -{" "}
                                  {new Date(
                                    exp.duration.endDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </>
                              )}
                            {exp.duration.isCurrent && " - Present"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-warm-gray">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald/10 text-emerald border border-emerald/20">
                          {exp.position}
                        </span>
                      </div>
                    </div>

                    {/* Experience Details */}
                    <div className="lg:col-span-2">
                      <div className="space-y-4 md:space-y-6">
                        {/* Achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center">
                              <Award className="h-4 w-4 mr-2 text-emerald" />
                              Key Achievements
                            </h4>

                            {/* Mobile: Collapsible achievements */}
                            <div className="md:hidden">
                              <ul className="space-y-2">
                                {/* Show first achievement always */}
                                {exp.achievements
                                  .slice(0, 1)
                                  .map((achievement, achievementIndex) => (
                                    <li
                                      key={achievementIndex}
                                      className="text-warm-gray text-sm flex items-start"
                                    >
                                      <span className="w-2 h-2 bg-emerald rounded-full mt-2 mr-3 flex-shrink-0" />
                                      {achievement}
                                    </li>
                                  ))}

                                {/* Show remaining achievements if expanded */}
                                {isCardExpanded(exp._id) &&
                                  exp.achievements
                                    .slice(1)
                                    .map((achievement, achievementIndex) => (
                                      <li
                                        key={achievementIndex + 1}
                                        className="text-warm-gray text-sm flex items-start"
                                      >
                                        <span className="w-2 h-2 bg-emerald rounded-full mt-2 mr-3 flex-shrink-0" />
                                        {achievement}
                                      </li>
                                    ))}
                              </ul>

                              {/* Read More/Less Button - only show if there are more than 1 achievement */}
                              {exp.achievements.length > 1 && (
                                <button
                                  onClick={() => toggleCardExpansion(exp._id)}
                                  className="text-emerald hover:text-emerald-dark text-sm font-medium mt-3 flex items-center transition-colors"
                                >
                                  {isCardExpanded(exp._id) ? (
                                    <>
                                      Show Less
                                      <ChevronUp className="ml-1 h-4 w-4" />
                                    </>
                                  ) : (
                                    <>
                                      Read More ({exp.achievements.length - 1}{" "}
                                      more)
                                      <ChevronDown className="ml-1 h-4 w-4" />
                                    </>
                                  )}
                                </button>
                              )}
                            </div>

                            {/* Desktop: Always show all achievements */}
                            <div className="hidden md:block">
                              <ul className="space-y-2">
                                {exp.achievements.map(
                                  (achievement, achievementIndex) => (
                                    <li
                                      key={achievementIndex}
                                      className="text-warm-gray text-sm flex items-start"
                                    >
                                      <span className="w-2 h-2 bg-emerald rounded-full mt-2 mr-3 flex-shrink-0" />
                                      {achievement}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Technologies */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 text-xs border border-emerald/20 text-emerald bg-emerald/5 rounded-full hover:bg-emerald/10 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
