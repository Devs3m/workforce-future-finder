import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar as CalendarIcon, Clock, User, Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const consultants = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Senior Career Counselor",
    expertise: ["Leadership Development", "Career Transitions", "Executive Coaching"],
    rating: 4.9,
    experience: "10+ years",
    image: "/placeholder.svg"
  },
  {
    id: "2", 
    name: "Michael Chen",
    title: "Tech Career Specialist",
    expertise: ["Technology Careers", "Skills Assessment", "Industry Insights"],
    rating: 4.8,
    experience: "8+ years",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "Career Psychology Expert",
    expertise: ["Career Psychology", "Work-Life Balance", "Personal Branding"],
    rating: 4.9,
    experience: "12+ years",
    image: "/placeholder.svg"
  }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

export default function CareerConsultation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedConsultant, setSelectedConsultant] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goals: "",
    experience: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedConsultant) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and consultant.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Consultation Scheduled!",
      description: `Your consultation with ${consultants.find(c => c.id === selectedConsultant)?.name} on ${format(selectedDate, "PPP")} at ${selectedTime} has been scheduled.`,
    });

    // Navigate back to results or home
    navigate('/');
  };

  const selectedConsultantData = consultants.find(c => c.id === selectedConsultant);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-4xl font-bold mb-2">Schedule Career Consultation</h1>
              <p className="text-muted-foreground">
                Book a one-on-one session with our expert career counselors
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Consultant Selection */}
              <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Choose Your Consultant
                </h3>
                
                <div className="space-y-4">
                  {consultants.map((consultant) => (
                    <div
                      key={consultant.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/50",
                        selectedConsultant === consultant.id && "border-primary bg-primary/5"
                      )}
                      onClick={() => setSelectedConsultant(consultant.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{consultant.name}</h4>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground">{consultant.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{consultant.title}</p>
                          <p className="text-xs text-muted-foreground mb-2">{consultant.experience} experience</p>
                          <div className="flex flex-wrap gap-1">
                            {consultant.expertise.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Booking Form */}
              <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Schedule Your Session
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <Label>Select Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {time}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {/* Goals & Experience */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="goals">Career Goals</Label>
                      <Textarea
                        id="goals"
                        placeholder="What are your main career goals or challenges you'd like to discuss?"
                        value={formData.goals}
                        onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Current Experience Level</Label>
                      <Select 
                        value={formData.experience} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="mid">Mid Level (3-7 years)</SelectItem>
                          <SelectItem value="senior">Senior Level (8-15 years)</SelectItem>
                          <SelectItem value="executive">Executive Level (15+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Session Summary */}
                  {selectedConsultantData && selectedDate && selectedTime && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Session Summary</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Consultant:</strong> {selectedConsultantData.name}</p>
                        <p><strong>Date:</strong> {format(selectedDate, "PPP")}</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                        <p><strong>Duration:</strong> 60 minutes</p>
                        <p><strong>Format:</strong> Video Call</p>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    Schedule Consultation
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}