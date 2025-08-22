import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Trophy,
  BookOpen,
  Users,
  Target,
} from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "B.Tech. Computer Science and Engineering",
      institution: "BML Munjal University",
      location: "Delhi, India",
      duration: "Aug 2020 - Sept 2024",
      relevantCoursework: [
        "Data Structures and Algorithms",
        "Operating Systems",
        "Cloud Computing",
        "Software Engineering",
        "Database Management",
        "Object-Oriented Programming",
        "Communication",
      ],
    },
  ];

  const certifications = [
    {
      name: "GCP Certified: Associate Cloud Engineer",
      issuer: "Google Cloud Platform",
      description:
        "Certified in designing, developing, and managing cloud-native applications and infrastructure on Google Cloud Platform.",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      description:
        "Certified in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
    },
    {
      name: "GitHub Foundations",
      issuer: "GitHub",
      description:
        "Certified in GitHub fundamentals and best practices for version control and collaboration.",
    },
  ];

  const awards = [
    {
      title: "Finalist, Smart India Hackathon 2023",
      description:
        "Reached the final round of India's largest hackathon for innovative solutions.",
    },
    // {
    //   title: "Winner, Robotics Winter of Code BMU",
    //   description:
    //     "Ranked 1st out of 42 participants in the university's robotics coding competition.",
    // },
  ];

  const additionalInfo = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description:
        "Maintained strong academic performance with focus on practical implementation of theoretical concepts.",
    },
    {
      icon: Users,
      title: "Leadership & Teamwork",
      description:
        "Led multiple team projects and collaborated with diverse groups to deliver successful outcomes.",
    },
    {
      icon: Target,
      title: "Continuous Learning",
      description:
        "Actively pursuing additional certifications and staying updated with latest industry trends.",
    },
  ];

  return (
    <section id="education" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Education & Certifications
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              My academic background and professional certifications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education & Additional Highlights */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <GraduationCap className="h-6 w-6 text-emerald mr-3" />
                Education
              </h3>

              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="p-6 border-border hover:shadow-medium transition-shadow duration-300"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-warm-gray mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{edu.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-emerald" />
                        <span className="text-sm text-warm-gray">
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-foreground mb-3">
                        Relevant Coursework
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevantCoursework.map((course, courseIndex) => (
                          <Badge
                            key={courseIndex}
                            variant="secondary"
                            className="bg-emerald/10 text-emerald border-emerald/20 text-xs"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Additional Highlights moved to left column */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                  <Target className="h-6 w-6 text-emerald mr-3" />
                  Additional Highlights
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {additionalInfo.map((info, index) => (
                    <Card
                      key={index}
                      className="p-4 border-border hover:shadow-medium transition-shadow duration-300"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-full bg-emerald/10">
                          <info.icon className="h-5 w-5 text-emerald" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">
                            {info.title}
                          </h4>
                          <p className="text-sm text-warm-gray leading-relaxed">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications & Awards */}
            <div className="space-y-8">
              {/* Certifications */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                  <Award className="h-6 w-6 text-emerald mr-3" />
                  Certifications
                </h3>

                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <Card
                      key={index}
                      className="p-6 border-border hover:shadow-medium transition-shadow duration-300"
                    >
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-emerald font-medium">
                          {cert.issuer}
                        </p>
                        <p className="text-sm text-warm-gray leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                  <Trophy className="h-6 w-6 text-emerald mr-3" />
                  Awards & Achievements
                </h3>

                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <Card
                      key={index}
                      className="p-6 border-border hover:shadow-medium transition-shadow duration-300"
                    >
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">
                          {award.title}
                        </h4>
                        <p className="text-sm text-warm-gray leading-relaxed">
                          {award.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
