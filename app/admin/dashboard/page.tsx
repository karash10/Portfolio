"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchProjects();
  }, []);

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: "With GitHub Link",
      value: projects.filter((p) => p.github).length,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      label: "Add New Project",
      href: "/admin/projects/new",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      primary: true,
    },
    {
      label: "View All Projects",
      href: "/admin/projects",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      label: "View Live Site",
      href: "/",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      ),
      external: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-strong)]">Dashboard</h1>
        <p className="mt-2 text-[var(--muted)]">
          Welcome to your portfolio admin panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-xl p-6 border border-[var(--stroke)]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-strong)]">
                  {loading ? "..." : stat.value}
                </p>
                <p className="text-sm text-[var(--muted)]">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-strong)] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                action.primary
                  ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 hover:bg-[var(--accent)]/20 text-[var(--accent)]"
                  : "glass border-[var(--stroke)] hover:border-[var(--stroke-2)] text-[var(--text)]"
              }`}
            >
              {action.icon}
              <span className="font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-strong)] mb-4">
          Recent Projects
        </h2>
        {loading ? (
          <div className="text-[var(--muted)]">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="glass rounded-xl p-8 border border-[var(--stroke)] text-center">
            <p className="text-[var(--muted)]">No projects yet</p>
            <Link
              href="/admin/projects/new"
              className="inline-block mt-4 btn btn-primary"
            >
              Add your first project
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="glass rounded-xl p-4 border border-[var(--stroke)] flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-[var(--text-strong)]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{project.label}</p>
                </div>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="text-sm text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors"
                >
                  Edit &rarr;
                </Link>
              </div>
            ))}
            {projects.length > 5 && (
              <Link
                href="/admin/projects"
                className="block text-center text-sm text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors py-2"
              >
                View all {projects.length} projects &rarr;
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
