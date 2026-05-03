import { Project } from "@/lib/types";

export type CreateProjectInput = {
  title: string;
  label: string;
  description: string;
  bullets: string[];
  tech: Array<{ name: string; color: Project["tech"][number]["color"] }>;
  github?: string;
};

export type UpdateProjectInput = Partial<CreateProjectInput>;

type ValidationFailure = { success: false; error: string };

const TECH_COLORS: Project["tech"][number]["color"][] = [
  "cyan",
  "violet",
  "emerald",
  "neutral",
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string" && item.trim().length > 0)
  );
}

function isValidTechArray(value: unknown): value is CreateProjectInput["tech"] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        isNonEmptyString((item as { name?: unknown }).name) &&
        TECH_COLORS.includes((item as { color?: Project["tech"][number]["color"] }).color as Project["tech"][number]["color"])
    )
  );
}

export function validateProjectInput(
  input: unknown,
  mode: "create"
): ValidationFailure | { success: true; data: CreateProjectInput };
export function validateProjectInput(
  input: unknown,
  mode: "update"
): ValidationFailure | { success: true; data: UpdateProjectInput };
export function validateProjectInput(input: unknown, mode: "create" | "update") {
  if (!input || typeof input !== "object") {
    return { success: false, error: "Invalid request body" };
  }

  const data = input as Record<string, unknown>;
  const normalized: UpdateProjectInput = {};

  if (data.title !== undefined) {
    if (!isNonEmptyString(data.title)) {
      return { success: false, error: "Title must be a non-empty string" };
    }
    normalized.title = data.title.trim();
  }

  if (data.label !== undefined) {
    if (!isNonEmptyString(data.label)) {
      return { success: false, error: "Label must be a non-empty string" };
    }
    normalized.label = data.label.trim();
  }

  if (data.description !== undefined) {
    if (!isNonEmptyString(data.description)) {
      return { success: false, error: "Description must be a non-empty string" };
    }
    normalized.description = data.description.trim();
  }

  if (data.bullets !== undefined) {
    if (!isStringArray(data.bullets)) {
      return { success: false, error: "Bullets must be a non-empty string array" };
    }
    normalized.bullets = data.bullets.map((b) => b.trim());
  }

  if (data.tech !== undefined) {
    if (!isValidTechArray(data.tech)) {
      return { success: false, error: "Tech must be a non-empty array of valid name/color pairs" };
    }
    normalized.tech = data.tech.map((t) => ({ name: t.name.trim(), color: t.color }));
  }

  if (data.github !== undefined) {
    if (typeof data.github !== "string") {
      return { success: false, error: "GitHub URL must be a string" };
    }
    const github = data.github.trim();
    normalized.github = github.length > 0 ? github : undefined;
  }

  if (mode === "create") {
    if (!normalized.title || !normalized.label || !normalized.description || !normalized.bullets || !normalized.tech) {
      return { success: false, error: "Missing required fields" };
    }
    return {
      success: true,
      data: {
        title: normalized.title,
        label: normalized.label,
        description: normalized.description,
        bullets: normalized.bullets,
        tech: normalized.tech,
        github: normalized.github,
      },
    };
  } else {
    if (Object.keys(normalized).length === 0) {
      return { success: false, error: "At least one field is required for update" };
    }
    return { success: true, data: normalized };
  }
}
