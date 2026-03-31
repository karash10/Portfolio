"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";

const tagColor: Record<string, string> = {
  cyan: "tag",
  violet: "tag-violet",
  emerald: "tag-emerald",
  neutral: "pill kbd",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-strong)]">Projects</h1>
          <p className="mt-1 text-[var(--muted)]">
            Manage your portfolio projects
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn btn-primary">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </Link>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-12 text-[var(--muted)]">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="glass rounded-xl p-12 border border-[var(--stroke)] text-center">
          <svg
            className="mx-auto h-12 w-12 text-[var(--muted-3)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-[var(--text-strong)]">
            No projects yet
          </h3>
          <p className="mt-2 text-[var(--muted)]">
            Get started by creating your first project.
          </p>
          <Link href="/admin/projects/new" className="inline-block mt-4 btn btn-primary">
            Add Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass rounded-xl p-6 border border-[var(--stroke)] hover:border-[var(--stroke-2)] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-[var(--text-strong)]">
                      {project.title}
                    </h3>
                    <span className="pill kbd px-2 py-0.5 text-[0.68rem]">
                      {project.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t.name}
                        className={`${tagColor[t.color]} px-2 py-0.5 rounded-full text-[0.65rem] font-semibold`}
                      >
                        {t.name}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="text-[0.65rem] text-[var(--muted)]">
                        +{project.tech.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="btn btn-secondary text-sm px-4 py-2"
                  >
                    Edit
                  </Link>
                  {deleteId === project.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting}
                        className="text-sm px-3 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 disabled:opacity-50"
                      >
                        {deleting ? "..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        disabled={deleting}
                        className="text-sm px-3 py-2 text-[var(--muted)] hover:text-[var(--text)]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(project.id)}
                      className="text-sm px-4 py-2 text-red-500 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {project.github && (
                <div className="mt-4 pt-4 border-t border-[var(--stroke)]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors"
                  >
                    {project.github}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-xl p-6 border border-[var(--stroke)] max-w-md w-full">
            <h3 className="text-lg font-semibold text-[var(--text-strong)]">
              Delete Project?
            </h3>
            <p className="mt-2 text-[var(--muted)]">
              This action cannot be undone. The project will be permanently deleted.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
