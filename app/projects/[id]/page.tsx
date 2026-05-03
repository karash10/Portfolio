import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CosmicBackground from "@/components/CosmicBackground";
import FloatingSpaceObjects from "@/components/FloatingSpaceObjects";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Headers";
import Footer from "@/components/Footer";
import FloatingPlanets from "@/components/FloatingPlanets";
import { personal } from "@/data/portfolio";
import { projectDocs } from "@/data/projectDocs";
import { getProjectById } from "@/lib/projects";

function cleanProjectText(text: string) {
  return text.replace(/\[Image\s*\d+\]/gi, "").replace(/\s{2,}/g, " ").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Project Documentation`,
    description: cleanProjectText(project.description),
    openGraph: {
      title: `${project.title} - Project Documentation`,
      description: cleanProjectText(project.description),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Project Documentation`,
      description: cleanProjectText(project.description),
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const doc = projectDocs[id];
  const githubUrl = project.github || personal.github;

  return (
    <>
      <CosmicBackground />
      <FloatingSpaceObjects />
      <ScrollProgress />
      <Header />

      <main id="main-content" className="relative z-10 pt-24 sm:pt-28">
        <section className="relative py-14 sm:py-20">
          <FloatingPlanets section="projects" />
          <div className="site-container">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 kbd text-xs text-[var(--muted-2)] hover:text-[var(--text)] transition-colors"
              >
                <span aria-hidden="true">&larr;</span>
                Back to projects
              </Link>

              <div className="mt-6 glass rounded-[var(--radius-xl)] border border-[var(--stroke)] p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h1 className="section-title text-3xl sm:text-4xl text-[var(--text-strong)]">
                    {project.title}
                  </h1>
                  <span className="pill kbd px-3 py-1 text-[0.72rem]">{project.label}</span>
                </div>

                <p className="mt-4 text-[var(--muted)] leading-relaxed">
                  {cleanProjectText(project.description)}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item.name}
                      className="pill kbd px-2.5 py-1 text-[0.68rem] text-[var(--muted)]"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary shine text-sm"
                  >
                    View on GitHub
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6">
                <section className="glass rounded-[var(--radius-xl)] border border-[var(--stroke)] p-6 sm:p-7">
                  <h2 className="section-title text-2xl text-[var(--text-strong)]">Project highlights</h2>
                  <ul className="mt-4 space-y-3">
                    {(doc?.keyFeatures || project.bullets).slice(0, 4).map((highlight, index) => (
                      <li
                        key={`${project.id}-highlight-${index}`}
                        className="flex items-start gap-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{cleanProjectText(highlight)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="glass rounded-[var(--radius-xl)] border border-[var(--stroke)] p-6 sm:p-7">
                  <h2 className="section-title text-2xl text-[var(--text-strong)]">What it is</h2>
                  <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                    {doc?.whatItIs || cleanProjectText(project.description)}
                  </p>
                </section>

                <section className="glass rounded-[var(--radius-xl)] border border-[var(--stroke)] p-6 sm:p-7">
                  <h2 className="section-title text-2xl text-[var(--text-strong)]">Problem it solves</h2>
                  <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                    {doc?.problemItSolves || "This project addresses a practical engineering challenge with a focus on reliability, security, and real-world usability."}
                  </p>
                </section>

                <section className="glass rounded-[var(--radius-xl)] border border-[var(--stroke)] p-6 sm:p-7">
                  <h2 className="section-title text-2xl text-[var(--text-strong)]">How it works</h2>
                  <ul className="mt-4 space-y-3">
                    {(doc?.architecture || project.bullets).map((point, index) => (
                      <li
                        key={`${project.id}-architecture-${index}`}
                        className="flex items-start gap-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{cleanProjectText(point)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {doc?.architectureDiagram && (
                  <section className="glass rounded-[var(--radius-xl)] border border-[var(--stroke)] p-6 sm:p-7">
                    <h2 className="section-title text-2xl text-[var(--text-strong)]">Architecture diagram</h2>
                    <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                      {doc.architectureDiagram.caption}
                    </p>
                    <a
                      href={doc.architectureDiagram.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--text-strong)]"
                    >
                      Open full diagram
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </section>
                )}

                <section className="glass rounded-[var(--radius-xl)] border border-[var(--stroke)] p-6 sm:p-7">
                  <h2 className="section-title text-2xl text-[var(--text-strong)]">Key capabilities</h2>
                  <ul className="mt-4 space-y-3">
                    {(doc?.keyFeatures || project.bullets).map((feature, index) => (
                      <li
                        key={`${project.id}-feature-${index}`}
                        className="flex items-start gap-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--good)] shrink-0" />
                        <span>{cleanProjectText(feature)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="glass rounded-[var(--radius-xl)] border border-[var(--stroke)] p-6 sm:p-7">
                  <h2 className="section-title text-2xl text-[var(--text-strong)]">Impact and outcomes</h2>
                  <ul className="mt-4 space-y-3">
                    {(doc?.outcomes || project.bullets.slice(0, 2)).map((outcome, index) => (
                      <li
                        key={`${project.id}-outcome-${index}`}
                        className="flex items-start gap-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-2)] shrink-0" />
                        <span>{cleanProjectText(outcome)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
