/** Contenido del portfolio. Edita aquí; los componentes no contienen textos de datos. */

export type Tech = 'Java' | 'Spring' | 'Angular' | 'SQL' | 'JavaScript' | 'Swift';

export interface Job {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly summary: string;
  /** Iniciales que se muestran si no existe el archivo del logotipo. */
  readonly initials: string;
  /** Nombre del archivo dentro de public/assets/logos (por ejemplo 'bbva.svg'). */
  readonly logo?: string;
  readonly tags: readonly Tech[];
  readonly current?: boolean;
}

export interface Project {
  readonly name: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly url: string;
}

export const CONTACT = {
  email: 'raulgonzalezdelaaleja@gmail.com',
  linkedin: 'https://www.linkedin.com/in/raul-gonzalez-de-la-aleja-ruiz-valdepenas-programador/',
  github: 'https://github.com/RaulGarvDev',
} as const;

export const TECH_FILTERS: readonly Tech[] = ['Java', 'Spring', 'Angular', 'SQL', 'JavaScript', 'Swift'];

export const EXPERIENCE: readonly Job[] = [
  {
    id: 'bbva-technology',
    role: 'Desarrollador de software',
    company: 'BBVA Technology',
    period: 'Dic. 2024 – actualidad',
    summary:
      'Evolutivos y correcciones en varias aplicaciones internas del banco, además de su despliegue y monitorización en los distintos entornos.',
    initials: 'BB',
    logo: 'bbva.svg',
    tags: ['Angular', 'Java', 'Spring', 'SQL'],
    current: true,
  },
  {
    id: 'optimissa',
    role: 'Desarrollador de software',
    company: 'Optimissa, en cliente BBVA',
    period: 'Jun. 2022 – dic. 2024',
    summary:
      'Desarrollo de aplicaciones internas del banco, con interfaces en Spring web, JSP, JavaScript, jQuery y Angular.',
    initials: 'Op',
    logo: 'optimissa.svg',
    tags: ['Java', 'Spring', 'SQL', 'Angular', 'JavaScript'],
  },
  {
    id: 'versys',
    role: 'Técnico informático',
    company: 'Versys Ediciones Técnicas',
    period: 'Nov. 2021 – jun. 2022',
    summary: 'Adaptación de las webs de la empresa a aplicaciones móviles con Java y Swift, y diseño de páginas web.',
    initials: 'Ve',
    logo: 'versys.svg',
    tags: ['Java', 'Swift'],
  },
  {
    id: 'hgadvance',
    role: 'Técnico de soporte de aplicaciones',
    company: 'HGAdvance',
    period: 'Sept. 2020 – nov. 2021',
    summary: 'Soporte de la plataforma Blackboard a estudiantes y profesores de la Universidad Europea.',
    initials: 'HG',
    logo: 'hgadvance.svg',
    tags: [],
  },
  {
    id: 'dam',
    role: 'Cambio de carrera al desarrollo de software',
    company: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
    period: 'Antes',
    summary: 'Varios años de experiencia en logística en multinacionales antes de formarme como desarrollador.',
    initials: 'DAM',
    tags: [],
  },
];

/** Mientras esté vacía, la sección de proyectos no se muestra. */
export const PROJECTS: readonly Project[] = [
  // { name: 'Mi proyecto', description: 'Qué hace y qué problema resuelve.', tech: ['Java', 'Angular'], url: 'https://github.com/RaulGarvDev/mi-proyecto' },
];
