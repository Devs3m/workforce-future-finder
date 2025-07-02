import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Clock, Users, Star, BookOpen, Video, Award, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const learningResources = [
  {
    id: 1,
    title: "Project Management Fundamentals",
    provider: "LinkedIn Learning",
    type: "Course",
    category: "leadership",
    duration: "4 hours",
    rating: 4.8,
    students: "12,500",
    level: "Beginner",
    price: "Free",
    image: "/placeholder.svg",
    skills: ["Leadership", "Planning", "Communication"]
  },
  {
    id: 2,
    title: "UX Design Bootcamp",
    provider: "Coursera",
    type: "Program",
    category: "creativity",
    duration: "12 weeks",
    rating: 4.9,
    students: "8,300",
    level: "Intermediate",
    price: "$79/month",
    image: "/placeholder.svg",
    skills: ["Design Thinking", "Prototyping", "User Research"]
  },
  {
    id: 3,
    title: "Data Analysis with Python",
    provider: "edX",
    type: "Course",
    category: "analytical",
    duration: "6 weeks",
    rating: 4.7,
    students: "15,200",
    level: "Intermediate",
    price: "$99",
    image: "/placeholder.svg",
    skills: ["Python", "Data Visualization", "Statistics"]
  },
  {
    id: 4,
    title: "Digital Marketing Certification",
    provider: "Google",
    type: "Certification",
    category: "communication",
    duration: "3 months",
    rating: 4.6,
    students: "25,000",
    level: "Beginner",
    price: "Free",
    image: "/placeholder.svg",
    skills: ["SEO", "Content Marketing", "Analytics"]
  },
  {
    id: 5,
    title: "Agile Project Management",
    provider: "Udemy",
    type: "Course",
    category: "collaboration",
    duration: "8 hours",
    rating: 4.5,
    students: "9,800",
    level: "Intermediate",
    price: "$49.99",
    image: "/placeholder.svg",
    skills: ["Scrum", "Kanban", "Team Leadership"]
  },
  {
    id: 6,
    title: "Creative Problem Solving",
    provider: "MasterClass",
    type: "Workshop",
    category: "creativity",
    duration: "2 hours",
    rating: 4.8,
    students: "5,400",
    level: "All Levels",
    price: "$15/month",
    image: "/placeholder.svg",
    skills: ["Innovation", "Critical Thinking", "Brainstorming"]
  }
];

const categories = [
  { id: "all", name: "All Resources", count: learningResources.length },
  { id: "leadership", name: "Leadership", count: learningResources.filter(r => r.category === "leadership").length },
  { id: "creativity", name: "Creativity", count: learningResources.filter(r => r.category === "creativity").length },
  { id: "analytical", name: "Analytical", count: learningResources.filter(r => r.category === "analytical").length },
  { id: "communication", name: "Communication", count: learningResources.filter(r => r.category === "communication").length },
  { id: "collaboration", name: "Collaboration", count: learningResources.filter(r => r.category === "collaboration").length }
];

export default function LearningResources() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType = selectedType === "all" || resource.type.toLowerCase() === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "course": return <BookOpen className="h-4 w-4" />;
      case "program": return <Video className="h-4 w-4" />;
      case "certification": return <Award className="h-4 w-4" />;
      case "workshop": return <Users className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
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
              <h1 className="text-4xl font-bold mb-2">Learning Resources</h1>
              <p className="text-muted-foreground">
                Discover courses, certifications, and resources to advance your career
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses, skills, or providers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Tabs value={selectedType} onValueChange={setSelectedType} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All Types</TabsTrigger>
                    <TabsTrigger value="course">Courses</TabsTrigger>
                    <TabsTrigger value="certification">Certifications</TabsTrigger>
                    <TabsTrigger value="program">Programs</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.name}
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-4">
              <p className="text-muted-foreground">
                Showing {filteredResources.length} of {learningResources.length} resources
              </p>
            </div>

            {/* Resource Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <Badge 
                        variant={resource.price === "Free" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {resource.price}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.provider}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {resource.students}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-400" />
                          {resource.rating}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        Enroll Now
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}