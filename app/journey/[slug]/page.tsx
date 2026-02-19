import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { journeys } from "@/data/content";
import { JourneyIllustration } from "@/components/Illustrations";

export function generateStaticParams() {
  return journeys.map((journey) => ({ slug: journey.slug }));
}

const exampleMeaning = (title: string) => {
  const key = title.toLowerCase();
  if (key.includes("rear extension")) return "Adding a new room at the back of an existing house.";
  if (key.includes("side extension")) return "Widening a building into side setback space.";
  if (key.includes("add a second level") || key.includes("add a level")) return "Adding an upper storey over part or all of the dwelling.";
  if (key.includes("kitchen")) return "Replacing cabinets/appliances and updating internal layout.";
  if (key.includes("bathroom")) return "Bathroom renovation with waterproofing and internal finishes.";
  if (key.includes("outdoor") || key.includes("footpath") || key.includes("roadside")) return "Tables/chairs in public space with pedestrian clearance considered.";
  if (key.includes("sign")) return "New or updated business sign on facade or projecting from it.";
  if (key.includes("garage conversion")) return "Converting existing garage space into habitable secondary dwelling area.";
  return "A common version of this pathway to help you choose the closest match.";
};

export default function JourneyIntro({ params }: { params: { slug: string } }) {
  const journey = journeys.find((j) => j.slug === params.slug);
  if (!journey) return notFound();

  return (
    <Layout>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Journey</p>
      <h1 className="text-3xl font-semibold tracking-tight">{journey.title}</h1>
      <p className="mt-2 max-w-3xl text-slate-700">{journey.description}</p>

      <section className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-token border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-token border border-slate-200 bg-slate-50 p-3">
            <JourneyIllustration label={journey.title} name={journey.illustrationSvgComponentName} accent="primary" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">Common scenarios</h2>
          <p className="text-sm text-slate-600">Pick the scenario closest to your proposal. These examples are guidance only.</p>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {journey.exampleTiles.map((tile) => (
              <Link
                key={tile.id}
                href={`/journey/${journey.slug}/questions?scenario=${tile.id}&scenarioLabel=${encodeURIComponent(tile.title)}`}
                className="rounded-token border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-secondary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary">Common example</p>
                <h3 className="mt-1 font-semibold text-slate-900">{tile.title}</h3>
                <p className="mt-2 text-xs text-slate-700">{exampleMeaning(tile.title)}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-token border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold">How this journey helps</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Identifies your likely pathway in plain English.</li>
            <li>Shows what to prepare first to avoid rework.</li>
            <li>Directs you to official City and NSW confirmation links.</li>
          </ul>
          <Link href={`/journey/${journey.slug}/questions`} className="mt-5 inline-block rounded-token bg-primary px-4 py-2 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">Start questions</Link>
        </aside>
      </section>
    </Layout>
  );
}
