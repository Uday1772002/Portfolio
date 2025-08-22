import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Palette,
  Rocket,
  Users,
  Cloud,
  Database,
  Smartphone,
} from "lucide-react";

const About = () => {
  const skills = [
    "Dart",
    "JavaScript",
    "Flutter",
    "React",
    "Redux",
    "Node.js",
    "Express.js",
    "HTML5",
    "CSS3",
    "GCP",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "MongoDB",
    "MySQL",
    "Firebase",
    "Git",
    "Microservices",
    "Distributed Systems",
  ];

  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description:
        "Building scalable applications with React, Node.js, and Flutter",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description:
        "GCP certified engineer with expertise in containerization and CI/CD",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Creating cross-platform mobile apps with Flutter and React Native",
    },
    {
      icon: Database,
      title: "Database Design",
      description:
        "Working with MongoDB, MySQL, and Firebase for data management",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              A passionate Software Engineer with expertise in cloud
              infrastructure and scalable applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="prose prose-lg">
                <p className="text-foreground leading-relaxed mb-6">
                  I'm a dedicated Software Engineer with over 2 years of
                  experience creating scalable digital solutions that combine
                  cutting-edge technology with robust architecture. My journey
                  in tech started with a curiosity about cloud computing and has
                  evolved into a passion for building applications that can
                  handle real-world scale.
                </p>
                <p className="text-warm-gray leading-relaxed">
                  As a GCP Certified Associate Cloud Engineer, I specialize in
                  designing and implementing cloud-native solutions using
                  Docker, Kubernetes, and Terraform. I've led teams in
                  developing HRMS platforms, real-time messaging systems, and
                  educational applications that serve thousands of users.
                </p>
                <p className="text-warm-gray leading-relaxed mt-4">
                  I'm passionate about continuous learning and staying
                  up-to-date with the latest industry trends in cloud computing,
                  microservices architecture, and DevOps practices.
                </p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Technologies I work with
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-emerald/10 text-emerald border-emerald/20 hover:bg-emerald/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card
                  key={index}
                  className="p-6 border-border hover:shadow-medium transition-shadow duration-300 group"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-emerald/10 group-hover:bg-emerald/20 transition-colors">
                      <highlight.icon className="h-6 w-6 text-emerald" />
                    </div>
                    <h4 className="font-semibold text-foreground">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-warm-gray leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
