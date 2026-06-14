export interface Skill {
  name: string;
  pct: number;
  color?: string;
}

export interface SkillGroup {
  titleI18n: string;
  title: string;
  skills: Skill[];
}

export interface Experience {
  roleI18n: string;
  role: string;
  company: string;
  date: string;
  descI18n: string;
  desc: string;
  active?: boolean;
}

export interface Project {
  nameI18n: string;
  name: string;
  descriptionI18n: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Certification {
  nameI18n: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  nameI18n: string;
  name: string;
  level: string;
  levelI18n?: string;
}

export interface Download {
  title: string;
  icon: 'red' | 'blue' | 'green';
  svgPath: string;
  svgType: 'fill' | 'stroke';
  filename: string;
  content: string;
}

export interface Education {
  degreeI18n: string;
  degree: string;
  school: string;
  date: string;
}

export interface ValueItem {
  i18nKey: string;
  text: string;
}

export interface Pilar {
  id: number;
  label: string;
  name: string;
}

export interface HeroData {
  nameI18n: string;
  name: string;
  professionalI18n: string;
  professional: string;
  availableI18n: string;
  available: string;
  email: string;
  location: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  type: 'email' | 'phone' | 'location';
}