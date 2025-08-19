import { AssessmentQuestion } from "@/types/assessment";

export const assessmentQuestions: AssessmentQuestion[] = [
  // PSYCHOMETRIC SECTION - Interest Scale
  {
    id: "psy_interest_1",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    question: "I find it exciting to investigate and manage risks in organizations.",
    scale: 5,
    weight: 1.2
  },
  {
    id: "psy_interest_2", 
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    question: "I enjoy analyzing potential problems before they occur.",
    scale: 5,
    weight: 1.1
  },
  {
    id: "psy_interest_3",
    type: "likert", 
    category: "psychometric",
    subcategory: "interest",
    question: "I am fascinated by organizational change and transformation processes.",
    scale: 5,
    weight: 1.2
  },
  {
    id: "psy_interest_4",
    type: "likert",
    category: "psychometric", 
    subcategory: "interest",
    question: "I prefer working on projects that involve preventing problems rather than solving them after they occur.",
    scale: 5,
    weight: 1.0
  },

  // PSYCHOMETRIC SECTION - Personality Compatibility
  {
    id: "psy_personality_1",
    type: "likert",
    category: "psychometric",
    subcategory: "personality", 
    question: "I am very organized and systematic in my approach to work.",
    scale: 5,
    weight: 1.3
  },
  {
    id: "psy_personality_2",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I remain calm under pressure and can think clearly during crises.",
    scale: 5,
    weight: 1.4
  },
  {
    id: "psy_personality_3", 
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    question: "I enjoy working with people from different backgrounds and departments.",
    scale: 5,
    weight: 1.2
  },
  {
    id: "psy_personality_4",
    type: "likert",
    category: "psychometric",
    subcategory: "personality", 
    question: "I am comfortable with ambiguity and uncertain situations.",
    scale: 5,
    weight: 1.3
  },

  // PSYCHOMETRIC SECTION - Motivation Profile
  {
    id: "psy_motivation_1",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    question: "When I start a project, I persist until completion even when it gets difficult.",
    scale: 5,
    weight: 1.2
  },
  {
    id: "psy_motivation_2",
    type: "likert", 
    category: "psychometric",
    subcategory: "motivation",
    question: "I believe my abilities can be developed through dedication and hard work.",
    scale: 5,
    weight: 1.1
  },
  {
    id: "psy_motivation_3",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    question: "I am motivated more by the impact of my work than external rewards.",
    scale: 5,
    weight: 1.0
  },

  // TECHNICAL & APTITUDE SECTION
  {
    id: "tech_aptitude_1",
    type: "multiple-choice",
    category: "technical",
    subcategory: "aptitude",
    question: "If Event A has a 20% probability and Event B has a 30% probability, and they are independent, what is the probability that both events occur?",
    options: ["6%", "10%", "25%", "50%"],
    weight: 1.0
  },
  {
    id: "tech_aptitude_2",
    type: "multiple-choice", 
    category: "technical",
    subcategory: "aptitude",
    question: "Which statement best describes the relationship between risk and uncertainty?",
    options: [
      "Risk and uncertainty are the same thing",
      "Risk can be quantified, uncertainty cannot be easily measured", 
      "Uncertainty is always worse than risk",
      "Risk only applies to financial situations"
    ],
    weight: 1.2
  },
  {
    id: "tech_knowledge_1",
    type: "multiple-choice",
    category: "technical", 
    subcategory: "knowledge",
    question: "Which of the following is NOT typically part of Kotter's 8-Step Change Model?",
    options: [
      "Create urgency",
      "Build a guiding coalition", 
      "Eliminate all resistance",
      "Generate short-term wins"
    ],
    weight: 1.3
  },
  {
    id: "tech_knowledge_2",
    type: "multiple-choice",
    category: "technical",
    subcategory: "knowledge", 
    question: "What is the key difference between risk avoidance and risk mitigation?",
    options: [
      "There is no difference",
      "Avoidance eliminates the risk entirely, mitigation reduces its impact",
      "Mitigation is always more expensive",
      "Avoidance is only used for high-probability risks"
    ],
    weight: 1.2
  },
  {
    id: "tech_scenario_1",
    type: "scenario",
    category: "technical",
    subcategory: "application",
    question: "Your organization is implementing a new software system. Employees are resistant to change, and early adoption rates are low. What would be your first priority as a Change Manager?",
    options: [
      "Mandate immediate adoption with strict deadlines",
      "Identify and work with influential early adopters to build momentum",
      "Postpone the implementation until resistance decreases", 
      "Focus only on training programs"
    ],
    weight: 1.4
  },

  // WISCAR FRAMEWORK SECTION
  {
    id: "wiscar_will_1",
    type: "likert",
    category: "wiscar", 
    subcategory: "will",
    question: "I am willing to work long hours when a critical risk needs to be addressed.",
    scale: 5,
    weight: 1.3
  },
  {
    id: "wiscar_will_2",
    type: "likert",
    category: "wiscar",
    subcategory: "will",
    question: "I have a strong desire to prevent problems that could harm organizations or people.",
    scale: 5,
    weight: 1.2
  },
  {
    id: "wiscar_interest_1", 
    type: "likert",
    category: "wiscar",
    subcategory: "interest",
    question: "I regularly read about business trends, risks, and organizational changes in my spare time.",
    scale: 5,
    weight: 1.1
  },
  {
    id: "wiscar_skill_1",
    type: "likert",
    category: "wiscar",
    subcategory: "skill",
    question: "I am effective at communicating complex information to different audiences.",
    scale: 5,
    weight: 1.3
  },
  {
    id: "wiscar_skill_2",
    type: "likert",
    category: "wiscar", 
    subcategory: "skill",  
    question: "I can think systematically about how different parts of an organization interact.",
    scale: 5,
    weight: 1.2
  },
  {
    id: "wiscar_cognitive_1",
    type: "multiple-choice",
    category: "wiscar",
    subcategory: "cognitive",
    question: "When faced with a complex problem, you typically:",
    options: [
      "Break it down into smaller, manageable parts",
      "Look for patterns from similar past situations", 
      "Seek input from multiple stakeholders",
      "All of the above"
    ],
    weight: 1.2
  },
  {
    id: "wiscar_ability_1",
    type: "likert",
    category: "wiscar",
    subcategory: "ability",
    question: "I actively seek feedback to improve my performance.",
    scale: 5,
    weight: 1.1
  },
  {
    id: "wiscar_real_world_1",
    type: "scenario", 
    category: "wiscar",
    subcategory: "realWorld",
    question: "You discover a significant risk that could impact your organization, but addressing it would require substantial resources and may face resistance from leadership. What do you do?",
    options: [
      "Present a detailed risk analysis with multiple solution options",
      "Wait for someone else to discover and address it",
      "Address only the parts you can control without approval",
      "Document it but take no immediate action"
    ],
    weight: 1.5
  }
];

export const sectionInfo = {
  psychometric: {
    title: "Psychometric Assessment",
    description: "Understanding your personality, interests, and motivation patterns",
    duration: "8-10 minutes"
  },
  technical: {
    title: "Technical & Knowledge Assessment", 
    description: "Evaluating your current knowledge and problem-solving abilities",
    duration: "6-8 minutes"
  },
  wiscar: {
    title: "WISCAR Framework Analysis",
    description: "Comprehensive evaluation of Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world alignment", 
    duration: "6-8 minutes"
  }
};