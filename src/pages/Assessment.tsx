import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const assessmentQuestions = [
  {
    id: 1,
    category: "Personality",
    question: "In a team project, you prefer to:",
    options: [
      { id: "a", text: "Lead the team and delegate tasks", weight: { leadership: 3, collaboration: 1 } },
      { id: "b", text: "Contribute ideas and work collaboratively", weight: { collaboration: 3, creativity: 2 } },
      { id: "c", text: "Focus on detailed execution of tasks", weight: { analytical: 3, detail: 2 } },
      { id: "d", text: "Support others and ensure everyone is heard", weight: { collaboration: 2, communication: 3 } }
    ]
  },
  {
    id: 2,
    category: "Skills",
    question: "Which of these activities energizes you most?",
    options: [
      { id: "a", text: "Solving complex problems", weight: { analytical: 3, technical: 2 } },
      { id: "b", text: "Creating presentations or content", weight: { creativity: 3, communication: 2 } },
      { id: "c", text: "Building relationships with people", weight: { communication: 3, collaboration: 2 } },
      { id: "d", text: "Organizing systems and processes", weight: { detail: 3, leadership: 1 } }
    ]
  },
  {
    id: 3,
    category: "Interests",
    question: "Your ideal work environment would be:",
    options: [
      { id: "a", text: "Fast-paced startup with lots of variety", weight: { adaptability: 3, leadership: 2 } },
      { id: "b", text: "Structured corporation with clear processes", weight: { detail: 3, analytical: 2 } },
      { id: "c", text: "Creative agency with collaborative teams", weight: { creativity: 3, collaboration: 3 } },
      { id: "d", text: "Remote work with flexible schedule", weight: { independence: 3, technical: 1 } }
    ]
  },
  {
    id: 4,
    category: "Skills",
    question: "When facing a deadline, you typically:",
    options: [
      { id: "a", text: "Create a detailed plan and stick to it", weight: { detail: 3, analytical: 2 } },
      { id: "b", text: "Rally the team and work together", weight: { leadership: 3, collaboration: 2 } },
      { id: "c", text: "Focus intensely and work independently", weight: { independence: 2, technical: 2 } },
      { id: "d", text: "Find creative shortcuts and solutions", weight: { creativity: 3, adaptability: 2 } }
    ]
  },
  {
    id: 5,
    category: "Personality",
    question: "You feel most accomplished when:",
    options: [
      { id: "a", text: "You've helped others achieve their goals", weight: { collaboration: 3, communication: 2 } },
      { id: "b", text: "You've mastered a new technical skill", weight: { technical: 3, analytical: 1 } },
      { id: "c", text: "You've led a successful project", weight: { leadership: 3, detail: 1 } },
      { id: "d", text: "You've created something innovative", weight: { creativity: 3, independence: 2 } }
    ]
  }
];

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [assessmentQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleViewResults = () => {
    // Calculate results and navigate
    navigate('/assessment/results', { 
      state: { 
        answers, 
        questions: assessmentQuestions 
      } 
    });
  };

  const currentAnswerId = answers[assessmentQuestions[currentQuestion]?.id];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-12 bg-gradient-card border-0 shadow-glow">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Assessment Complete!</h1>
                <p className="text-muted-foreground mb-8">
                  Great job! You've completed all assessment modules. 
                  Your personalized career report is ready.
                </p>
                <div className="space-y-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={handleViewResults}
                    className="w-full"
                  >
                    View Your Results
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    Return Home
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = assessmentQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Exit Assessment
                </Button>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {assessmentQuestions.length}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round(progress)}% Complete
              </p>
            </div>

            {/* Question Card */}
            <Card className="p-8 bg-gradient-card border-0 shadow-soft">
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {question.category}
                </span>
                <h2 className="text-2xl font-semibold">{question.question}</h2>
              </div>

              <RadioGroup 
                value={currentAnswerId} 
                onValueChange={handleAnswer}
                className="space-y-4"
              >
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label 
                      htmlFor={option.id} 
                      className="flex-1 cursor-pointer text-base leading-relaxed"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <Button 
                  onClick={handleNext}
                  disabled={!currentAnswerId}
                  className="flex items-center gap-2"
                >
                  {currentQuestion === assessmentQuestions.length - 1 ? 'Complete' : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}