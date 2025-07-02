import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const assessmentCategories = [
  {
    icon: Users,
    title: "Personality Assessment",
    description: "Understand your work style and preferences",
    progress: 0,
    timeEstimate: "10 min"
  },
  {
    icon: BookOpen,
    title: "Skills Evaluation",
    description: "Assess your current technical and soft skills",
    progress: 0,
    timeEstimate: "15 min"
  },
  {
    icon: Briefcase,
    title: "Career Interests",
    description: "Discover industries and roles that excite you",
    progress: 0,
    timeEstimate: "8 min"
  }
];

export function AssessmentPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Career Assessment</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized insights about your career path with our comprehensive assessment
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {assessmentCategories.map((category, index) => (
              <Card 
                key={category.title}
                className="p-6 bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="text-muted-foreground">{category.timeEstimate}</span>
                  </div>
                  <Progress value={category.progress} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Card className="p-8 bg-gradient-card border-0 shadow-soft">
              <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Assessment?</h3>
              <p className="text-muted-foreground mb-6">
                Complete all three modules to receive your comprehensive career report
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="mb-4"
                onClick={() => navigate('/assessment')}
              >
                Begin Assessment
              </Button>
              <p className="text-sm text-muted-foreground">
                Total estimated time: 33 minutes
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}