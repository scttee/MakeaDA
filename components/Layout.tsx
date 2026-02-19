import Link from "next/link";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-bg text-text">
    <header className="border-b p-6">
      <Link href="/" className="text-2xl font-semibold focus:outline focus:outline-2 focus:outline-primary">Planning Pathway Guide</Link>
      <p className="text-sm mt-2">City of Sydney prototype</p>
    </header>
    <main className="mx-auto max-w-6xl p-8">{children}</main>
  </div>
);
