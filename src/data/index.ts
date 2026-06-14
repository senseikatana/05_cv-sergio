import type { 
  SkillGroup,
  Experience,
  Language,
  Download,
  Education,
  ValueItem,
  Pilar,
  HeroData,
  Project,
  Certification,
} from '../types/data';
import seed from './seed.json';

/**
 * Seed de datos del CV — Edita seed.json para cambiar el contenido.
 * Los componentes importan estas constantes, no el JSON directamente.
 */

export const heroData: HeroData = seed.hero;

export const skillGroups: SkillGroup[] = seed.skills;

export const experiences: Experience[] = seed.experiences;

export const projects: Project[] = seed.projects;

export const certifications: Certification[] = seed.certifications;

export const languages: Language[] = seed.languages;

export const downloads: Download[] = seed.downloads;

export const educations: Education[] = seed.educations;

export const pilares: Pilar[] = seed.pilares;

export const busco: ValueItem[] = seed.busco;

export const ofrezco: ValueItem[] = seed.ofrezco;
