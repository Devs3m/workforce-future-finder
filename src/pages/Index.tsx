import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { AssessmentPreview } from "@/components/AssessmentPreview";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeatureGrid />
      <AssessmentPreview />
      <Footer />
    </div>
  );
};

export default Index;
