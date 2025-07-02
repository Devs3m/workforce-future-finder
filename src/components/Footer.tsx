import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">CareerPath</span>
            </div>
            <p className="text-white/80">
              Empowering workforce development through personalized career guidance and skills development.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Career Assessment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Skills Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Job Matching</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Career Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Industry Insights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <p className="text-white/80 mb-4">
              Ready to take the next step in your career journey?
            </p>
            <Button variant="accent" className="w-full">
              Start Assessment
            </Button>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; 2024 CareerPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}