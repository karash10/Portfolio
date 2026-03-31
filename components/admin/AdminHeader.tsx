"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  const pathname = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
  ];

  return (
    <header className="glass border-b border-[var(--stroke)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link 
              href="/admin/dashboard" 
              className="text-xl font-bold text-[var(--text-strong)]"
            >
              Admin Panel
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname.startsWith(link.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              View Site &rarr;
            </Link>
            <button
              onClick={onLogout}
              className="btn btn-secondary text-sm px-4 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
