"use client";

import { useState } from "react";
import { Project } from "@/lib/types";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const colorOptions = ["cyan", "violet", "emerald", "neutral"] as const;

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "");
  const [label, setLabel] = useState(project?.label || "");
  const [description, setDescription] = useState(project?.description || "");
  const [bullets, setBullets] = useState<string[]>(project?.bullets || [""]);
  const [tech, setTech] = useState<{ name: string; color: "cyan" | "violet" | "emerald" | "neutral" }[]>(
    project?.tech || [{ name: "", color: "cyan" }]
  );
  const [github, setGithub] = useState(project?.github || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = "Title is required";
    if (!label.trim()) newErrors.label = "Label is required";
    if (!description.trim()) newErrors.description = "Description is required";
    
    const validBullets = bullets.filter((b) => b.trim());
    if (validBullets.length === 0) newErrors.bullets = "At least one bullet point is required";
    
    const validTech = tech.filter((t) => t.name.trim());
    if (validTech.length === 0) newErrors.tech = "At least one technology is required";
    
    if (github && !github.startsWith("http")) {
      newErrors.github = "GitHub URL must start with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const validBullets = bullets.filter((b) => b.trim());
    const validTech = tech.filter((t) => t.name.trim());

    await onSubmit({
      title: title.trim(),
      label: label.trim(),
      description: description.trim(),
      bullets: validBullets,
      tech: validTech,
      github: github.trim() || undefined,
    });
  };

  const addBullet = () => setBullets([...bullets, ""]);
  const removeBullet = (index: number) => {
    if (bullets.length > 1) {
      setBullets(bullets.filter((_, i) => i !== index));
    }
  };
  const updateBullet = (index: number, value: string) => {
    const newBullets = [...bullets];
    newBullets[index] = value;
    setBullets(newBullets);
  };

  const addTech = () => setTech([...tech, { name: "", color: "cyan" }]);
  const removeTech = (index: number) => {
    if (tech.length > 1) {
      setTech(tech.filter((_, i) => i !== index));
    }
  };
  const updateTech = (index: number, field: "name" | "color", value: string) => {
    const newTech = [...tech];
    if (field === "color") {
      newTech[index] = { ...newTech[index], color: value as typeof colorOptions[number] };
    } else {
      newTech[index] = { ...newTech[index], [field]: value };
    }
    setTech(newTech);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-[var(--bg-1)] border border-[var(--stroke)] text-[var(--text-strong)] placeholder:text-[var(--muted-3)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors";
  const labelClass = "block text-sm font-semibold text-[var(--text-strong)] mb-2";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="e.g., XJailGuard"
          disabled={isLoading}
        />
        {errors.title && <p className={errorClass}>{errors.title}</p>}
      </div>

      {/* Label */}
      <div>
        <label htmlFor="label" className={labelClass}>
          Label *
        </label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className={inputClass}
          placeholder="e.g., LLM Security"
          disabled={isLoading}
        />
        {errors.label && <p className={errorClass}>{errors.label}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="A comprehensive description of the project..."
          disabled={isLoading}
        />
        {errors.description && <p className={errorClass}>{errors.description}</p>}
      </div>

      {/* Bullet Points */}
      <div>
        <label className={labelClass}>Bullet Points *</label>
        <div className="space-y-3">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={bullet}
                onChange={(e) => updateBullet(index, e.target.value)}
                className={inputClass}
                placeholder={`Bullet point ${index + 1}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => removeBullet(index)}
                disabled={bullets.length === 1 || isLoading}
                className="px-3 py-2 text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addBullet}
          disabled={isLoading}
          className="mt-3 text-sm text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors"
        >
          + Add bullet point
        </button>
        {errors.bullets && <p className={errorClass}>{errors.bullets}</p>}
      </div>

      {/* Technologies */}
      <div>
        <label className={labelClass}>Technologies *</label>
        <div className="space-y-3">
          {tech.map((t, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={t.name}
                onChange={(e) => updateTech(index, "name", e.target.value)}
                className={`${inputClass} flex-1`}
                placeholder="Technology name"
                disabled={isLoading}
              />
              <select
                value={t.color}
                onChange={(e) => updateTech(index, "color", e.target.value)}
                className={`${inputClass} w-32`}
                disabled={isLoading}
              >
                {colorOptions.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeTech(index)}
                disabled={tech.length === 1 || isLoading}
                className="px-3 py-2 text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addTech}
          disabled={isLoading}
          className="mt-3 text-sm text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors"
        >
          + Add technology
        </button>
        {errors.tech && <p className={errorClass}>{errors.tech}</p>}
      </div>

      {/* GitHub URL */}
      <div>
        <label htmlFor="github" className={labelClass}>
          GitHub URL (optional)
        </label>
        <input
          type="text"
          id="github"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className={inputClass}
          placeholder="https://github.com/username/repo"
          disabled={isLoading}
        />
        {errors.github && <p className={errorClass}>{errors.github}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary flex-1 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : project ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="btn btn-secondary flex-1 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
