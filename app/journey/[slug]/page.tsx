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
        <div className="rounded-token border border-slate-200 bg-slate-50 p-3">
          <JourneyIllustration label={journey.title} name={journey.illustrationSvgComponentName} accent="primary" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Common scenarios</h2>
        <p className="text-sm text-slate-600">Choose the scenario that is closest to your proposal. This helps set context before questions.</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {journey.exampleTiles.map((tile) => (
            <Link
              key={tile.id}
              href={`/journey/${journey.slug}/questions?scenario=${tile.id}&scenarioLabel=${encodeURIComponent(tile.title)}`}
              className="group rounded-token border border-slate-200 bg-white p-3 text-left transition hover:border-secondary hover:bg-secondary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <div className="mb-2 h-14 w-full rounded-md border border-slate-200 bg-slate-50">
                <JourneyIllustration label={`${journey.title} - ${tile.title}`} name={journey.illustrationSvgComponentName} accent="secondary" />
              </div>
              <h3 className="font-medium">{tile.title}</h3>
              <p className="text-xs text-slate-600">{tile.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <Link href={`/journey/${journey.slug}/questions`} className="mt-6 inline-block rounded-token bg-primary px-5 py-3 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">Start without selecting a scenario</Link>
    </Layout>
  );
}
