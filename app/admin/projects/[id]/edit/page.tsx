"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/lib/types";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${resolvedParams.id}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data.project);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setIsFetching(false);
      }
    };
    fetchProject();
  }, [resolvedParams.id]);

  const handleSubmit = async (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/projects/${resolvedParams.id}`, {
        method: "PUT",
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
        setError(errorData.error || "Failed to update project");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12 text-[var(--muted)]">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-xl p-8 border border-[var(--stroke)] text-center">
          <h2 className="text-xl font-semibold text-[var(--text-strong)]">Project not found</h2>
          <p className="mt-2 text-[var(--muted)]">
            The project you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
          <button
            onClick={() => router.push("/admin/projects")}
            className="mt-4 btn btn-secondary"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-strong)]">Edit Project</h1>
        <p className="mt-2 text-[var(--muted)]">
          Update the details of &quot;{project.title}&quot;
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
          {error}
        </div>
      )}

      <div className="glass rounded-xl p-6 border border-[var(--stroke)]">
        <ProjectForm
          project={project}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/projects")}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
