import { AssessmentResponse, AssessmentResults } from "@/types/assessment";
import { assessmentQuestions } from "@/data/questions";

export const calculateAssessmentResults = (responses: AssessmentResponse[]): AssessmentResults => {
  // Create a map for quick response lookup
  const responseMap = new Map(responses.map(r => [r.questionId, r.value]));

  // Calculate Psychometric Score
  const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  const psychometricScore = calculateCategoryScore(psychometricQuestions, responseMap);

  // Calculate Technical Score
  const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  const technicalScore = calculateCategoryScore(technicalQuestions, responseMap);

  // Calculate WISCAR Scores
  const wiscarQuestions = assessmentQuestions.filter(q => q.category === 'wiscar');
  const wiscarScores = {
    will: calculateSubcategoryScore(wiscarQuestions, responseMap, 'will'),
    interest: calculateSubcategoryScore(wiscarQuestions, responseMap, 'interest'),
    skill: calculateSubcategoryScore(wiscarQuestions, responseMap, 'skill'), 
    cognitive: calculateSubcategoryScore(wiscarQuestions, responseMap, 'cognitive'),
    ability: calculateSubcategoryScore(wiscarQuestions, responseMap, 'ability'),
    realWorld: calculateSubcategoryScore(wiscarQuestions, responseMap, 'realWorld')
  };

  // Calculate Overall Score (weighted average)
  const overallScore = Math.round(
    (psychometricScore * 0.35) + 
    (technicalScore * 0.35) + 
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.30)
  );

  // Determine recommendation
  let recommendation: 'yes' | 'no' | 'maybe';
  let confidenceScore: number;

  if (overallScore >= 80) {
    recommendation = 'yes';
    confidenceScore = Math.min(95, overallScore + 5);
  } else if (overallScore >= 60) {
    recommendation = 'maybe';
    confidenceScore = overallScore;
  } else {
    recommendation = 'no';
    confidenceScore = Math.max(40, overallScore - 10);
  }

  // Generate insights
  const insights = generateInsights(psychometricScore, technicalScore, wiscarScores, overallScore);

  // Generate career roles with match percentages
  const careerRoles = generateCareerRoles(psychometricScore, technicalScore, wiscarScores);

  // Generate learning path
  const learningPath = generateLearningPath(recommendation, technicalScore, psychometricScore);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    confidenceScore,
    insights,
    careerRoles,
    learningPath
  };
};

const calculateCategoryScore = (questions: any[], responseMap: Map<string, any>): number => {
  let totalWeightedScore = 0;
  let totalWeight = 0;

  questions.forEach(question => {
    const response = responseMap.get(question.id);
    if (response !== undefined) {
      const weight = question.weight || 1;
      let normalizedScore = 0;

      if (question.type === 'likert') {
        normalizedScore = (Number(response) / (question.scale || 5)) * 100;
      } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
        // For MC questions, assume correct answers get 100, others get proportional scores
        const correctAnswers = getCorrectAnswers();
        const isCorrect = correctAnswers[question.id] === response;
        normalizedScore = isCorrect ? 100 : 25; // Partial credit for attempting
      }

      totalWeightedScore += normalizedScore * weight;
      totalWeight += weight;
    }
  });

  return totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;
};

const calculateSubcategoryScore = (questions: any[], responseMap: Map<string, any>, subcategory: string): number => {
  const subcategoryQuestions = questions.filter(q => q.subcategory === subcategory);
  return calculateCategoryScore(subcategoryQuestions, responseMap);
};

const getCorrectAnswers = (): Record<string, string> => {
  return {
    'tech_aptitude_1': '6%',
    'tech_aptitude_2': 'Risk can be quantified, uncertainty cannot be easily measured',
    'tech_knowledge_1': 'Eliminate all resistance',
    'tech_knowledge_2': 'Avoidance eliminates the risk entirely, mitigation reduces its impact',
    'tech_scenario_1': 'Identify and work with influential early adopters to build momentum',
    'wiscar_cognitive_1': 'All of the above',
    'wiscar_real_world_1': 'Present a detailed risk analysis with multiple solution options'
  };
};

const generateInsights = (psychometric: number, technical: number, wiscar: any, overall: number): string[] => {
  const insights: string[] = [];

  if (psychometric >= 80) {
    insights.push("Your personality profile shows excellent alignment with risk and change management roles.");
  } else if (psychometric >= 60) {
    insights.push("You show good personality fit for risk management, with room to develop stakeholder management skills.");
  } else {
    insights.push("Consider developing interpersonal and stress management skills for this field.");
  }

  if (technical >= 80) {
    insights.push("Strong technical foundation - you're ready for advanced risk management concepts.");
  } else if (technical >= 60) {
    insights.push("Good basic knowledge, but consider strengthening your understanding of change frameworks.");
  } else {
    insights.push("Start with foundational courses in risk management and organizational change.");
  }

  if (wiscar.will >= 80 && wiscar.interest >= 80) {
    insights.push("High motivation and genuine interest make you an excellent candidate for this career path.");
  }

  if (overall >= 80) {
    insights.push("You demonstrate strong potential for success in Risk & Change Management roles.");
  } else if (overall >= 60) {
    insights.push("With focused development, you could build a successful career in this field.");
  }

  return insights;
};

const generateCareerRoles = (psychometric: number, technical: number, wiscar: any) => {
  const baseRoles = [
    {
      title: "Risk Manager",
      description: "Oversees organizational risk frameworks and mitigation strategies",
      baseMatch: 0.3
    },
    {
      title: "Change Management Consultant", 
      description: "Guides teams and organizations through transformation processes",
      baseMatch: 0.25
    },
    {
      title: "Compliance Analyst",
      description: "Ensures business operations align with regulations and standards", 
      baseMatch: 0.2
    },
    {
      title: "Organizational Development Specialist",
      description: "Enhances workforce capability and organizational effectiveness",
      baseMatch: 0.15
    },
    {
      title: "Transformation Program Manager",
      description: "Leads multi-phase change programs and strategic initiatives",
      baseMatch: 0.1
    }
  ];

  return baseRoles.map(role => ({
    ...role,
    match: Math.min(95, Math.round(
      role.baseMatch * 100 + 
      (psychometric * 0.4) + 
      (technical * 0.35) + 
      ((wiscar.skill + wiscar.realWorld) / 2 * 0.25)
    ))
  })).sort((a, b) => b.match - a.match);
};

const generateLearningPath = (recommendation: string, technical: number, psychometric: number) => {
  const learningPath = [];

  if (recommendation === 'yes') {
    learningPath.push({
      level: "Advanced Application",
      skills: ["Advanced risk frameworks (ISO 31000, COSO)", "Change leadership", "Stakeholder engagement"],
      resources: ["Professional certifications", "Industry case studies", "Mentorship programs"]
    });
  }

  if (recommendation === 'maybe' || technical < 70) {
    learningPath.push({
      level: "Intermediate Development", 
      skills: ["Risk assessment methodologies", "Change models (ADKAR, Kotter)", "Project management"],
      resources: ["Online courses", "Professional workshops", "Practice simulations"]
    });
  }

  if (recommendation === 'no' || technical < 60 || psychometric < 60) {
    learningPath.push({
      level: "Foundation Building",
      skills: ["Business fundamentals", "Communication skills", "Problem-solving", "Basic risk concepts"],
      resources: ["Introductory courses", "Books and articles", "Soft skills training"]
    });
  }

  return learningPath;
};