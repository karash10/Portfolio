"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/lib/types";

export default function NewProjectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/projects");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to create project");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-strong)]">Add New Project</h1>
        <p className="mt-2 text-[var(--muted)]">
          Fill in the details below to add a new project to your portfolio.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
          {error}
        </div>
      )}

      <div className="glass rounded-xl p-6 border border-[var(--stroke)]">
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/projects")}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
