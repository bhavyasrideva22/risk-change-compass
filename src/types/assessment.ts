export interface AssessmentQuestion {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  question: string;
  options?: string[];
  scale?: number;
  weight?: number;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'no' | 'maybe';
  confidenceScore: number;
  insights: string[];
  careerRoles: Array<{
    title: string;
    match: number;
    description: string;
  }>;
  learningPath: Array<{
    level: string;
    skills: string[];
    resources: string[];
  }>;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: AssessmentResponse[];
  startTime: Date;
  results?: AssessmentResults;
}