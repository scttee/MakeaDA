import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { journeys } from "@/data/content";
import { JourneyIllustration } from "@/components/Illustrations";

export function generateStaticParams() {
  return journeys.map((journey) => ({ slug: journey.slug }));
}

export default function JourneyIntro({ params }: { params: { slug: string } }) {
  const journey = journeys.find((j) => j.slug === params.slug);
  if (!journey) return notFound();

  return (
    <Layout>
      <p className="text-sm text-slate-600">Journey</p>
      <h1 className="text-3xl font-semibold tracking-tight">{journey.title}</h1>
      <p className="mt-2 max-w-3xl text-slate-700">{journey.description}</p>
      <section className="mt-5 rounded-token border border-slate-200 bg-white p-6 shadow-sm">
        <JourneyIllustration label={journey.title} name={journey.illustrationSvgComponentName} />
        <h2 className="mt-2 text-lg font-semibold">Common examples</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {journey.exampleTiles.map((tile) => (
            <article key={tile.id} className="rounded-token border border-slate-200 bg-slate-50 p-3">
              <h3 className="font-medium">{tile.title}</h3>
              <p className="text-xs text-slate-600">{tile.description}</p>
            </article>
          ))}
        </div>
      </section>
      <Link href={`/journey/${journey.slug}/questions`} className="mt-6 inline-block rounded-token bg-primary px-5 py-3 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">Start questions</Link>
    </Layout>
  );
}
