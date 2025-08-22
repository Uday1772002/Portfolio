import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { useContactForm } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const { mutate: submitForm, isPending } = useContactForm();
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "jayaramuday17@gmail.com",
      link: "mailto:jayaramuday17@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 6302595694",
      link: "tel:+916302595694",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Adoni, India",
      link: "https://www.google.com/maps/@15.6250801,77.2951508,16z?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com/Uday1772002" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jayaramuday-marali/",
    },
    { icon: Twitter, label: "Twitter", url: "https://x.com/UdayMarali86687" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    submitForm(formData, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
        console.error("Contact form error:", error);
      },
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'd love to hear about your
              project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 border-border shadow-medium">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Send me a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="border-border focus:border-emerald focus:ring-emerald"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="border-border focus:border-emerald focus:ring-emerald"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="border-border focus:border-emerald focus:ring-emerald"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry"
                    className="border-border focus:border-emerald focus:ring-emerald"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="border-border focus:border-emerald focus:ring-emerald resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full bg-emerald hover:bg-emerald-dark text-white py-3 shadow-medium hover:shadow-large transition-all duration-300 disabled:opacity-50"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Get in touch
                </h3>
                <p className="text-warm-gray leading-relaxed mb-8">
                  I am always interested in new opportunities and interesting
                  projects. Whether you have a question or just want to say hi,
                  feel free to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-emerald hover:bg-emerald/5 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-full bg-emerald/10 group-hover:bg-emerald/20 transition-colors">
                      <info.icon className="h-5 w-5 text-emerald" />
                    </div>
                    <div>
                      <div className="text-sm text-warm-gray">{info.label}</div>
                      <div className="font-medium text-foreground">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Follow me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full border border-border hover:border-emerald hover:bg-emerald hover:text-white text-emerald transition-all duration-300 transform hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <Card className="p-6 bg-emerald/5 border-emerald/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-medium text-foreground">
                      Available for work
                    </div>
                    <div className="text-sm text-warm-gray">
                      Currently accepting new projects
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
