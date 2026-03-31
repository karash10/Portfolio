import { Project, ProjectsData } from './types';
import fs from 'fs';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');

// Read all projects
export function getProjects(): Project[] {
  try {
    const fileContents = fs.readFileSync(projectsFilePath, 'utf8');
    const data: ProjectsData = JSON.parse(fileContents);
    return data.projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

// Get a single project by ID
export function getProjectById(id: string): Project | null {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
}

// Save projects (for admin use)
export function saveProjects(projects: Project[]): boolean {
  try {
    const data: ProjectsData = { projects };
    fs.writeFileSync(projectsFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving projects:', error);
    return false;
  }
}

// Generate next ID
export function getNextProjectId(): string {
  const projects = getProjects();
  const maxId = projects.reduce((max, p) => {
    const id = parseInt(p.id, 10);
    return id > max ? id : max;
  }, 0);
  return String(maxId + 1);
}

// Add a new project
export function addProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
  const projects = getProjects();
  const now = new Date().toISOString();
  const newProject: Project = {
    ...project,
    id: getNextProjectId(),
    createdAt: now,
    updatedAt: now,
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

// Update a project
export function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | null {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveProjects(projects);
  return projects[index];
}

// Delete a project
export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  projects.splice(index, 1);
  saveProjects(projects);
  return true;
}
