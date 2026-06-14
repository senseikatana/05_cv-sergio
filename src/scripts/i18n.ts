// ==========================================================================
// i18n — Traducciones ES/EN
// ==========================================================================

const translations: Record<string, Record<string, string>> = {
  es: {},
  en: {
    'hero.name': 'Your Name',
    'hero.professional': 'Analytical Developer & Problem Solver',
    'hero.available': 'Available for projects',
    'busco.title': 'I seek...',
    'busco.1': 'A dynamic ecosystem that values initiative.',
    'busco.2': 'Daily challenges requiring structured thinking to optimize processes.',
    'busco.3': 'Leaders who offer autonomy based on trust and goal fulfillment.',
    'ofrezco.title': 'I offer...',
    'ofrezco.1': 'Ability to identify bottlenecks and propose viable immediate solutions.',
    'ofrezco.2': 'Peace of mind for the team: I take full responsibility for execution.',
    'ofrezco.3': 'Rapid assimilation of new tools, regulations, or work methodologies.',
    // Skills
    'skills.analytics': 'Analytics & Data',
    'skills.management': 'Management & Methodologies',
    'skills.tools': 'Tools & Tech',
    'skills.technical': 'Tech & Tools',

    // Projects
    'projects.title': 'Featured Projects',
    'projects.1.name': 'Operational KPI Dashboard',
    'projects.1.desc': 'Interactive Power BI dashboard centralizing productivity metrics, cycle times, and efficiency across 3 departments.',
    'projects.2.name': 'Logistics Alert System',
    'projects.2.desc': 'Automated Python script monitoring real-time stock and generating preventive alerts for potential supply chain disruptions.',
    'projects.3.name': 'Internal Onboarding Portal',
    'projects.3.desc': 'Internal web platform with automated checklists for new employee onboarding, reducing adaptation time by 40%.',

    // Certifications
    'certs.title': 'Certifications',
    'certs.1': 'Scrum Master Certified (SMC)',
    'certs.2': 'Google Data Analytics Certificate',
    'certs.3': 'Lean Six Sigma Green Belt',

    'about.languages': 'Languages',
    'about.spanish': 'Spanish',
    'about.native': 'Native',
    'about.english': 'English',
    'experience.title': 'Professional Background',
    'experience.currentRole': 'Operations Consultant',
    'experience.currentDesc': 'Optimization of cross-departmental workflows identifying critical inefficiencies.',
    'experience.previousRole': 'Project Analyst',
    'experience.previousDesc': 'Full lifecycle management of technological projects for B2B clients.',
    'about.education': 'Education',
    'about.degree': 'Bachelor Degree',
    'docs.title': 'Attached Documents',
  },
};

export function switchLang(lang: string): void {
  const txtLang = document.getElementById('txtLang');
  if (txtLang) txtLang.textContent = lang.toUpperCase();

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    if (lang === 'es') {
      const original = el.getAttribute('data-i18n-original');
      if (original) el.textContent = original;
    } else {
      const key = el.getAttribute('data-i18n');
      if (key && translations[lang]?.[key]) {
        el.textContent = translations[lang][key]!;
      }
    }
  });

  // Cerrar menús después del cambio
  document.querySelectorAll<HTMLElement>('.dropdown-menu').forEach((m) => m.classList.remove('show'));
}

export function initI18n(): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    if (!el.hasAttribute('data-i18n-original')) {
      el.setAttribute('data-i18n-original', el.textContent ?? '');
    }
  });
}
