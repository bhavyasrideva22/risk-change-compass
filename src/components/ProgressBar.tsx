import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  section: string;
}

export const ProgressBar = ({ current, total, section }: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {section} - Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-primary">
          {percentage}% Complete
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};