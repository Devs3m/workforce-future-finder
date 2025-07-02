import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Navigate Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Discover your potential, develop your skills, and connect with opportunities 
              that align with your goals. Our workforce development platform guides you 
              every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Career Assessment
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="accent" size="lg">
                Explore Resources
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">10,000+ careers guided</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">500+ resources</span>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <img 
              src={heroImage}
              alt="Career Development"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}