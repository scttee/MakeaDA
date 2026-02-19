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
  if (key.includes("rear extension")) return "Looks like: adding a new room at the back of an existing house.";
  if (key.includes("side extension")) return "Looks like: widening a building by extending into side setback space.";
  if (key.includes("add a second level") || key.includes("add a level")) return "Looks like: adding an upper storey over part or all of the existing dwelling.";
  if (key.includes("kitchen")) return "Looks like: replacing cabinets, appliances and layout inside the existing building envelope.";
  if (key.includes("bathroom")) return "Looks like: bathroom renovation with waterproofing and internal finishes.";
  if (key.includes("outdoor") || key.includes("footpath") || key.includes("roadside")) return "Looks like: tables/chairs in public space with pedestrian clearance and barriers considered.";
  if (key.includes("sign")) return "Looks like: new or updated business sign on building facade or projecting from it.";
  return "Looks like: a common version of this pathway, used to help you pick the closest option.";
};

export default function JourneyIntro({ params }: { params: { slug: string } }) {
  const journey = journeys.find((j) => j.slug === params.slug);
  if (!journey) return notFound();

  return (
    <Layout>
      <p className="text-sm font-medium uppercase tracking-wide text-secondary">Journey</p>
      <h1 className="text-3xl font-semibold tracking-tight">{journey.title}</h1>
      <p className="mt-2 max-w-3xl text-slate-700">{journey.description}</p>

      <section className="mt-5 rounded-token border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-token border border-slate-200 bg-slate-50 p-3">
          <JourneyIllustration label={journey.title} name={journey.illustrationSvgComponentName} accent="primary" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">Common scenarios</h2>
        <p className="text-sm text-slate-600">Choose the scenario closest to your proposal. These are examples only and help tailor your questions.</p>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {journey.exampleTiles.map((tile) => (
            <Link
              key={tile.id}
              href={`/journey/${journey.slug}/questions?scenario=${tile.id}&scenarioLabel=${encodeURIComponent(tile.title)}`}
              className="rounded-token border border-slate-200 bg-white p-4 transition hover:border-secondary hover:bg-secondary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <h3 className="font-medium">{tile.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{tile.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-5 rounded-token border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold">What these examples mean</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {journey.exampleTiles.map((tile) => (
              <li key={`meaning-${tile.id}`}>
                <strong>{tile.title}:</strong> {exampleMeaning(tile.title)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Link href={`/journey/${journey.slug}/questions`} className="mt-6 inline-block rounded-token bg-primary px-5 py-3 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">Start without selecting a scenario</Link>
    </Layout>
  );
}
