import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { journeys } from "@/data/content";
import { JourneyIllustration } from "@/components/Illustrations";

export function generateStaticParams() {
  return journeys.map((journey) => ({ slug: journey.slug }));
}

const exampleMeaning = (slug: string, title: string) => {
  const key = title.toLowerCase();
  if (key.includes("rear extension")) return "Adding a new family room at the rear of an existing house.";
  if (key.includes("side extension")) return "Widening the building with a new side room and updated roofline.";
  if (key.includes("add a second level") || key.includes("add a level")) return "Adding bedrooms and a bathroom as a new upper storey.";
  if (key.includes("kitchen")) return "Replacing kitchen layout, cabinetry, appliances and internal services.";
  if (key.includes("bathroom")) return "Renovating a bathroom with new fixtures and waterproofing.";
  if (key.includes("outdoor") || key.includes("footpath") || key.includes("roadside")) return "Setting tables/chairs outside with pedestrian clearance and accessibility maintained.";
  if (key.includes("sign")) return "Installing a new fascia or projecting sign for your business frontage.";
  if (key.includes("garage conversion")) return "Converting an existing garage into a habitable room within a secondary dwelling.";

  const fallbackByJourney: Record<string, string> = {
    "build-new": "Building a new house on a vacant lot or replacing an older dwelling with a new one.",
    "granny-flat": "Building a detached granny flat behind an existing home for family use.",
    "deck-pergola-carport": "Adding a backyard deck with steps and a lightweight pergola cover.",
    "pool-spa": "Installing a small in-ground pool with compliant fencing and paving.",
    demolition: "Demolishing an old shed or removing part of a building before new works.",
    "change-exterior": "Replacing front windows, updating facade cladding, or altering an awning.",
    "heritage-works": "Repairing heritage facade elements while retaining significant character features.",
    fitout: "New shop fitout with internal partitions, counters, and service upgrades.",
    "change-use": "Changing a tenancy from office use to a food premises.",
    "outdoor-dining": "Applying for footpath dining area with barriers and outdoor furniture.",
    signage: "Updating existing business signage to a larger or illuminated format.",
    "trading-hours-pom": "Extending evening trading hours and updating your Plan of Management.",
    "modify-approved": "Making minor design changes after DA approval through s4.55.",
    "start-building": "Moving from approved plans to construction certificate and commencement steps.",
    lookup: "Checking an address or DA number in ePlanning to view application status.",
    "talk-to-someone": "Booking early advice when scope, approvals, or documents are still unclear.",
    "strata-apartment": "Apartment bathroom upgrade where strata/common property considerations may apply.",
    "renovate-inside": "Internal non-structural renovation such as kitchen/bathroom and flooring updates.",
    extension: "Extending an existing home to add more internal living area."
  };

  return fallbackByJourney[slug] ?? "Typical example for this pathway based on common City enquiries.";
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
                <p className="mt-2 text-xs text-slate-700">{exampleMeaning(journey.slug, tile.title)}</p>
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
