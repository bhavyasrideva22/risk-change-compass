import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResults, AssessmentState } from "@/types/assessment";
import { calculateAssessmentResults } from "@/utils/assessmentCalculator";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Target,
  Download,
  Home
} from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load assessment data from localStorage
    const assessmentStateData = localStorage.getItem('assessmentState');
    const assessmentCompleted = localStorage.getItem('assessmentCompleted');

    if (!assessmentCompleted || !assessmentStateData) {
      navigate('/');
      return;
    }

    try {
      const state: AssessmentState = JSON.parse(assessmentStateData);
      const calculatedResults = calculateAssessmentResults(state.responses);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error loading assessment results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No Results Found</h2>
            <p className="text-muted-foreground mb-4">Please complete the assessment first.</p>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="h-8 w-8 text-success" />;
      case 'maybe':
        return <AlertCircle className="h-8 w-8 text-warning" />;
      case 'no':
        return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes':
        return "Excellent fit! You show strong potential for a successful career in Risk & Change Management.";
      case 'maybe':
        return "Good potential with development. Focus on building specific skills to enhance your readiness.";
      case 'no':
        return "Consider alternative paths. Your strengths may be better suited for related fields.";
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return "bg-success/10 text-success border-success/20";
      case 'maybe':
        return "bg-warning/10 text-warning border-warning/20";
      case 'no':
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Assessment Complete
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Your Risk & Change Manager Assessment Results
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive analysis of your career potential and alignment
            </p>
          </div>

          {/* Overall Recommendation */}
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                {getRecommendationIcon()}
              </div>
              <Badge className={`mb-4 ${getRecommendationColor()}`}>
                Overall Score: {results.overallScore}/100
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {getRecommendationText()}
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-muted-foreground mb-4">
                  Confidence Level: {results.confidenceScore}%
                </p>
                <Progress value={results.confidenceScore} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Psychometric Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {results.psychometricScore}/100
                </div>
                <Progress value={results.psychometricScore} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Personality, interests, and motivation alignment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Technical Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {results.technicalScore}/100
                </div>
                <Progress value={results.technicalScore} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Knowledge and problem-solving abilities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  WISCAR Average
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {Math.round(Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)}/100
                </div>
                <Progress value={Math.round(Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Comprehensive readiness evaluation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* WISCAR Detailed Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>WISCAR Framework Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(results.wiscarScores).map(([key, score]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">
                        {key === 'realWorld' ? 'Real World' : key}
                      </span>
                      <span className="text-sm font-bold">{score}/100</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Personalized Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Roles */}
          <Card>
            <CardHeader>
              <CardTitle>Career Role Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.careerRoles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{role.title}</h4>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{role.match}%</span>
                      <Progress value={role.match} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Path */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {results.learningPath.map((level, index) => (
                  <div key={index} className="border-l-4 border-l-primary pl-6">
                    <h4 className="font-bold text-foreground mb-3">{level.level}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Skills to Develop:</h5>
                        <ul className="space-y-1">
                          {level.skills.map((skill, skillIndex) => (
                            <li key={skillIndex} className="text-sm text-muted-foreground flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Recommended Resources:</h5>
                        <ul className="space-y-1">
                          {level.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="text-sm text-muted-foreground flex items-center">
                              <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.print()}
              className="flex items-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;