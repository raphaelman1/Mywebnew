export interface ChecklistItem {
  id: string;
  textSwahili: string;
  textEnglish: string;
  isCompleted?: boolean;
}

export interface StepGuide {
  stepNumber: number;
  titleSwahili: string;
  titleEnglish: string;
  descriptionSwahili: string;
  descriptionEnglish: string;
}

export interface ServiceData {
  id: string;
  titleEnglish: string;
  titleSwahili: string;
  shortDescSwahili: string;
  shortDescEnglish: string;
  purposeSwahili: string;
  purposeEnglish: string;
  officialLink: string;
  linkText: string;
  requirements: ChecklistItem[];
  steps: StepGuide[];
  mistakesSwahili: string[];
  mistakesEnglish: string[];
  iconName: string;
  colorAccent: string; // Tailwind class
  deadline?: string;
}

export interface BlogPost {
  id: string;
  titleSwahili: string;
  titleEnglish: string;
  date: string;
  category: 'HESLB' | 'NIDA' | 'TCU' | 'RITA' | 'AJIRA' | 'General';
  contentSwahili: string;
  contentEnglish: string;
  author: string;
  readTime: string;
}

export interface FAQItem {
  id: string;
  questionSwahili: string;
  questionEnglish: string;
  answerSwahili: string;
  answerEnglish: string;
  category: string;
  views?: number;
  addedDate?: string;
}

export interface User {
  id?: string;
  email?: string;
  fullName: string;
  indexNumber: string;
  combination: string;
  schoolName: string;
  isLoggedIn: boolean;
  isEmailVerified?: boolean;
}

export interface ActivityLog {
  id: string;
  textSwahili: string;
  textEnglish: string;
  timestamp: string;
}

