import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">CareerPath</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Assessment</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Resources</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Jobs</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button variant="default">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
}