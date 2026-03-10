import SoeeBuilderClient from "@/components/soee/SoeeBuilderClient";
import { SOEE_ENABLED_JOURNEYS } from "@/lib/soee/config";

export function generateStaticParams() {
  return SOEE_ENABLED_JOURNEYS.map((journeySlug) => ({ journeySlug }));
}

export default function Page({ params }: { params: { journeySlug: string } }) {
  return <SoeeBuilderClient journeySlug={params.journeySlug} />;
}
