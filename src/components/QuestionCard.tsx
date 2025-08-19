import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AssessmentQuestion } from "@/types/assessment";

interface QuestionCardProps {
  question: AssessmentQuestion;
  value: string | number | null;
  onAnswer: (value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export const QuestionCard = ({
  question,
  value,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion
}: QuestionCardProps) => {
  const renderLikertScale = () => {
    const scale = question.scale || 5;
    const labels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
    
    return (
      <div className="space-y-4">
        <RadioGroup
          value={value?.toString() || ""}
          onValueChange={(val) => onAnswer(parseInt(val))}
          className="grid grid-cols-1 gap-4"
        >
          {Array.from({ length: scale }, (_, i) => i + 1).map((num) => (
            <div key={num} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
              <RadioGroupItem value={num.toString()} id={`option-${num}`} />
              <Label 
                htmlFor={`option-${num}`} 
                className="flex-1 cursor-pointer font-medium"
              >
                {num} - {labels[num - 1]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-3">
        <RadioGroup
          value={value?.toString() || ""}
          onValueChange={onAnswer}
          className="grid grid-cols-1 gap-3"
        >
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
              <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderScenario = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-l-primary">
          <p className="text-sm text-muted-foreground mb-2">Scenario:</p>
          <p className="font-medium">{question.question}</p>
        </div>
        <RadioGroup
          value={value?.toString() || ""}
          onValueChange={onAnswer}
          className="grid grid-cols-1 gap-3"
        >
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
              <RadioGroupItem value={option} id={`scenario-${index}`} className="mt-1" />
              <Label 
                htmlFor={`scenario-${index}`} 
                className="flex-1 cursor-pointer leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          {question.type === 'scenario' ? 'Scenario Question' : question.question}
        </CardTitle>
        {question.subcategory && (
          <p className="text-sm text-muted-foreground capitalize">
            {question.subcategory.replace(/([A-Z])/g, ' $1').trim()} Assessment
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {question.type === 'likert' && renderLikertScale()}
        {question.type === 'multiple-choice' && renderMultipleChoice()}
        {question.type === 'scenario' && renderScenario()}
        
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
          >
            Previous
          </Button>
          <Button 
            onClick={onNext}
            disabled={!canGoNext}
            className="min-w-[120px]"
          >
            {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};