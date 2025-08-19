import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, TrendingUp, Users, Clock, Brain } from "lucide-react";
import heroImage from "@/assets/hero-assessment.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Psychometric Analysis",
      description: "Comprehensive personality and cognitive assessment"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "WISCAR Framework",
      description: "Will, Interest, Skill, Cognitive, Ability, Real-world alignment"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Career Guidance",
      description: "Personalized learning paths and career recommendations"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Industry Alignment",
      description: "Match with real-world job requirements and skills"
    }
  ];

  const careerRoles = [
    "Risk Manager",
    "Change Management Consultant", 
    "Enterprise Transformation Manager",
    "Compliance Analyst",
    "Business Continuity Planner"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/90" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Professional Career Assessment
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Should I Become a 
              <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Risk & Change Manager?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover your potential in Risk & Change Management through our comprehensive 
              assessment combining psychometric analysis, technical evaluation, and career guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/assessment')}
              >
                Start Assessment
                <Clock className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="text-white/80 text-sm">
                <Clock className="inline h-4 w-4 mr-1" />
                Takes 20-30 minutes
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-white mb-2 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              What Is Risk & Change Management?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Risk & Change Managers ensure smooth transitions in business environments by 
              identifying potential risks, creating mitigation strategies, and managing the 
              human side of organizational change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Key Industries</h3>
              <div className="space-y-3">
                {[
                  "Financial institutions",
                  "Healthcare systems", 
                  "IT and SaaS companies",
                  "Government and NGOs",
                  "Consulting firms"
                ].map((industry, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-foreground">{industry}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Career Opportunities</h3>
              <div className="grid gap-3">
                {careerRoles.map((role, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground">{role}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Comprehensive Assessment Framework
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our scientifically-backed assessment evaluates your personality, technical skills, 
              and career alignment to provide personalized recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="text-primary mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Discover Your Career Potential?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Take our comprehensive assessment and get personalized recommendations 
              for your Risk & Change Management career journey.
            </p>
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/assessment')}
            >
              Start Your Assessment Now
              <Target className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;