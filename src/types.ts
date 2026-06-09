export interface SkillItem {
  name: string;
  level: number; // 1 to 5
  color: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  items: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  role: string;
  period: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  githubLink?: string;
}

export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  period: string;
  school: string;
  major: string;
  description?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Profile {
  name: string;
  englishName: string;
  role: string;
  tagline: string;
  avatarUrl: string;
  aboutMeShort: string;
  aboutMeDetailed: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  blogUrl: string;
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  faqs: FAQ[];
}
