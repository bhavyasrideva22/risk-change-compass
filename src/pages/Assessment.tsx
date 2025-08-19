import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { assessmentQuestions, sectionInfo } from "@/data/questions";
import { AssessmentState, AssessmentResponse } from "@/types/assessment";
import { Clock, Brain, Code, Target } from "lucide-react";

const Assessment = () => {
  const navigate = useNavigate();
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    startTime: new Date()
  });
  const [showIntro, setShowIntro] = useState(true);

  // Group questions by category
  const questionSections = {
    psychometric: assessmentQuestions.filter(q => q.category === 'psychometric'),
    technical: assessmentQuestions.filter(q => q.category === 'technical'), 
    wiscar: assessmentQuestions.filter(q => q.category === 'wiscar')
  };

  const sectionKeys = Object.keys(questionSections) as Array<keyof typeof questionSections>;
  const currentSectionKey = sectionKeys[assessmentState.currentSection];
  const currentSectionQuestions = questionSections[currentSectionKey];
  const currentQuestion = currentSectionQuestions[assessmentState.currentQuestion];

  const totalQuestions = assessmentQuestions.length;
  const completedQuestions = assessmentState.responses.length;

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('assessmentState', JSON.stringify(assessmentState));
  }, [assessmentState]);

  const handleAnswer = (value: string | number) => {
    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date()
    };

    setAssessmentState(prev => ({
      ...prev,
      responses: [
        ...prev.responses.filter(r => r.questionId !== currentQuestion.id),
        response
      ]
    }));
  };

  const handleNext = () => {
    if (assessmentState.currentQuestion < currentSectionQuestions.length - 1) {
      // Move to next question in current section
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else if (assessmentState.currentSection < sectionKeys.length - 1) {
      // Move to next section
      setAssessmentState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0
      }));
    } else {
      // Assessment complete - navigate to results
      localStorage.setItem('assessmentCompleted', 'true');
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (assessmentState.currentQuestion > 0) {
      // Move to previous question in current section
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    } else if (assessmentState.currentSection > 0) {
      // Move to previous section
      const prevSectionKey = sectionKeys[assessmentState.currentSection - 1];
      const prevSectionQuestions = questionSections[prevSectionKey];
      setAssessmentState(prev => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: prevSectionQuestions.length - 1
      }));
    }
  };

  const getCurrentResponse = () => {
    return assessmentState.responses.find(r => r.questionId === currentQuestion.id)?.value || null;
  };

  const canGoNext = () => {
    return getCurrentResponse() !== null;
  };

  const canGoPrevious = () => {
    return assessmentState.currentSection > 0 || assessmentState.currentQuestion > 0;
  };

  const isLastQuestion = () => {
    return assessmentState.currentSection === sectionKeys.length - 1 && 
           assessmentState.currentQuestion === currentSectionQuestions.length - 1;
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Professional Assessment
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Risk & Change Manager Assessment
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  Comprehensive evaluation of your career potential and alignment
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Psychometric</h3>
                    <p className="text-sm text-muted-foreground">8-10 minutes</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Personality, interests, motivation
                    </p>
                  </div>
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <Code className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Technical</h3>
                    <p className="text-sm text-muted-foreground">6-8 minutes</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Knowledge and problem-solving
                    </p>
                  </div>
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">WISCAR</h3>
                    <p className="text-sm text-muted-foreground">6-8 minutes</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Comprehensive alignment analysis
                    </p>
                  </div>
                </div>

                <div className="bg-accent/30 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Total duration: 20-30 minutes</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Answer honestly for accurate results</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Progress is automatically saved</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Receive personalized recommendations upon completion</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <Button 
                    size="lg"
                    onClick={() => setShowIntro(false)}
                    className="px-8 py-3 text-lg font-semibold"
                  >
                    Begin Assessment
                    <Target className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {sectionInfo[currentSectionKey].title}
            </Badge>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {sectionInfo[currentSectionKey].description}
            </h1>
          </div>

          {/* Progress */}
          <ProgressBar 
            current={completedQuestions + 1}
            total={totalQuestions}
            section={sectionInfo[currentSectionKey].title}
          />

          {/* Question */}
          <QuestionCard
            question={currentQuestion}
            value={getCurrentResponse()}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext()}
            canGoPrevious={canGoPrevious()}
            isLastQuestion={isLastQuestion()}
          />
        </div>
      </div>
    </div>
  );
};

export default Assessment;