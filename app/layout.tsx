import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "RevenueEngine by Boone51 Studios",
  description: "Track, optimize, and grow revenue across the Boone51 Studios product portfolio."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-8">
          <header className="mb-8 rounded-3xl panel-strong px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="space-y-1">
                <div className="text-2xl font-semibold tracking-tight text-white">RevenueEngine</div>
                <div className="text-sm text-slate-300">by Boone51 Studios</div>
              </Link>
              <nav className="flex items-center gap-3 text-sm text-slate-300">
                <Link href="/" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-blue-400/50 hover:text-white">
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-400"
                >
                  Open Dashboard
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-10 rounded-3xl panel-strong px-6 py-5 text-sm text-slate-400">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span>&copy; 2026 Boone51 Studios</span>
              <a href="mailto:hello@boone51.com" className="text-slate-200 transition hover:text-blue-300">
                hello@boone51.com
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
