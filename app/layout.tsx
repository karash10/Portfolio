import { Inter } from "next/font/google";
import "./globals.css";

// Import the fonts with the weights you need
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "K Harshit - Portfolio",
  description: "A Computer Science student with a focus on building secure and intelligent systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* We add the 'inter.className' for the font 
        and your 'text-slate-300' for the default text color.
      */}
      <body className={`${inter.className} text-slate-300`}>
        {children}
      </body>
    </html>
  );
}