import Link from "next/link";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-bg text-text">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:outline focus:outline-2 focus:outline-primary">Skip to main content</a>
    <header className="border-b border-slate-200 bg-white/95 px-6 py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div>
          <Link href="/" className="text-2xl font-semibold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Planning Pathway Guide</Link>
          <p className="mt-1 text-sm text-slate-600">City of Sydney prototype</p>
        </div>
        <nav aria-label="Secondary" className="flex gap-3 text-sm">
          <Link href="/glossary" className="rounded-md px-3 py-2 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Glossary</Link>
          <Link href="/admin/analytics" className="rounded-md px-3 py-2 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Analytics</Link>
        </nav>
      </div>
    </header>
    <main id="main-content" className="mx-auto max-w-6xl p-8">{children}</main>
  </div>
);
