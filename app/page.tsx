import Link from "next/link";
import { Layout } from "@/components/Layout";
import { categories } from "@/data/content";

export default function Home() {
  return (
    <Layout>
      <section className="rounded-token border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight">Planning Pathway Guide</h1>
        <p className="mt-3 max-w-3xl text-slate-700">Find your likely planning pathway, what to prepare, and who to contact next. This guide is a starting point only, and links you to official City and NSW resources for confirmation.</p>
      </section>
      <section className="mt-8" aria-label="Category hubs">
        <h2 className="text-2xl font-semibold">Choose your starting point</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/${cat.slug}`} className="rounded-token border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <h3 className="text-xl font-semibold">{cat.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
