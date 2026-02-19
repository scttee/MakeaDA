import Link from "next/link";
import { Layout } from "@/components/Layout";
import { categories } from "@/data/content";

export default function Home() {
  return <Layout>
    <h1 className="text-4xl font-semibold">Planning Pathway Guide</h1>
    <p className="mt-3 max-w-3xl">Find your likely planning pathway, what to prepare, and who to contact next.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {categories.map((cat) => (
        <Link key={cat.id} href={`/${cat.slug}`} className="rounded-token border p-6 focus:outline focus:outline-2 focus:outline-primary hover:border-primary">
          <h2 className="text-xl font-semibold">{cat.title}</h2><p className="text-sm mt-2">{cat.description}</p>
        </Link>
      ))}
    </div>
  </Layout>;
}
