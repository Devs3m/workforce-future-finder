import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Briefcase, GraduationCap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Career Assessment",
    description: "Discover your strengths, interests, and ideal career paths through comprehensive evaluations.",
    action: "Take Assessment"
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Access curated training programs, certifications, and skill-building materials.",
    action: "Browse Resources"
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    description: "Connect with opportunities that match your skills, experience, and career goals.",
    action: "Find Jobs"
  },
  {
    icon: GraduationCap,
    title: "Skills Development",
    description: "Identify skill gaps and get personalized recommendations for professional growth.",
    action: "Start Learning"
  }
];

export function FeatureGrid() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Career Support</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to advance your career, from assessment to achievement
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {feature.description}
              </p>
              <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground">
                {feature.action}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}