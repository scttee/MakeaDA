import { Layout } from "@/components/Layout";
import { glossary } from "@/data/content";

export default function GlossaryPage() {
  return <Layout>
    <h1 className="text-3xl font-semibold">Glossary</h1>
    <dl className="mt-6 space-y-4">{glossary.map(([term, def]) => <div key={term}><dt className="font-semibold">{term}</dt><dd className="text-sm">{def}</dd></div>)}</dl>
  </Layout>;
}
