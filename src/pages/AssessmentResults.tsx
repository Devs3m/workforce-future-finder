import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { ArrowLeft, Download, Share, TrendingUp, Users, Briefcase, BookOpen } from "lucide-react";

type SkillScores = {
  leadership: number;
  collaboration: number;
  creativity: number;
  analytical: number;
  technical: number;
  communication: number;
  detail: number;
  adaptability: number;
  independence: number;
};

const careerMatches = [
  {
    title: "Project Manager",
    match: 92,
    description: "Lead cross-functional teams and deliver complex projects",
    skills: ["Leadership", "Communication", "Detail-oriented"],
    growth: "High demand, 11% job growth",
    salary: "$85,000 - $125,000"
  },
  {
    title: "UX Designer",
    match: 88,
    description: "Create user-centered designs for digital products",
    skills: ["Creativity", "Analytical", "Collaboration"],
    growth: "Very high demand, 13% job growth",
    salary: "$70,000 - $110,000"
  },
  {
    title: "Business Analyst",
    match: 85,
    description: "Analyze business processes and recommend improvements",
    skills: ["Analytical", "Communication", "Detail-oriented"],
    growth: "Steady growth, 8% job growth",
    salary: "$65,000 - $95,000"
  }
];

const recommendedResources = [
  {
    type: "Certification",
    title: "Project Management Professional (PMP)",
    provider: "PMI",
    duration: "3-6 months",
    icon: Briefcase
  },
  {
    type: "Course",
    title: "Leadership and Team Management",
    provider: "LinkedIn Learning",
    duration: "4 weeks",
    icon: Users
  },
  {
    type: "Workshop",
    title: "Advanced Communication Skills",
    provider: "Local Community College",
    duration: "2 weeks",
    icon: BookOpen
  }
];

export default function AssessmentResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state || {};

  if (!answers || !questions) {
    navigate('/assessment');
    return null;
  }

  // Calculate skill scores based on answers
  const calculateSkillScores = (): SkillScores => {
    const scores: SkillScores = {
      leadership: 0,
      collaboration: 0,
      creativity: 0,
      analytical: 0,
      technical: 0,
      communication: 0,
      detail: 0,
      adaptability: 0,
      independence: 0
    };

    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions.find((q: any) => q.id === parseInt(questionId));
      const option = question?.options.find((o: any) => o.id === answerId);
      
      if (option?.weight) {
        Object.entries(option.weight).forEach(([skill, weight]) => {
          if (skill in scores) {
            scores[skill as keyof SkillScores] += weight as number;
          }
        });
      }
    });

    // Normalize scores to percentage
    const maxPossibleScore = questions.length * 3;
    Object.keys(scores).forEach(skill => {
      scores[skill as keyof SkillScores] = Math.round(
        (scores[skill as keyof SkillScores] / maxPossibleScore) * 100
      );
    });

    return scores;
  };

  const skillScores = calculateSkillScores();
  const topSkills = Object.entries(skillScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Your Career Assessment Results</h1>
                  <p className="text-muted-foreground">
                    Based on your responses, here's your personalized career guidance
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share className="h-4 w-4" />
                    Share Results
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Skills Profile */}
              <div className="lg:col-span-1">
                <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Your Skill Profile
                  </h3>
                  <div className="space-y-4">
                    {topSkills.map(([skill, score]) => (
                      <div key={skill} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium capitalize">
                            {skill.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-muted-foreground">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-3">Key Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {topSkills.slice(0, 3).map(([skill]) => (
                        <Badge key={skill} variant="secondary" className="capitalize">
                          {skill.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Career Matches */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-gradient-card border-0 shadow-soft mb-6">
                  <h3 className="text-xl font-semibold mb-6">Top Career Matches</h3>
                  <div className="space-y-6">
                    {careerMatches.map((career, index) => (
                      <div key={career.title} className="border-l-4 border-primary pl-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold">{career.title}</h4>
                            <p className="text-muted-foreground">{career.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{career.match}%</div>
                            <div className="text-sm text-muted-foreground">Match</div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <div className="text-sm font-medium mb-1">Key Skills</div>
                            <div className="flex flex-wrap gap-1">
                              {career.skills.map(skill => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">Job Market</div>
                            <div className="text-sm text-muted-foreground">{career.growth}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">Salary Range</div>
                            <div className="text-sm text-muted-foreground">{career.salary}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recommended Resources */}
                <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                  <h3 className="text-xl font-semibold mb-6">Recommended Next Steps</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {recommendedResources.map((resource, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                          <resource.icon className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="outline" className="mb-2">{resource.type}</Badge>
                        <h4 className="font-medium mb-1">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{resource.provider}</p>
                        <p className="text-xs text-muted-foreground">{resource.duration}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t text-center">
                    <Button variant="default" className="mr-4">
                      Explore Learning Resources
                    </Button>
                    <Button variant="outline">
                      Schedule Career Consultation
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}