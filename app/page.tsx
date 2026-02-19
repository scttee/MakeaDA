import Link from "next/link";
import { Layout } from "@/components/Layout";
import { categories } from "@/data/content";

const CategoryIllustration = ({ category }: { category: string }) => {
  const accent = category === "home" ? "var(--color-primary)" : category === "business" ? "var(--color-secondary)" : "#334155";

  return (
    <svg viewBox="0 0 180 90" className="h-20 w-full" role="img" aria-label="Category illustration">
      <polygon points="20,62 90,26 160,62 90,86" fill="#f8fafc" stroke="black" strokeWidth="1.4" />
      <polygon points="20,62 20,34 90,2 90,26" fill="white" stroke="black" strokeWidth="1.4" />
      <polygon points="160,62 160,34 90,2 90,26" fill="white" stroke="black" strokeWidth="1.4" />
      {category === "home" && <><rect x="70" y="44" width="34" height="20" fill={accent} stroke="black" strokeWidth="1.3" /><rect x="82" y="50" width="10" height="10" fill="white" stroke="black" strokeWidth="1" /></>}
      {category === "business" && <><rect x="62" y="42" width="56" height="22" fill={accent} stroke="black" strokeWidth="1.3" /><line x1="62" y1="53" x2="118" y2="53" stroke="black" strokeWidth="1" /></>}
      {category === "after" && <><path d="M62 62 L84 40 L96 50 L118 30" stroke={accent} strokeWidth="2.4" fill="none" /><circle cx="118" cy="30" r="3" fill={accent} /></>}
    </svg>
  );
};

const categoryTag = (id: string) => (id === "home" ? "Residents" : id === "business" ? "Businesses" : "After approval");

export default function Home() {
  return (
    <Layout>
      <section className="rounded-token border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">City of Sydney</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight">Planning Pathway Guide</h1>
        <p className="mt-3 max-w-3xl text-slate-700">Find your likely planning pathway, what to prepare, and who to contact next. This guide is a starting point only and links you to official City and NSW resources for confirmation.</p>
      </section>

      <section className="mt-8" aria-label="Category hubs">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Choose your starting point</h2>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-slate-700">3 guided pathways</span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/${cat.slug}`} className="rounded-token border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <div className="mb-2 inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700">{categoryTag(cat.id)}</div>
              <CategoryIllustration category={cat.id} />
              <h3 className="mt-2 text-xl font-semibold">{cat.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
