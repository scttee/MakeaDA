import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { journeys } from "@/data/content";
import { IsoIcon } from "@/components/Illustrations";

export default function JourneyIntro({ params }: { params: { slug: string } }) {
  const journey = journeys.find((j) => j.slug === params.slug);
  if (!journey) return notFound();
  return <Layout>
    <h1 className="text-3xl font-semibold">{journey.title}</h1>
    <p className="mt-2">{journey.description}</p>
    <div className="mt-4 rounded-token border p-6"><IsoIcon label={journey.title} />
      <div className="grid md:grid-cols-3 gap-3 mt-4">
        {journey.exampleTiles.map((tile) => <div key={tile.id} className="rounded-token border p-3"><h2 className="font-medium">{tile.title}</h2><p className="text-xs">{tile.description}</p></div>)}
      </div>
    </div>
    <Link href={`/journey/${journey.slug}/questions`} className="mt-6 inline-block rounded-token bg-primary text-white px-5 py-3 focus:outline focus:outline-2 focus:outline-secondary">Start questions</Link>
  </Layout>;
}
