// Project type definition
export interface Project {
  id: string;
  title: string;
  label: string;
  description: string;
  bullets: string[];
  tech: { name: string; color: "cyan" | "violet" | "emerald" | "neutral" }[];
  github?: string;
  createdAt: string;
  updatedAt: string;
}

// Type for the projects JSON structure
export interface ProjectsData {
  projects: Project[];
}
