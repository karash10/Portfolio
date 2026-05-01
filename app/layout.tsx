import { Fraunces, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "K Harshit — Backend Engineer & LLM Security Researcher",
  description:
    "Computer Science undergrad at PES University with production experience building AI-powered backend systems and a research specialization in LLM security.",
  keywords: [
    "K Harshit",
    "LLM Security",
    "Adversarial ML",
    "Prompt Injection",
    "PyTorch",
    "Spring Boot",
    "PES University",
    "Portfolio",
  ],
  authors: [{ name: "K Harshit" }],
  openGraph: {
    title: "K Harshit — Backend Engineer & LLM Security Researcher",
    description:
      "Building at the intersection of backend engineering and AI security — async APIs, RAG pipelines, and prompt injection defense.",
    url: "https://karash.me",
    siteName: "K Harshit Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K Harshit — Backend Engineer & LLM Security Researcher",
    description:
      "Building at the intersection of backend engineering and AI security — async APIs, RAG pipelines, and prompt injection defense.",
  },
  robots: "index, follow",
};

/* Anti-FOUC script — runs before first paint to set .dark class */
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    var bg = theme === 'dark' ? '#000000' : '#f8fafc';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.backgroundColor = bg;
  } catch(e) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.backgroundColor = '#000000';
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${serif.variable} ${mono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
