import type { Metadata } from "next";
import "./globals.css";
// Removed ErrorReporter import since the component doesn't exist

export const metadata: Metadata = {
  title: "Project Chronos - Unified Digital Analysis Platform",
  description: "A unified platform for audio, text, and image analysis powered by Google Gemini AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Removed ErrorReporter since the component doesn't exist */}
        {children}
      </body>
    </html>
  );
}